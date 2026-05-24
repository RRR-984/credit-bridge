import List "mo:core/List";
import Common "../types/common";
import UdharTypes "../types/udhar";
import Time "mo:core/Time";
import Float "mo:core/Float";

module {
  public type Udhar = UdharTypes.Udhar;
  public type UdharView = UdharTypes.UdharView;
  public type CreateUdharArgs = UdharTypes.CreateUdharArgs;
  public type UpdateUdharArgs = UdharTypes.UpdateUdharArgs;

  public func toView(u : Udhar) : UdharView {
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
  };

  public func create(
    udharList : List.List<Udhar>,
    state : { var nextUdharId : Nat },
    owner : Principal,
    args : CreateUdharArgs,
  ) : UdharView {
    let id = state.nextUdharId;
    state.nextUdharId += 1;

    // Calculate fixed daily repayment fields
    let (totalToCollect, profitAmount) : (?Float, ?Float) = switch (args.repaymentType) {
      case (?(#fixedDaily)) {
        switch (args.dailyAmount, args.totalDays) {
          case (?da, ?td) {
            let total = da * td.toFloat();
            let profit = total - args.amount.toFloat();
            (?total, ?profit);
          };
          case _ { (null, null) };
        };
      };
      case _ { (null, null) };
    };

    // Calculate interest loan fields
    let (totalInterest, totalPayable, emiAmt, dailyInst, monthlyInst, quarterlyInst, halfYearlyInst) :
      (?Float, ?Float, ?Float, ?Float, ?Float, ?Float, ?Float) =
      switch (args.repaymentType) {
        case (?(#interestLoan)) {
          switch (args.interestRate, args.loanDurationMonths) {
            case (?rate, ?months) {
              let principal = args.amount.toFloat();
              let interest = principal * rate * months.toFloat() / 100.0;
              let payable = principal + interest;
              let monthsF = months.toFloat();
              let emi = payable / monthsF;
              let daily = payable / (monthsF * 30.0);
              let quarterly = if (months >= 3) { payable / (monthsF / 3.0) } else { payable };
              let halfYearly = if (months >= 6) { payable / (monthsF / 6.0) } else { payable };
              (?interest, ?payable, ?emi, ?daily, ?emi, ?quarterly, ?halfYearly);
            };
            case _ { (null, null, null, null, null, null, null) };
          };
        };
        case _ { (null, null, null, null, null, null, null) };
      };

    let u : Udhar = {
      id;
      customerId = args.customerId;
      owner;
      var amount = args.amount;
      var description = args.description;
      var dueDate = args.dueDate;
      var notes = args.notes;
      createdAt = Time.now();
      var repaymentType = args.repaymentType;
      var dailyAmount = args.dailyAmount;
      var totalDays = args.totalDays;
      var totalToCollect = totalToCollect;
      var profitAmount = profitAmount;
      var interestRate = args.interestRate;
      var loanDurationMonths = args.loanDurationMonths;
      var repaymentMode = args.repaymentMode;
      var totalInterest = totalInterest;
      var totalPayable = totalPayable;
      var emiAmount = emiAmt;
      var dailyInstallment = dailyInst;
      var monthlyInstallment = monthlyInst;
      var quarterlyInstallment = quarterlyInst;
      var halfYearlyInstallment = halfYearlyInst;
    };
    udharList.add(u);
    toView(u);
  };

  public func getByCustomer(
    udharList : List.List<Udhar>,
    owner : Principal,
    customerId : Common.CustomerId,
  ) : [UdharView] {
    udharList
      .filter(func(u) { u.owner == owner and u.customerId == customerId })
      .map<Udhar, UdharView>(func(u) { toView(u) })
      .toArray();
  };

  public func update(
    udharList : List.List<Udhar>,
    owner : Principal,
    id : Common.UdharId,
    args : UpdateUdharArgs,
  ) : ?UdharView {
    switch (udharList.find(func(u) { u.owner == owner and u.id == id })) {
      case null { null };
      case (?u) {
        u.amount := args.amount;
        u.description := args.description;
        u.dueDate := args.dueDate;
        u.notes := args.notes;
        u.repaymentType := args.repaymentType;
        u.dailyAmount := args.dailyAmount;
        u.totalDays := args.totalDays;
        u.interestRate := args.interestRate;
        u.loanDurationMonths := args.loanDurationMonths;
        u.repaymentMode := args.repaymentMode;

        // Recalculate fixed daily fields
        switch (args.repaymentType) {
          case (?(#fixedDaily)) {
            switch (args.dailyAmount, args.totalDays) {
              case (?da, ?td) {
                let total = da * td.toFloat();
                let profit = total - args.amount.toFloat();
                u.totalToCollect := ?total;
                u.profitAmount := ?profit;
              };
              case _ {
                u.totalToCollect := null;
                u.profitAmount := null;
              };
            };
          };
          case _ {
            u.totalToCollect := null;
            u.profitAmount := null;
          };
        };

        // Recalculate interest loan fields
        switch (args.repaymentType) {
          case (?(#interestLoan)) {
            switch (args.interestRate, args.loanDurationMonths) {
              case (?rate, ?months) {
                let principal = args.amount.toFloat();
                let interest = principal * rate * months.toFloat() / 100.0;
                let payable = principal + interest;
                let monthsF = months.toFloat();
                u.totalInterest := ?interest;
                u.totalPayable := ?payable;
                u.emiAmount := ?(payable / monthsF);
                u.dailyInstallment := ?(payable / (monthsF * 30.0));
                u.monthlyInstallment := ?(payable / monthsF);
                u.quarterlyInstallment := if (months >= 3) { ?(payable / (monthsF / 3.0)) } else { ?payable };
                u.halfYearlyInstallment := if (months >= 6) { ?(payable / (monthsF / 6.0)) } else { ?payable };
              };
              case _ {
                u.totalInterest := null;
                u.totalPayable := null;
                u.emiAmount := null;
                u.dailyInstallment := null;
                u.monthlyInstallment := null;
                u.quarterlyInstallment := null;
                u.halfYearlyInstallment := null;
              };
            };
          };
          case _ {
            u.totalInterest := null;
            u.totalPayable := null;
            u.emiAmount := null;
            u.dailyInstallment := null;
            u.monthlyInstallment := null;
            u.quarterlyInstallment := null;
            u.halfYearlyInstallment := null;
          };
        };

        ?toView(u);
      };
    };
  };

  public func remove(
    udharList : List.List<Udhar>,
    owner : Principal,
    id : Common.UdharId,
  ) : Bool {
    let before = udharList.size();
    let kept = udharList.filter(func(u) { not (u.owner == owner and u.id == id) });
    if (kept.size() < before) {
      udharList.clear();
      udharList.addAll(kept.values());
      true;
    } else {
      false;
    };
  };

  // Sum all udhar amounts for a customer (for balance recalculation)
  public func totalForCustomer(
    udharList : List.List<Udhar>,
    owner : Principal,
    customerId : Common.CustomerId,
  ) : Nat {
    udharList
      .filter(func(u) { u.owner == owner and u.customerId == customerId })
      .foldLeft(0, func(acc : Nat, u : Udhar) : Nat { acc + u.amount });
  };
};
