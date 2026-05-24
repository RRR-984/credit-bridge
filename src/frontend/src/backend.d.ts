import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export type Result_2 = {
    __kind__: "ok";
    ok: Array<TransactionEntry>;
} | {
    __kind__: "err";
    err: string;
};
export interface UdharView {
    id: UdharId;
    loanDurationMonths?: bigint;
    dailyInstallment?: number;
    createdAt: Timestamp;
    dueDate?: Timestamp;
    totalInterest?: number;
    description: string;
    totalDays?: bigint;
    quarterlyInstallment?: number;
    dailyAmount?: number;
    interestRate?: number;
    totalPayable?: number;
    notes: string;
    halfYearlyInstallment?: number;
    emiAmount?: number;
    repaymentMode?: RepaymentMode;
    repaymentType?: RepaymentType;
    customerId: CustomerId;
    monthlyInstallment?: number;
    amount: bigint;
    profitAmount?: number;
    totalToCollect?: number;
}
export type Result_5 = {
    __kind__: "ok";
    ok: CustomerView;
} | {
    __kind__: "err";
    err: string;
};
export type Result_1 = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export interface CreateJamaArgs {
    notes: string;
    paymentType: PaymentType;
    customerId: CustomerId;
    amount: bigint;
}
export interface CreateCustomerArgs {
    name: string;
    mobileNumber: string;
    email?: string;
    creditLimit: bigint;
    address: string;
    notes: string;
}
export type Result_4 = {
    __kind__: "ok";
    ok: bigint;
} | {
    __kind__: "err";
    err: string;
};
export interface JamaView {
    id: JamaId;
    createdAt: Timestamp;
    notes: string;
    paymentType: PaymentType;
    customerId: CustomerId;
    amount: bigint;
}
export interface TopCustomer {
    id: CustomerId;
    name: string;
    outstandingBalance: bigint;
}
export interface UpdateCustomerArgs {
    name: string;
    mobileNumber: string;
    email?: string;
    creditLimit: bigint;
    address: string;
    notes: string;
}
export type UdharId = bigint;
export interface CustomerPaymentRequestView {
    id: bigint;
    status: PaymentRequestStatus;
    customerPrincipal: Principal;
    createdAt: Timestamp;
    rejectionReason?: string;
    notes: string;
    paymentType: PaymentType;
    customerId: CustomerId;
    amount: bigint;
    shopOwnerPrincipal: Principal;
    resolvedAt?: Timestamp;
}
export interface UpdateUdharArgs {
    loanDurationMonths?: bigint;
    dueDate?: Timestamp;
    description: string;
    totalDays?: bigint;
    dailyAmount?: number;
    interestRate?: number;
    notes: string;
    repaymentMode?: RepaymentMode;
    repaymentType?: RepaymentType;
    amount: bigint;
}
export interface UpdateJamaArgs {
    notes: string;
    paymentType: PaymentType;
    amount: bigint;
}
export interface DashboardStats {
    todayCollection: bigint;
    top5CustomersByBalance: Array<TopCustomer>;
    totalJama: bigint;
    totalUdhar: bigint;
    pendingBalance: bigint;
    overdueCustomerCount: bigint;
}
export type Result = {
    __kind__: "ok";
    ok: CustomerPaymentRequestView;
} | {
    __kind__: "err";
    err: string;
};
export type Result_3 = {
    __kind__: "ok";
    ok: Array<CustomerPaymentRequestView>;
} | {
    __kind__: "err";
    err: string;
};
export interface TransactionEntry {
    id: bigint;
    kind: TransactionKind;
    createdAt: Timestamp;
    description: string;
    customerId: CustomerId;
    amount: bigint;
}
export type CustomerId = bigint;
export interface AdminStats {
    totalUdharAmount: number;
    totalJama: bigint;
    totalJamaAmount: number;
    blockedCount: bigint;
    totalUdhar: bigint;
    totalCustomers: bigint;
}
export interface CustomerView {
    id: CustomerId;
    status: CustomerStatus;
    blocked: boolean;
    name: string;
    createdAt: Timestamp;
    mobileNumber: string;
    email?: string;
    creditLimit: bigint;
    address: string;
    notes: string;
    outstandingBalance: bigint;
}
export interface CreateUdharArgs {
    loanDurationMonths?: bigint;
    dueDate?: Timestamp;
    description: string;
    totalDays?: bigint;
    dailyAmount?: number;
    interestRate?: number;
    notes: string;
    repaymentMode?: RepaymentMode;
    repaymentType?: RepaymentType;
    customerId: CustomerId;
    amount: bigint;
}
export interface UserProfile {
    timezone: string;
    country: string;
    businessName: string;
    mobileNumber: string;
    language: string;
    dateFormat: string;
    currency: string;
}
export type JamaId = bigint;
export enum CustomerStatus {
    active = "active",
    overdue = "overdue"
}
export enum PaymentRequestStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum PaymentType {
    cash = "cash",
    deposit = "deposit",
    online = "online"
}
export enum RepaymentMode {
    endOfTerm = "endOfTerm",
    quarterly = "quarterly",
    monthly = "monthly",
    halfYearly = "halfYearly",
    daily = "daily"
}
export enum RepaymentType {
    interestLoan = "interestLoan",
    simple = "simple",
    fixedDaily = "fixedDaily"
}
export enum TransactionKind {
    jama = "jama",
    udhar = "udhar"
}
export interface backendInterface {
    adminBlockCustomer(id: CustomerId): Promise<boolean>;
    adminDeleteCustomer(id: CustomerId): Promise<boolean>;
    adminDeleteJama(id: JamaId): Promise<boolean>;
    adminDeleteUdhar(id: UdharId): Promise<boolean>;
    adminGetAdminPrincipal(): Promise<Principal | null>;
    adminGetAllCustomers(): Promise<Array<CustomerView>>;
    adminGetAllJama(): Promise<Array<JamaView>>;
    adminGetAllUdhar(): Promise<Array<UdharView>>;
    adminGetStats(): Promise<AdminStats>;
    adminUnblockCustomer(id: CustomerId): Promise<boolean>;
    adminUpdateCustomer(id: CustomerId, args: UpdateCustomerArgs): Promise<CustomerView | null>;
    createCustomer(args: CreateCustomerArgs): Promise<CustomerView>;
    createJama(args: CreateJamaArgs): Promise<JamaView>;
    createUdhar(args: CreateUdharArgs): Promise<UdharView>;
    deleteCustomer(id: CustomerId): Promise<boolean>;
    deleteJama(id: JamaId): Promise<boolean>;
    deleteUdhar(id: UdharId): Promise<boolean>;
    getCustomer(id: CustomerId): Promise<CustomerView | null>;
    getCustomers(): Promise<Array<CustomerView>>;
    getDashboardStats(): Promise<DashboardStats>;
    getDueTodayReminders(): Promise<Array<CustomerView>>;
    getJamaByCustomer(customerId: CustomerId): Promise<Array<JamaView>>;
    getMyCustomerProfile(): Promise<Result_5>;
    getMyOutstandingBalance(): Promise<Result_4>;
    getMyPaymentRequests(): Promise<Result_3>;
    getMyPendingPaymentRequests(): Promise<Result_3>;
    getMyTransactionHistory(): Promise<Result_2>;
    getTransactionHistory(customerId: CustomerId): Promise<Array<TransactionEntry>>;
    getUdharByCustomer(customerId: CustomerId): Promise<Array<UdharView>>;
    getUserProfile(): Promise<UserProfile>;
    isAdmin(p: Principal): Promise<boolean>;
    linkMyAccount(customerId: bigint, mobileNumber: string): Promise<Result_1>;
    ownerApprovePaymentRequest(requestId: bigint): Promise<Result_1>;
    ownerGetAllPaymentRequests(): Promise<Array<CustomerPaymentRequestView>>;
    ownerGetPendingPaymentRequests(): Promise<Array<CustomerPaymentRequestView>>;
    ownerRejectPaymentRequest(requestId: bigint, reason: string): Promise<Result_1>;
    setAdminPrincipal(p: Principal): Promise<void>;
    submitPaymentRequest(amount: bigint, paymentType: PaymentType, notes: string): Promise<Result>;
    updateCustomer(id: CustomerId, args: UpdateCustomerArgs): Promise<CustomerView | null>;
    updateJama(id: JamaId, args: UpdateJamaArgs): Promise<JamaView | null>;
    updateUdhar(id: UdharId, args: UpdateUdharArgs): Promise<UdharView | null>;
    updateUserProfile(profile: UserProfile): Promise<void>;
}
