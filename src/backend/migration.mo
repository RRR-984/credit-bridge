import List "mo:core/List";
import CustomerTypes "types/customer";

module {
  // Old Customer type — email field did not exist in the previous version
  type OldCustomer = {
    id : Nat;
    owner : Principal;
    var name : Text;
    var mobileNumber : Text;
    var address : Text;
    var creditLimit : Nat;
    var notes : Text;
    var outstandingBalance : Int;
    var status : { #active; #overdue };
    var blocked : Bool;
    createdAt : Int;
  };

  public type OldActor = {
    customers : List.List<OldCustomer>;
  };

  public type NewActor = {
    customers : List.List<CustomerTypes.Customer>;
  };

  public func run(old : OldActor) : NewActor {
    let customers = old.customers.map<OldCustomer, CustomerTypes.Customer>(
      func(c) {
        {
          id = c.id;
          owner = c.owner;
          var name = c.name;
          var mobileNumber = c.mobileNumber;
          var address = c.address;
          var creditLimit = c.creditLimit;
          var notes = c.notes;
          var outstandingBalance = c.outstandingBalance;
          var status = c.status;
          var blocked = c.blocked;
          var email = null : ?Text;
          createdAt = c.createdAt;
        }
      }
    );
    { customers };
  };
};
