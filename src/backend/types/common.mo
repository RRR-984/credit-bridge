import Time "mo:core/Time";

module {
  public type CustomerId = Nat;
  public type UdharId = Nat;
  public type JamaId = Nat;
  public type Timestamp = Int; // nanoseconds, from Time.now()

  public type CustomerStatus = { #active; #overdue };

  public type PaymentType = { #cash; #online; #deposit };

  public type TransactionKind = { #udhar; #jama };

  public type TransactionEntry = {
    id : Nat;
    customerId : CustomerId;
    kind : TransactionKind;
    amount : Nat;
    description : Text;
    createdAt : Timestamp;
  };

  public type DashboardStats = {
    totalUdhar : Nat;
    totalJama : Nat;
    pendingBalance : Int;
    overdueCustomerCount : Nat;
    todayCollection : Nat;
    top5CustomersByBalance : [TopCustomer];
  };

  public type TopCustomer = {
    id : CustomerId;
    name : Text;
    outstandingBalance : Int;
  };
};
