import Common "common";

module {
  // Repayment type variants
  public type RepaymentType = { #simple; #fixedDaily; #interestLoan };

  // Repayment mode for interest loans
  public type RepaymentMode = { #endOfTerm; #monthly; #quarterly; #halfYearly; #daily };

  public type Udhar = {
    id : Common.UdharId;
    customerId : Common.CustomerId;
    owner : Principal;
    var amount : Nat;
    var description : Text;
    var dueDate : ?Common.Timestamp;
    var notes : Text;
    createdAt : Common.Timestamp;
    // Repayment system fields (all optional for backward compatibility)
    var repaymentType : ?RepaymentType;
    // Fixed daily repayment fields
    var dailyAmount : ?Float;
    var totalDays : ?Nat;
    var totalToCollect : ?Float;
    var profitAmount : ?Float;
    // Interest loan fields
    var interestRate : ?Float;
    var loanDurationMonths : ?Nat;
    var repaymentMode : ?RepaymentMode;
    var totalInterest : ?Float;
    var totalPayable : ?Float;
    var emiAmount : ?Float;
    // Pre-calculated installment amounts
    var dailyInstallment : ?Float;
    var monthlyInstallment : ?Float;
    var quarterlyInstallment : ?Float;
    var halfYearlyInstallment : ?Float;
  };

  public type UdharView = {
    id : Common.UdharId;
    customerId : Common.CustomerId;
    amount : Nat;
    description : Text;
    dueDate : ?Common.Timestamp;
    notes : Text;
    createdAt : Common.Timestamp;
    // Repayment system fields
    repaymentType : ?RepaymentType;
    dailyAmount : ?Float;
    totalDays : ?Nat;
    totalToCollect : ?Float;
    profitAmount : ?Float;
    interestRate : ?Float;
    loanDurationMonths : ?Nat;
    repaymentMode : ?RepaymentMode;
    totalInterest : ?Float;
    totalPayable : ?Float;
    emiAmount : ?Float;
    dailyInstallment : ?Float;
    monthlyInstallment : ?Float;
    quarterlyInstallment : ?Float;
    halfYearlyInstallment : ?Float;
  };

  public type CreateUdharArgs = {
    customerId : Common.CustomerId;
    amount : Nat;
    description : Text;
    dueDate : ?Common.Timestamp;
    notes : Text;
    // Repayment system fields (all optional)
    repaymentType : ?RepaymentType;
    dailyAmount : ?Float;
    totalDays : ?Nat;
    interestRate : ?Float;
    loanDurationMonths : ?Nat;
    repaymentMode : ?RepaymentMode;
  };

  public type UpdateUdharArgs = {
    amount : Nat;
    description : Text;
    dueDate : ?Common.Timestamp;
    notes : Text;
    // Repayment system fields (all optional)
    repaymentType : ?RepaymentType;
    dailyAmount : ?Float;
    totalDays : ?Nat;
    interestRate : ?Float;
    loanDurationMonths : ?Nat;
    repaymentMode : ?RepaymentMode;
  };
};
