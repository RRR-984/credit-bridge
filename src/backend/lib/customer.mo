import List "mo:core/List";
import Common "../types/common";
import CustomerTypes "../types/customer";
import Time "mo:core/Time";

module {
  public type Customer = CustomerTypes.Customer;
  public type CustomerView = CustomerTypes.CustomerView;
  public type CreateCustomerArgs = CustomerTypes.CreateCustomerArgs;
  public type UpdateCustomerArgs = CustomerTypes.UpdateCustomerArgs;

  public func toView(c : Customer) : CustomerView {
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
      email = c.email;
      createdAt = c.createdAt;
    };
  };

  public func create(
    customers : List.List<Customer>,
    state : { var nextCustomerId : Nat },
    owner : Principal,
    args : CreateCustomerArgs,
  ) : CustomerView {
    let id = state.nextCustomerId;
    state.nextCustomerId += 1;
    let c : Customer = {
      id;
      owner;
      var name = args.name;
      var mobileNumber = args.mobileNumber;
      var address = args.address;
      var creditLimit = args.creditLimit;
      var notes = args.notes;
      var outstandingBalance = 0;
      var status = #active;
      var blocked = false;
      var email = args.email;
      createdAt = Time.now();
    };
    customers.add(c);
    toView(c);
  };

  public func getAll(
    customers : List.List<Customer>,
    owner : Principal,
  ) : [CustomerView] {
    customers
      .filter(func(c) { c.owner == owner })
      .map<Customer, CustomerView>(func(c) { toView(c) })
      .toArray();
  };

  public func getOne(
    customers : List.List<Customer>,
    owner : Principal,
    id : Common.CustomerId,
  ) : ?CustomerView {
    switch (customers.find(func(c) { c.owner == owner and c.id == id })) {
      case (?c) { ?toView(c) };
      case null { null };
    };
  };

  public func update(
    customers : List.List<Customer>,
    owner : Principal,
    id : Common.CustomerId,
    args : UpdateCustomerArgs,
  ) : ?CustomerView {
    switch (customers.find(func(c) { c.owner == owner and c.id == id })) {
      case null { null };
      case (?c) {
        c.name := args.name;
        c.mobileNumber := args.mobileNumber;
        c.address := args.address;
        c.creditLimit := args.creditLimit;
        c.notes := args.notes;
        c.email := args.email;
        ?toView(c);
      };
    };
  };

  public func remove(
    customers : List.List<Customer>,
    owner : Principal,
    id : Common.CustomerId,
  ) : Bool {
    let before = customers.size();
    let kept = customers.filter(func(c) { not (c.owner == owner and c.id == id) });
    if (kept.size() < before) {
      customers.clear();
      customers.addAll(kept.values());
      true;
    } else {
      false;
    };
  };

  // Recalculate outstanding balance from udhar/jama totals
  public func recalculateBalance(
    customers : List.List<Customer>,
    owner : Principal,
    id : Common.CustomerId,
    totalUdhar : Nat,
    totalJama : Nat,
  ) {
    switch (customers.find(func(c) { c.owner == owner and c.id == id })) {
      case null {};
      case (?c) {
        let balance : Int = totalUdhar - totalJama;
        c.outstandingBalance := balance;
        // Determine overdue: any udhar with dueDate < now and balance > 0 is checked by callers
        // Status update is done after balance update; caller passes isOverdue flag via udhar check
        // We set to #active here; udhar-api/jama-api must call updateStatus after recalc
        if (balance <= 0) {
          c.status := #active;
        };
      };
    };
  };
};
