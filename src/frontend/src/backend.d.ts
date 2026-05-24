import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UdharId = bigint;
export type Timestamp = bigint;
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
export interface UpdateCustomerArgs {
    name: string;
    mobileNumber: string;
    email?: string;
    creditLimit: bigint;
    address: string;
    notes: string;
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
    getTransactionHistory(customerId: CustomerId): Promise<Array<TransactionEntry>>;
    getUdharByCustomer(customerId: CustomerId): Promise<Array<UdharView>>;
    getUserProfile(): Promise<UserProfile>;
    isAdmin(p: Principal): Promise<boolean>;
    setAdminPrincipal(p: Principal): Promise<void>;
    updateCustomer(id: CustomerId, args: UpdateCustomerArgs): Promise<CustomerView | null>;
    updateJama(id: JamaId, args: UpdateJamaArgs): Promise<JamaView | null>;
    updateUdhar(id: UdharId, args: UpdateUdharArgs): Promise<UdharView | null>;
    updateUserProfile(profile: UserProfile): Promise<void>;
}
