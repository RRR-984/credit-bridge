import List "mo:core/List";
import Common "../types/common";
import CustomerTypes "../types/customer";
import CustomerLib "../lib/customer";
import UdharTypes "../types/udhar";
import JamaTypes "../types/jama";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Order "mo:core/Order";

module {
  public func stats(
    customers : List.List<CustomerTypes.Customer>,
    udharList : List.List<UdharTypes.Udhar>,
    jamaList : List.List<JamaTypes.Jama>,
    owner : Principal,
  ) : Common.DashboardStats {
    // Totals across all customers for this owner
    let totalUdhar = udharList
      .filter(func(u) { u.owner == owner })
      .foldLeft(0, func(acc : Nat, u : UdharTypes.Udhar) : Nat { acc + u.amount });

    let totalJama = jamaList
      .filter(func(j) { j.owner == owner })
      .foldLeft(0, func(acc : Nat, j : JamaTypes.Jama) : Nat { acc + j.amount });

    let pendingBalance : Int = totalUdhar - totalJama;

    // Today's collection: jama created since start of today (midnight UTC)
    let nowNs = Time.now();
    let nsPerDay : Int = 86_400_000_000_000;
    let dayStartNs : Int = (nowNs / nsPerDay) * nsPerDay;
    let todayCollection = jamaList
      .filter(func(j) { j.owner == owner and j.createdAt >= dayStartNs })
      .foldLeft(0, func(acc : Nat, j : JamaTypes.Jama) : Nat { acc + j.amount });

    // Count overdue customers
    let overdueCustomerCount = customers
      .filter(func(c) { c.owner == owner and c.status == #overdue })
      .size();

    // Top 5 customers by outstanding balance descending
    let ownerCustomers = customers
      .filter(func(c) { c.owner == owner })
      .toArray();
    let sorted = ownerCustomers.sort(func(a : CustomerTypes.Customer, b : CustomerTypes.Customer) : Order.Order {
      Int.compare(b.outstandingBalance, a.outstandingBalance)
    });
    let top5 = sorted.sliceToArray(0, if (sorted.size() < 5) { sorted.size() } else { 5 });
    let top5View = top5.map(
      func(c) { { id = c.id; name = c.name; outstandingBalance = c.outstandingBalance } }
    );

    {
      totalUdhar;
      totalJama;
      pendingBalance;
      overdueCustomerCount;
      todayCollection;
      top5CustomersByBalance = top5View;
    };
  };

  // Return CustomerView for customers with udhar due today and positive outstanding balance
  public func dueTodayCustomers(
    customers : List.List<CustomerTypes.Customer>,
    udharList : List.List<UdharTypes.Udhar>,
    owner : Principal,
  ) : [CustomerTypes.CustomerView] {
    let nowNs = Time.now();
    let nsPerDay : Int = 86_400_000_000_000;
    let dayStartNs : Int = (nowNs / nsPerDay) * nsPerDay;
    let dayEndNs : Int = dayStartNs + nsPerDay;

    customers
      .filter(func(c) {
        if (c.owner != owner or c.outstandingBalance <= 0) { return false };
        // Check if any udhar dueDate falls within today
        switch (udharList.find(func(u) {
          u.owner == owner and u.customerId == c.id and
          (switch (u.dueDate) {
            case (?d) { d >= dayStartNs and d < dayEndNs };
            case null { false };
          })
        })) {
          case (?_) { true };
          case null { false };
        };
      })
      .map<CustomerTypes.Customer, CustomerTypes.CustomerView>(func(c) { CustomerLib.toView(c) })
      .toArray();
  };

  // Combined transaction history for a customer, sorted by createdAt desc
  public func transactionHistory(
    udharList : List.List<UdharTypes.Udhar>,
    jamaList : List.List<JamaTypes.Jama>,
    owner : Principal,
    customerId : Common.CustomerId,
  ) : [Common.TransactionEntry] {
    let udharEntries = udharList
      .filter(func(u) { u.owner == owner and u.customerId == customerId })
      .map<UdharTypes.Udhar, Common.TransactionEntry>(func(u) {
        {
          id = u.id;
          customerId = u.customerId;
          kind = #udhar;
          amount = u.amount;
          description = u.description;
          createdAt = u.createdAt;
        }
      })
      .toArray();

    let jamaEntries = jamaList
      .filter(func(j) { j.owner == owner and j.customerId == customerId })
      .map<JamaTypes.Jama, Common.TransactionEntry>(func(j) {
        {
          id = j.id;
          customerId = j.customerId;
          kind = #jama;
          amount = j.amount;
          description = j.notes;
          createdAt = j.createdAt;
        }
      })
      .toArray();

    let merged = udharEntries.concat(jamaEntries);
    merged.sort(func(a : Common.TransactionEntry, b : Common.TransactionEntry) : Order.Order {
      Int.compare(b.createdAt, a.createdAt)
    })
  };
};
