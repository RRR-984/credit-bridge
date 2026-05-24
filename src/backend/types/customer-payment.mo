import Common "common";

module {
  public type PaymentRequestStatus = { #pending; #approved; #rejected };

  public type CustomerPaymentRequest = {
    id : Nat;
    customerId : Common.CustomerId;
    shopOwnerPrincipal : Principal;
    customerPrincipal : Principal;
    var amount : Nat;
    var paymentType : Common.PaymentType;
    var notes : Text;
    var status : PaymentRequestStatus;
    createdAt : Common.Timestamp;
    var resolvedAt : ?Common.Timestamp;
    var rejectionReason : ?Text;
  };

  // Shared (API boundary) version — no var fields
  public type CustomerPaymentRequestView = {
    id : Nat;
    customerId : Common.CustomerId;
    shopOwnerPrincipal : Principal;
    customerPrincipal : Principal;
    amount : Nat;
    paymentType : Common.PaymentType;
    notes : Text;
    status : PaymentRequestStatus;
    createdAt : Common.Timestamp;
    resolvedAt : ?Common.Timestamp;
    rejectionReason : ?Text;
  };

  public type CustomerLinkRecord = {
    customerId : Common.CustomerId;
    mobileNumber : Text;
    linkedPrincipal : Principal;
    linkedAt : Common.Timestamp;
  };

  public type CustomerPaymentState = {
    var nextPaymentId : Nat;
  };

  public func newState() : CustomerPaymentState {
    { var nextPaymentId = 0 };
  };
};
