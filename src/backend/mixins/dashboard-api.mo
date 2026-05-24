import List "mo:core/List";
import Common "../types/common";
import CustomerTypes "../types/customer";
import UdharTypes "../types/udhar";
import JamaTypes "../types/jama";
import DashboardLib "../lib/dashboard";

mixin (
  customers : List.List<CustomerTypes.Customer>,
  udharList : List.List<UdharTypes.Udhar>,
  jamaList : List.List<JamaTypes.Jama>,
) {
  public shared query ({ caller }) func getDashboardStats() : async Common.DashboardStats {
    DashboardLib.stats(customers, udharList, jamaList, caller);
  };

  public shared query ({ caller }) func getTransactionHistory(customerId : Common.CustomerId) : async [Common.TransactionEntry] {
    DashboardLib.transactionHistory(udharList, jamaList, caller, customerId);
  };

  public shared query ({ caller }) func getDueTodayReminders() : async [CustomerTypes.CustomerView] {
    DashboardLib.dueTodayCustomers(customers, udharList, caller);
  };
};
