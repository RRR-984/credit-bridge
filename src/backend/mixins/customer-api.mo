import List "mo:core/List";
import Common "../types/common";
import CustomerTypes "../types/customer";
import CustomerLib "../lib/customer";
import UdharLib "../lib/udhar";
import JamaLib "../lib/jama";
import UdharTypes "../types/udhar";
import JamaTypes "../types/jama";

mixin (
  customers : List.List<CustomerTypes.Customer>,
  udharList : List.List<UdharTypes.Udhar>,
  jamaList : List.List<JamaTypes.Jama>,
  state : { var nextCustomerId : Nat },
) {
  public shared ({ caller }) func createCustomer(args : CustomerTypes.CreateCustomerArgs) : async CustomerTypes.CustomerView {
    CustomerLib.create(customers, state, caller, args);
  };

  public shared query ({ caller }) func getCustomers() : async [CustomerTypes.CustomerView] {
    CustomerLib.getAll(customers, caller);
  };

  public shared query ({ caller }) func getCustomer(id : Common.CustomerId) : async ?CustomerTypes.CustomerView {
    CustomerLib.getOne(customers, caller, id);
  };

  public shared ({ caller }) func updateCustomer(id : Common.CustomerId, args : CustomerTypes.UpdateCustomerArgs) : async ?CustomerTypes.CustomerView {
    CustomerLib.update(customers, caller, id, args);
  };

  public shared ({ caller }) func deleteCustomer(id : Common.CustomerId) : async Bool {
    CustomerLib.remove(customers, caller, id);
  };
};
