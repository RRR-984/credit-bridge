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

mixin (
  customers : List.List<CustomerTypes.Customer>,
  udharList : List.List<UdharTypes.Udhar>,
  jamaList : List.List<JamaTypes.Jama>,
  state : { var nextUdharId : Nat },
) {
  public shared ({ caller }) func createUdhar(args : UdharTypes.CreateUdharArgs) : async UdharTypes.UdharView {
    // Check if the customer is blocked
    switch (customers.find(func(c) { c.owner == caller and c.id == args.customerId })) {
      case (?c) {
        if (c.blocked) { Runtime.trap("Customer is blocked") };
      };
      case null {};
    };
    let view = UdharLib.create(udharList, state, caller, args);
    // Recalculate customer balance after adding udhar
    let totalU = UdharLib.totalForCustomer(udharList, caller, args.customerId);
    let totalJ = JamaLib.totalForCustomer(jamaList, caller, args.customerId);
    CustomerLib.recalculateBalance(customers, caller, args.customerId, totalU, totalJ);
    // Update status: overdue if any udhar past due and balance > 0
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

  public shared query ({ caller }) func getUdharByCustomer(customerId : Common.CustomerId) : async [UdharTypes.UdharView] {
    UdharLib.getByCustomer(udharList, caller, customerId);
  };

  public shared ({ caller }) func updateUdhar(id : Common.UdharId, args : UdharTypes.UpdateUdharArgs) : async ?UdharTypes.UdharView {
    let result = UdharLib.update(udharList, caller, id, args);
    // Find the customerId for this udhar to recalculate balance
    switch (udharList.find(func(u) { u.owner == caller and u.id == id })) {
      case null {};
      case (?u) {
        let totalU = UdharLib.totalForCustomer(udharList, caller, u.customerId);
        let totalJ = JamaLib.totalForCustomer(jamaList, caller, u.customerId);
        CustomerLib.recalculateBalance(customers, caller, u.customerId, totalU, totalJ);
        let nowNs = Time.now();
        switch (customers.find(func(c) { c.owner == caller and c.id == u.customerId })) {
          case null {};
          case (?c) {
            if (c.outstandingBalance > 0) {
              let hasOverdue = switch (udharList.find(func(u2) {
                u2.owner == caller and u2.customerId == u.customerId and
                (switch (u2.dueDate) { case (?d) { d < nowNs }; case null { false } })
              })) { case null { false }; case _ { true } };
              if (hasOverdue) { c.status := #overdue } else { c.status := #active };
            } else { c.status := #active };
          };
        };
      };
    };
    result;
  };

  public shared ({ caller }) func deleteUdhar(id : Common.UdharId) : async Bool {
    // Find customer before removal to recalculate balance
    let custId = switch (udharList.find(func(u) { u.owner == caller and u.id == id })) {
      case null { return false };
      case (?u) { u.customerId };
    };
    let removed = UdharLib.remove(udharList, caller, id);
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
