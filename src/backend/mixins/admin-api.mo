import List "mo:core/List";
import Common "../types/common";
import CustomerTypes "../types/customer";
import UdharTypes "../types/udhar";
import JamaTypes "../types/jama";
import AdminTypes "../types/admin";
import Runtime "mo:core/Runtime";
import Float "mo:core/Float";

mixin (
  adminState : AdminTypes.AdminState,
  customers : List.List<CustomerTypes.Customer>,
  udharList : List.List<UdharTypes.Udhar>,
  jamaList : List.List<JamaTypes.Jama>,
) {
  public shared ({ caller }) func setAdminPrincipal(p : Principal) : async () {
    switch (adminState.adminPrincipal) {
      case null {
        // First call — anyone can claim the admin seat
        adminState.adminPrincipal := ?p;
      };
      case (?existing) {
        // Only the current admin may reassign
        if (caller != existing) {
          Runtime.trap("Not authorized");
        };
        adminState.adminPrincipal := ?p;
      };
    };
  };

  public shared query func isAdmin(p : Principal) : async Bool {
    adminState.adminPrincipal == ?p;
  };

  public shared query ({ caller }) func adminGetAdminPrincipal() : async ?Principal {
    if (not (adminState.adminPrincipal == ?caller)) {
      Runtime.trap("Not authorized");
    };
    adminState.adminPrincipal;
  };

  public shared query ({ caller }) func adminGetAllCustomers() : async [CustomerTypes.CustomerView] {
    if (not (adminState.adminPrincipal == ?caller)) {
      Runtime.trap("Not authorized");
    };
    customers
      .map<CustomerTypes.Customer, CustomerTypes.CustomerView>(func(c) {
        {
          id = c.id;
          name = c.name;
          mobileNumber = c.mobileNumber;
          address = c.address;
          creditLimit = c.creditLimit;
          notes = c.notes;
          outstandingBalance = c.outstandingBalance;
          status = c.status;
          blocked = c.blocked;
          createdAt = c.createdAt;
          email = c.email;
        };
      })
      .toArray();
  };

  public shared query ({ caller }) func adminGetAllUdhar() : async [UdharTypes.UdharView] {
    if (not (adminState.adminPrincipal == ?caller)) {
      Runtime.trap("Not authorized");
    };
    udharList
      .map<UdharTypes.Udhar, UdharTypes.UdharView>(func(u) {
        {
          id = u.id;
          customerId = u.customerId;
          amount = u.amount;
          description = u.description;
          dueDate = u.dueDate;
          notes = u.notes;
          createdAt = u.createdAt;
          repaymentType = u.repaymentType;
          dailyAmount = u.dailyAmount;
          totalDays = u.totalDays;
          totalToCollect = u.totalToCollect;
          profitAmount = u.profitAmount;
          interestRate = u.interestRate;
          loanDurationMonths = u.loanDurationMonths;
          repaymentMode = u.repaymentMode;
          totalInterest = u.totalInterest;
          totalPayable = u.totalPayable;
          emiAmount = u.emiAmount;
          dailyInstallment = u.dailyInstallment;
          monthlyInstallment = u.monthlyInstallment;
          quarterlyInstallment = u.quarterlyInstallment;
          halfYearlyInstallment = u.halfYearlyInstallment;
        };
      })
      .toArray();
  };

  public shared query ({ caller }) func adminGetAllJama() : async [JamaTypes.JamaView] {
    if (not (adminState.adminPrincipal == ?caller)) {
      Runtime.trap("Not authorized");
    };
    jamaList
      .map<JamaTypes.Jama, JamaTypes.JamaView>(func(j) {
        {
          id = j.id;
          customerId = j.customerId;
          amount = j.amount;
          paymentType = j.paymentType;
          notes = j.notes;
          createdAt = j.createdAt;
        };
      })
      .toArray();
  };

  public shared query ({ caller }) func adminGetStats() : async AdminTypes.AdminStats {
    if (not (adminState.adminPrincipal == ?caller)) {
      Runtime.trap("Not authorized");
    };
    let totalCustomers = customers.size();
    let blockedCount = customers.filter(func(c) { c.blocked }).size();
    let totalUdhar = udharList.size();
    let totalJama = jamaList.size();
    let totalUdharAmount = udharList.foldLeft(
      0.0 : Float,
      func(acc : Float, u : UdharTypes.Udhar) : Float { acc + u.amount.toFloat() },
    );
    let totalJamaAmount = jamaList.foldLeft(
      0.0 : Float,
      func(acc : Float, j : JamaTypes.Jama) : Float { acc + j.amount.toFloat() },
    );
    { totalCustomers; blockedCount; totalUdhar; totalJama; totalUdharAmount; totalJamaAmount };
  };

  public shared ({ caller }) func adminUpdateCustomer(id : Common.CustomerId, args : CustomerTypes.UpdateCustomerArgs) : async ?CustomerTypes.CustomerView {
    if (not (adminState.adminPrincipal == ?caller)) {
      Runtime.trap("Not authorized");
    };
    switch (customers.find(func(c) { c.id == id })) {
      case null { null };
      case (?c) {
        c.name := args.name;
        c.mobileNumber := args.mobileNumber;
        c.address := args.address;
        c.creditLimit := args.creditLimit;
        c.notes := args.notes;
        ?{
          id = c.id;
          name = c.name;
          mobileNumber = c.mobileNumber;
          address = c.address;
          creditLimit = c.creditLimit;
          notes = c.notes;
          outstandingBalance = c.outstandingBalance;
          status = c.status;
          blocked = c.blocked;
          createdAt = c.createdAt;
          email = c.email;
        };
      };
    };
  };

  public shared ({ caller }) func adminDeleteCustomer(id : Common.CustomerId) : async Bool {
    if (not (adminState.adminPrincipal == ?caller)) {
      Runtime.trap("Not authorized");
    };
    let beforeSize = customers.size();
    let kept = customers.filter(func(c) { c.id != id });
    if (kept.size() < beforeSize) {
      customers.clear();
      customers.addAll(kept.values());
      // Remove all linked udhar entries
      let keptUdhar = udharList.filter(func(u) { u.customerId != id });
      udharList.clear();
      udharList.addAll(keptUdhar.values());
      // Remove all linked jama entries
      let keptJama = jamaList.filter(func(j) { j.customerId != id });
      jamaList.clear();
      jamaList.addAll(keptJama.values());
      true;
    } else {
      false;
    };
  };

  public shared ({ caller }) func adminBlockCustomer(id : Common.CustomerId) : async Bool {
    if (not (adminState.adminPrincipal == ?caller)) {
      Runtime.trap("Not authorized");
    };
    switch (customers.find(func(c) { c.id == id })) {
      case null { false };
      case (?c) {
        c.blocked := true;
        true;
      };
    };
  };

  public shared ({ caller }) func adminUnblockCustomer(id : Common.CustomerId) : async Bool {
    if (not (adminState.adminPrincipal == ?caller)) {
      Runtime.trap("Not authorized");
    };
    switch (customers.find(func(c) { c.id == id })) {
      case null { false };
      case (?c) {
        c.blocked := false;
        true;
      };
    };
  };

  public shared ({ caller }) func adminDeleteUdhar(id : Common.UdharId) : async Bool {
    if (not (adminState.adminPrincipal == ?caller)) {
      Runtime.trap("Not authorized");
    };
    // Find the udhar entry first to get customerId and owner
    let entry = udharList.find(func(u) { u.id == id });
    let before = udharList.size();
    let kept = udharList.filter(func(u) { u.id != id });
    if (kept.size() < before) {
      udharList.clear();
      udharList.addAll(kept.values());
      // Recalculate balance for the affected customer
      switch (entry) {
        case null {};
        case (?u) {
          let totalU = udharList
            .filter(func(x) { x.owner == u.owner and x.customerId == u.customerId })
            .foldLeft(0, func(acc : Nat, x : UdharTypes.Udhar) : Nat { acc + x.amount });
          let totalJ = jamaList
            .filter(func(x) { x.owner == u.owner and x.customerId == u.customerId })
            .foldLeft(0, func(acc : Nat, x : JamaTypes.Jama) : Nat { acc + x.amount });
          switch (customers.find(func(c) { c.owner == u.owner and c.id == u.customerId })) {
            case null {};
            case (?c) {
              let balance : Int = totalU - totalJ;
              c.outstandingBalance := balance;
              if (balance <= 0) { c.status := #active };
            };
          };
        };
      };
      true;
    } else {
      false;
    };
  };

  public shared ({ caller }) func adminDeleteJama(id : Common.JamaId) : async Bool {
    if (not (adminState.adminPrincipal == ?caller)) {
      Runtime.trap("Not authorized");
    };
    // Find the jama entry first to get customerId and owner
    let entry = jamaList.find(func(j) { j.id == id });
    let before = jamaList.size();
    let kept = jamaList.filter(func(j) { j.id != id });
    if (kept.size() < before) {
      jamaList.clear();
      jamaList.addAll(kept.values());
      // Recalculate balance for the affected customer
      switch (entry) {
        case null {};
        case (?j) {
          let totalU = udharList
            .filter(func(x) { x.owner == j.owner and x.customerId == j.customerId })
            .foldLeft(0, func(acc : Nat, x : UdharTypes.Udhar) : Nat { acc + x.amount });
          let totalJ = jamaList
            .filter(func(x) { x.owner == j.owner and x.customerId == j.customerId })
            .foldLeft(0, func(acc : Nat, x : JamaTypes.Jama) : Nat { acc + x.amount });
          switch (customers.find(func(c) { c.owner == j.owner and c.id == j.customerId })) {
            case null {};
            case (?c) {
              let balance : Int = totalU - totalJ;
              c.outstandingBalance := balance;
              if (balance <= 0) { c.status := #active };
            };
          };
        };
      };
      true;
    } else {
      false;
    };
  };
};
