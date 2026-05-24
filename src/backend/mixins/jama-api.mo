import List "mo:core/List";
import Common "../types/common";
import CustomerTypes "../types/customer";
import UdharTypes "../types/udhar";
import JamaTypes "../types/jama";
import CustomerLib "../lib/customer";
import UdharLib "../lib/udhar";
import JamaLib "../lib/jama";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import EmailClient "mo:caffeineai-email/emailClient";

mixin (
  customers : List.List<CustomerTypes.Customer>,
  udharList : List.List<UdharTypes.Udhar>,
  jamaList : List.List<JamaTypes.Jama>,
  state : { var nextJamaId : Nat },
) {
  public shared ({ caller }) func createJama(args : JamaTypes.CreateJamaArgs) : async JamaTypes.JamaView {
    // Check if the customer is blocked
    switch (customers.find(func(c) { c.owner == caller and c.id == args.customerId })) {
      case (?c) {
        if (c.blocked) { Runtime.trap("Customer is blocked") };
      };
      case null {};
    };
    let view = JamaLib.create(jamaList, state, caller, args);
    // Send email notification to shop owner
    let customerName = switch (customers.find(func(c) { c.owner == caller and c.id == args.customerId })) {
      case (?c) { c.name };
      case null { "Customer" };
    };
    let amountText = args.amount.toText();
    let dateText = (Time.now() / 1_000_000_000).toText();
    ignore await EmailClient.sendServiceEmail("noreply", [caller.toText() # "@creditbridge.app"], "Payment Received - Credit Bridge", "Payment of " # amountText # " collected from " # customerName # ". Transaction recorded successfully.");
    // Recalculate customer balance after adding jama
    let totalU = UdharLib.totalForCustomer(udharList, caller, args.customerId);
    let totalJ = JamaLib.totalForCustomer(jamaList, caller, args.customerId);
    CustomerLib.recalculateBalance(customers, caller, args.customerId, totalU, totalJ);
    // Update status
    let nowNs = Time.now();
    switch (customers.find(func(c) { c.owner == caller and c.id == args.customerId })) {
      case null {};
      case (?c) {
        if (c.outstandingBalance > 0) {
          let hasOverdue = switch (udharList.find(func(u) {
              u.owner == caller and u.customerId == args.customerId and
              (switch (u.dueDate) { case (?d) { d < nowNs }; case null { false } })
            })) { case null { false }; case _ { true } };
          if (hasOverdue) { c.status := #overdue } else { c.status := #active };
        } else { c.status := #active };
      };
    };
    view;
  };

  public shared query ({ caller }) func getJamaByCustomer(customerId : Common.CustomerId) : async [JamaTypes.JamaView] {
    JamaLib.getByCustomer(jamaList, caller, customerId);
  };

  public shared ({ caller }) func updateJama(id : Common.JamaId, args : JamaTypes.UpdateJamaArgs) : async ?JamaTypes.JamaView {
    let result = JamaLib.update(jamaList, caller, id, args);
    switch (jamaList.find(func(j) { j.owner == caller and j.id == id })) {
      case null {};
      case (?j) {
        let totalU = UdharLib.totalForCustomer(udharList, caller, j.customerId);
        let totalJ = JamaLib.totalForCustomer(jamaList, caller, j.customerId);
        CustomerLib.recalculateBalance(customers, caller, j.customerId, totalU, totalJ);
        let nowNs = Time.now();
        switch (customers.find(func(c) { c.owner == caller and c.id == j.customerId })) {
          case null {};
          case (?c) {
            if (c.outstandingBalance > 0) {
              let hasOverdue = switch (udharList.find(func(u) {
                u.owner == caller and u.customerId == j.customerId and
                (switch (u.dueDate) { case (?d) { d < nowNs }; case null { false } })
              })) { case null { false }; case _ { true } };
              if (hasOverdue) { c.status := #overdue } else { c.status := #active };
            } else { c.status := #active };
          };
        };
      };
    };
    result;
  };

  public shared ({ caller }) func deleteJama(id : Common.JamaId) : async Bool {
    let custId = switch (jamaList.find(func(j) { j.owner == caller and j.id == id })) {
      case null { return false };
      case (?j) { j.customerId };
    };
    let removed = JamaLib.remove(jamaList, caller, id);
    if (removed) {
      let totalU = UdharLib.totalForCustomer(udharList, caller, custId);
      let totalJ = JamaLib.totalForCustomer(jamaList, caller, custId);
      CustomerLib.recalculateBalance(customers, caller, custId, totalU, totalJ);
      let nowNs = Time.now();
      switch (customers.find(func(c) { c.owner == caller and c.id == custId })) {
        case null {};
        case (?c) {
          if (c.outstandingBalance > 0) {
            let hasOverdue = switch (udharList.find(func(u) {
              u.owner == caller and u.customerId == custId and
              (switch (u.dueDate) { case (?d) { d < nowNs }; case null { false } })
            })) { case null { false }; case _ { true } };
            if (hasOverdue) { c.status := #overdue } else { c.status := #active };
          } else { c.status := #active };
        };
      };
    };
    removed;
  };
};
