import type { backendInterface } from "../backend";
import {
  CustomerStatus,
  PaymentType,
  TransactionKind,
} from "../backend";
import { Principal } from "@icp-sdk/core/principal";

const now = BigInt(Date.now()) * BigInt(1_000_000);
const day = BigInt(86_400_000_000_000);

export const mockBackend: backendInterface = {
  getCustomers: async () => [
    {
      id: BigInt(1),
      name: "Ramesh Verma",
      mobileNumber: "9876543210",
      address: "12, Gandhi Nagar, Delhi",
      notes: "Regular customer",
      creditLimit: BigInt(50000),
      outstandingBalance: BigInt(12500),
      status: CustomerStatus.active,
      blocked: false,
      createdAt: now - day * BigInt(30),
    },
    {
      id: BigInt(2),
      name: "Sunita Sharma",
      mobileNumber: "9812345678",
      address: "45, MG Road, Mumbai",
      notes: "Pays on time",
      creditLimit: BigInt(30000),
      outstandingBalance: BigInt(8000),
      status: CustomerStatus.active,
      blocked: false,
      createdAt: now - day * BigInt(60),
    },
    {
      id: BigInt(3),
      name: "Ajay Patel",
      mobileNumber: "9988776655",
      address: "78, Ring Road, Ahmedabad",
      notes: "Overdue since last month",
      creditLimit: BigInt(20000),
      outstandingBalance: BigInt(15000),
      status: CustomerStatus.overdue,
      blocked: false,
      createdAt: now - day * BigInt(90),
    },
    {
      id: BigInt(4),
      name: "Priya Singh",
      mobileNumber: "9001234567",
      address: "23, Civil Lines, Lucknow",
      notes: "",
      creditLimit: BigInt(25000),
      outstandingBalance: BigInt(3200),
      status: CustomerStatus.active,
      blocked: false,
      createdAt: now - day * BigInt(15),
    },
    {
      id: BigInt(5),
      name: "Mohan Gupta",
      mobileNumber: "8765432109",
      address: "55, Sadar Bazaar, Jaipur",
      notes: "Wholesale buyer",
      creditLimit: BigInt(100000),
      outstandingBalance: BigInt(45000),
      status: CustomerStatus.overdue,
      blocked: false,
      createdAt: now - day * BigInt(120),
    },
  ],

  getCustomer: async (id) => ({
    id,
    name: "Ramesh Verma",
    mobileNumber: "9876543210",
    address: "12, Gandhi Nagar, Delhi",
    notes: "Regular customer",
    creditLimit: BigInt(50000),
    outstandingBalance: BigInt(12500),
    status: CustomerStatus.active,
    blocked: false,
    createdAt: now - day * BigInt(30),
  }),

  createCustomer: async (args) => ({
    id: BigInt(99),
    name: args.name,
    mobileNumber: args.mobileNumber,
    address: args.address,
    notes: args.notes,
    creditLimit: args.creditLimit,
    outstandingBalance: BigInt(0),
    status: CustomerStatus.active,
    blocked: false,
    createdAt: now,
  }),

  updateCustomer: async (id, args) => ({
    id,
    name: args.name,
    mobileNumber: args.mobileNumber,
    address: args.address,
    notes: args.notes,
    creditLimit: args.creditLimit,
    outstandingBalance: BigInt(12500),
    status: CustomerStatus.active,
    blocked: false,
    createdAt: now - day * BigInt(30),
  }),

  deleteCustomer: async () => true,

  getDashboardStats: async () => ({
    totalUdhar: BigInt(83700),
    totalJama: BigInt(41200),
    pendingBalance: BigInt(42500),
    todayCollection: BigInt(7500),
    overdueCustomerCount: BigInt(2),
    top5CustomersByBalance: [
      { id: BigInt(5), name: "Mohan Gupta", outstandingBalance: BigInt(45000) },
      { id: BigInt(3), name: "Ajay Patel", outstandingBalance: BigInt(15000) },
      { id: BigInt(1), name: "Ramesh Verma", outstandingBalance: BigInt(12500) },
      { id: BigInt(2), name: "Sunita Sharma", outstandingBalance: BigInt(8000) },
      { id: BigInt(4), name: "Priya Singh", outstandingBalance: BigInt(3200) },
    ],
  }),

  getUdharByCustomer: async (customerId) => [
    {
      id: BigInt(1),
      customerId,
      amount: BigInt(5000),
      description: "Grocery items",
      notes: "Monthly supply",
      dueDate: now + day * BigInt(15),
      createdAt: now - day * BigInt(5),
    },
    {
      id: BigInt(2),
      customerId,
      amount: BigInt(7500),
      description: "Electronics parts",
      notes: "",
      dueDate: now - day * BigInt(2),
      createdAt: now - day * BigInt(20),
    },
  ],

  createUdhar: async (args) => ({
    id: BigInt(99),
    customerId: args.customerId,
    amount: args.amount,
    description: args.description,
    notes: args.notes,
    dueDate: args.dueDate,
    createdAt: now,
  }),

  updateUdhar: async (id, args) => ({
    id,
    customerId: BigInt(1),
    amount: args.amount,
    description: args.description,
    notes: args.notes,
    dueDate: args.dueDate,
    createdAt: now - day * BigInt(5),
  }),

  deleteUdhar: async () => true,

  getJamaByCustomer: async (customerId) => [
    {
      id: BigInt(1),
      customerId,
      amount: BigInt(3000),
      paymentType: PaymentType.cash,
      notes: "Partial payment",
      createdAt: now - day * BigInt(3),
    },
    {
      id: BigInt(2),
      customerId,
      amount: BigInt(5000),
      paymentType: PaymentType.online,
      notes: "UPI transfer",
      createdAt: now - day * BigInt(10),
    },
  ],

  createJama: async (args) => ({
    id: BigInt(99),
    customerId: args.customerId,
    amount: args.amount,
    paymentType: args.paymentType,
    notes: args.notes,
    createdAt: now,
  }),

  updateJama: async (id, args) => ({
    id,
    customerId: BigInt(1),
    amount: args.amount,
    paymentType: args.paymentType,
    notes: args.notes,
    createdAt: now - day * BigInt(3),
  }),

  deleteJama: async () => true,

  getUserProfile: async () => ({
    businessName: '',
    mobileNumber: '',
    country: 'India',
    currency: 'INR',
    language: 'en',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
  }),

  updateUserProfile: async (_profile: unknown) => {},

  getTransactionHistory: async (customerId) => [
    {
      id: BigInt(1),
      customerId,
      kind: TransactionKind.udhar,
      amount: BigInt(5000),
      description: "Grocery items",
      createdAt: now - day * BigInt(5),
    },
    {
      id: BigInt(2),
      customerId,
      kind: TransactionKind.jama,
      amount: BigInt(3000),
      description: "Partial payment",
      createdAt: now - day * BigInt(3),
    },
    {
      id: BigInt(3),
      customerId,
      kind: TransactionKind.udhar,
      amount: BigInt(7500),
      description: "Electronics parts",
      createdAt: now - day * BigInt(20),
    },
    {
      id: BigInt(4),
      customerId,
      kind: TransactionKind.jama,
      amount: BigInt(5000),
      description: "UPI transfer",
      createdAt: now - day * BigInt(10),
    },
  ],

  getDueTodayReminders: async () => [],

  adminGetAllCustomers: async () => mockBackend.getCustomers(),

  adminGetAllUdhar: async () => [
    {
      id: BigInt(1),
      customerId: BigInt(1),
      amount: BigInt(5000),
      description: "Grocery items",
      notes: "Monthly supply",
      dueDate: now + day * BigInt(15),
      createdAt: now - day * BigInt(5),
    },
    {
      id: BigInt(2),
      customerId: BigInt(3),
      amount: BigInt(7500),
      description: "Electronics parts",
      notes: "",
      dueDate: now - day * BigInt(2),
      createdAt: now - day * BigInt(20),
    },
  ],

  adminGetAllJama: async () => [
    {
      id: BigInt(1),
      customerId: BigInt(1),
      amount: BigInt(3000),
      paymentType: PaymentType.cash,
      notes: "Partial payment",
      createdAt: now - day * BigInt(3),
    },
    {
      id: BigInt(2),
      customerId: BigInt(2),
      amount: BigInt(5000),
      paymentType: PaymentType.online,
      notes: "UPI transfer",
      createdAt: now - day * BigInt(10),
    },
  ],

  adminGetStats: async () => ({
    totalCustomers: BigInt(5),
    totalUdhar: BigInt(2),
    totalUdharAmount: 12500,
    totalJama: BigInt(2),
    totalJamaAmount: 8000,
    blockedCount: BigInt(0),
  }),

  adminGetAdminPrincipal: async () => null,

  adminUpdateCustomer: async (id, args) => ({
    id,
    name: args.name,
    mobileNumber: args.mobileNumber,
    address: args.address,
    notes: args.notes,
    creditLimit: args.creditLimit,
    outstandingBalance: BigInt(12500),
    status: CustomerStatus.active,
    blocked: false,
    createdAt: now - day * BigInt(30),
  }),

  adminDeleteCustomer: async () => true,

  adminBlockCustomer: async () => true,

  adminUnblockCustomer: async () => true,

  adminDeleteUdhar: async () => true,

  adminDeleteJama: async () => true,

  setAdminPrincipal: async () => {},

  isAdmin: async () => false,

  getMyCustomerProfile: async () => ({
    __kind__: "err",
    err: "Not linked",
  }),

  getMyOutstandingBalance: async () => ({
    __kind__: "err",
    err: "Not linked",
  }),

  getMyPaymentRequests: async () => ({
    __kind__: "err",
    err: "Not linked",
  }),

  getMyPendingPaymentRequests: async () => ({
    __kind__: "err",
    err: "Not linked",
  }),

  getMyTransactionHistory: async () => ({
    __kind__: "err",
    err: "Not linked",
  }),

  linkMyAccount: async () => ({
    __kind__: "err",
    err: "Not linked",
  }),

  submitPaymentRequest: async () => ({
    __kind__: "err",
    err: "Not linked",
  }),

  ownerGetAllPaymentRequests: async () => [],

  ownerGetPendingPaymentRequests: async () => [],

  ownerApprovePaymentRequest: async () => ({
    __kind__: "err",
    err: "Not linked",
  }),

  ownerRejectPaymentRequest: async () => ({
    __kind__: "err",
    err: "Not linked",
  }),
};
