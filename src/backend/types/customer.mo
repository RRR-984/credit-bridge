import Common "common";

module {
  public type Customer = {
    id : Common.CustomerId;
    owner : Principal;
    var name : Text;
    var mobileNumber : Text;
    var address : Text;
    var creditLimit : Nat;
    var notes : Text;
    var outstandingBalance : Int;
    var status : Common.CustomerStatus;
    var blocked : Bool;
    var email : ?Text;
    createdAt : Common.Timestamp;
  };

  // Shared (API boundary) version — no var fields
  public type CustomerView = {
    id : Common.CustomerId;
    name : Text;
    mobileNumber : Text;
    address : Text;
    creditLimit : Nat;
    notes : Text;
    outstandingBalance : Int;
    status : Common.CustomerStatus;
    blocked : Bool;
    email : ?Text;
    createdAt : Common.Timestamp;
  };

  public type CreateCustomerArgs = {
    name : Text;
    mobileNumber : Text;
    address : Text;
    creditLimit : Nat;
    notes : Text;
    email : ?Text;
  };

  public type UpdateCustomerArgs = {
    name : Text;
    mobileNumber : Text;
    address : Text;
    creditLimit : Nat;
    notes : Text;
    email : ?Text;
  };
};
