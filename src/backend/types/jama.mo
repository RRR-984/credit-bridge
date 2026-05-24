import Common "common";

module {
  public type Jama = {
    id : Common.JamaId;
    customerId : Common.CustomerId;
    owner : Principal;
    var amount : Nat;
    var paymentType : Common.PaymentType;
    var notes : Text;
    createdAt : Common.Timestamp;
  };

  public type JamaView = {
    id : Common.JamaId;
    customerId : Common.CustomerId;
    amount : Nat;
    paymentType : Common.PaymentType;
    notes : Text;
    createdAt : Common.Timestamp;
  };

  public type CreateJamaArgs = {
    customerId : Common.CustomerId;
    amount : Nat;
    paymentType : Common.PaymentType;
    notes : Text;
  };

  public type UpdateJamaArgs = {
    amount : Nat;
    paymentType : Common.PaymentType;
    notes : Text;
  };
};
