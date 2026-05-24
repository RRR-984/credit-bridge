// Mirror of backend types for use in frontend components

export type CustomerId = bigint;
export type UdharId = bigint;
export type JamaId = bigint;
export type Timestamp = bigint;

export type RepaymentType = "simple" | "fixedDaily" | "interestLoan";
export type RepaymentMode =
  | "endOfTerm"
  | "monthly"
  | "quarterly"
  | "halfYearly"
  | "daily";

export enum CustomerStatus {
  active = "active",
  overdue = "overdue",
}

export enum PaymentType {
  cash = "cash",
  deposit = "deposit",
  online = "online",
}

export enum TransactionKind {
  jama = "jama",
  udhar = "udhar",
}

export interface Customer {
  id: CustomerId;
  name: string;
  mobileNumber: string;
  address: string;
  notes: string;
  email?: string;
  creditLimit: bigint;
  outstandingBalance: bigint;
  status: CustomerStatus;
  blocked?: boolean;
  createdAt: Timestamp;
}

export interface Udhar {
  id: UdharId;
  customerId: CustomerId;
  amount: bigint;
  description: string;
  notes: string;
  dueDate?: Timestamp;
  createdAt: Timestamp;
  // Repayment fields
  repaymentType?: RepaymentType;
  repaymentMode?: RepaymentMode;
  dailyAmount?: number;
  totalDays?: bigint;
  totalToCollect?: number;
  profitAmount?: number;
  interestRate?: number;
  loanDurationMonths?: bigint;
  totalInterest?: number;
  totalPayable?: number;
  dailyInstallment?: number;
  monthlyInstallment?: number;
  quarterlyInstallment?: number;
  halfYearlyInstallment?: number;
  emiAmount?: number;
}

export interface Jama {
  id: JamaId;
  customerId: CustomerId;
  amount: bigint;
  notes: string;
  paymentType: PaymentType;
  createdAt: Timestamp;
}

export interface TopCustomer {
  id: CustomerId;
  name: string;
  outstandingBalance: bigint;
}

export interface DashboardStats {
  totalUdhar: bigint;
  totalJama: bigint;
  pendingBalance: bigint;
  todayCollection: bigint;
  overdueCustomerCount: bigint;
  top5CustomersByBalance: TopCustomer[];
}

export interface TransactionEntry {
  id: bigint;
  kind: TransactionKind;
  createdAt: Timestamp;
  description: string;
  customerId: CustomerId;
  amount: bigint;
}

export interface CreateCustomerArgs {
  name: string;
  mobileNumber: string;
  address: string;
  notes: string;
  email?: string;
  creditLimit: bigint;
}

export interface CreateUdharArgs {
  customerId: CustomerId;
  amount: bigint;
  description: string;
  notes: string;
  dueDate?: Timestamp;
  repaymentType?: RepaymentType;
  repaymentMode?: RepaymentMode;
  dailyAmount?: number;
  totalDays?: bigint;
  interestRate?: number;
  loanDurationMonths?: bigint;
}

export interface CreateJamaArgs {
  customerId: CustomerId;
  amount: bigint;
  notes: string;
  paymentType: PaymentType;
}
