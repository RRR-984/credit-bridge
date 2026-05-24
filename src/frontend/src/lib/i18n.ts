export type Language = "en" | "hi";

export type TranslationKey =
  | "totalCredit"
  | "totalCollection"
  | "outstandingBalance"
  | "todaysCollection"
  | "addCustomer"
  | "addCredit"
  | "addCollection"
  | "dashboard"
  | "customers"
  | "settings"
  | "creditHistory"
  | "collectionHistory"
  | "noCustomers"
  | "search"
  | "save"
  | "cancel"
  | "country"
  | "currency"
  | "language"
  | "theme"
  | "businessName"
  | "mobileNumber"
  | "backupSync"
  | "dueDate"
  | "paymentHistory"
  | "notes"
  | "riskScore"
  | "signIn"
  | "mobileNumberLabel"
  | "loginWithOtp"
  | "secureBusinessLogin"
  | "credit"
  | "collection"
  | "logout"
  | "overdueCustomers"
  | "topPendingCustomers"
  | "recentTransactions"
  | "businessDashboard"
  | "creditCollectionOverview"
  | "viewAll"
  | "noCustomersYet"
  | "noTransactionsYet"
  | "addFirstCustomer"
  | "browseCustomers"
  | "loading"
  | "failedToLoad"
  | "saveSettings"
  | "businessProfile"
  | "regionalSettings"
  | "preferences"
  | "lightMode"
  | "darkMode"
  | "cloudSync"
  | "cloudSyncSoon"
  | "selectCountry"
  | "enterMobileNumber"
  | "enterOtp"
  | "otpSentTo"
  | "didntReceiveOtp"
  | "resend"
  | "verifyAndLogin"
  | "continueWithMobile"
  | "smartCreditMgmt"
  | "repaymentType"
  | "simple"
  | "fixedDaily"
  | "interestLoan"
  | "dailyAmount"
  | "totalDays"
  | "totalToCollect"
  | "profitAmount"
  | "interestRate"
  | "loanDuration"
  | "repaymentMode"
  | "endOfTerm"
  | "monthly"
  | "quarterly"
  | "halfYearly"
  | "daily"
  | "totalInterest"
  | "totalPayable"
  | "dailyInstallment"
  | "monthlyInstallment"
  | "quarterlyInstallment"
  | "halfYearlyInstallment"
  | "repaymentBreakdown"
  | "repaymentSchedule"
  | "customer"
  | "creditAmount"
  | "productService"
  | "searchCustomer"
  | "saveCreditEntry"
  | "saving"
  | "optional"
  | "customerManagement"
  | "totalCustomers"
  | "blockedAccounts"
  | "active"
  | "blocked"
  | "blockCustomer"
  | "unblockCustomer"
  | "deleteCustomer"
  | "editCustomer"
  | "name"
  | "address"
  | "creditLimit"
  | "actions"
  | "status"
  | "areYouSureDelete"
  | "cannotBeUndone"
  | "confirm"
  | "adminDashboard"
  | "adminPanel"
  | "allCustomers"
  | "allTransactions"
  | "systemStats"
  | "totalTransactions"
  | "blockedCount"
  | "creditTotal"
  | "collectionTotal"
  | "adminAccess"
  | "notAdmin"
  | "setAsAdmin"
  | "adminSetupTitle"
  | "adminSetupDesc"
  | "fullSystemControl"
  | "outstandingCredit"
  | "totalCreditIssued"
  | "totalCollections"
  | "quickActions"
  | "date"
  | "transactionType"
  | "amount"
  | "customerBlocked"
  | "customerUnblocked"
  | "customerUpdated"
  | "customerDeleted"
  | "manageCustomers"
  | "transactionsPage"
  | "filterAll"
  | "filterCredit"
  | "filterCollection"
  | "sortNewest"
  | "sortOldest"
  | "sortAmount"
  | "downloadReport"
  | "scrollToTop"
  | "drIndicator"
  | "crIndicator"
  | "statusSuccess"
  | "statusProcessing"
  | "statusFailed"
  | "transactionId"
  | "noTransactions"
  | "emailAddress"
  | "emailNotifications"
  | "customerPortal"
  | "myAccount"
  | "linkAccount"
  | "submitPayment"
  | "paymentRequests"
  | "pendingApprovals"
  | "submitPaymentRequest"
  | "paymentSubmitted"
  | "approvePayment"
  | "rejectPayment"
  | "approvalPending"
  | "paymentApproved"
  | "paymentRejected"
  | "enterCustomerId"
  | "linkMyAccount"
  | "accountLinked"
  | "accountNotFound"
  | "amountLabel"
  | "paymentTypeLabel"
  | "cashPayment"
  | "onlinePayment"
  | "depositPayment"
  | "totalCredits"
  | "totalPaymentsMade"
  | "noPaymentRequests"
  | "noPendingApprovals"
  | "pendingApprovalAlert"
  | "viewPendingApprovals"
  | "allRequests"
  | "rejectionReason";

export type Translations = Record<TranslationKey, string>;

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    totalCredit: "Total Credit",
    totalCollection: "Total Collection",
    outstandingBalance: "Outstanding Balance",
    todaysCollection: "Today's Collection",
    addCustomer: "Add Customer",
    addCredit: "Add Credit",
    addCollection: "Add Collection",
    dashboard: "Dashboard",
    customers: "Customers",
    settings: "Settings",
    creditHistory: "Credit History",
    collectionHistory: "Collection History",
    noCustomers: "No customers found",
    search: "Search",
    save: "Save",
    cancel: "Cancel",
    country: "Country",
    currency: "Currency",
    language: "Language",
    theme: "Theme",
    businessName: "Business Name",
    mobileNumber: "Mobile Number",
    backupSync: "Backup & Sync",
    dueDate: "Due Date",
    paymentHistory: "Payment History",
    notes: "Notes",
    riskScore: "Risk Score",
    signIn: "Sign In",
    mobileNumberLabel: "Mobile Number",
    loginWithOtp: "Login with OTP",
    secureBusinessLogin: "Secure Business Login",
    credit: "Credit",
    collection: "Collection",
    logout: "Logout",
    overdueCustomers: "Overdue Customers",
    topPendingCustomers: "Top Pending Customers",
    recentTransactions: "Recent Transactions",
    businessDashboard: "Business Dashboard",
    creditCollectionOverview: "Your credit & collection overview",
    viewAll: "View All",
    noCustomersYet: "No customers yet",
    noTransactionsYet: "No transactions yet",
    addFirstCustomer: "Start by adding a customer and recording a credit",
    browseCustomers: "Browse Customers",
    loading: "Loading...",
    failedToLoad: "Failed to load. Please try again.",
    saveSettings: "Save Settings",
    businessProfile: "Business Profile",
    regionalSettings: "Regional Settings",
    preferences: "Preferences",
    lightMode: "Light",
    darkMode: "Dark",
    cloudSync: "Cloud Sync",
    cloudSyncSoon:
      "Cloud sync coming soon. Your data is securely stored on-chain.",
    selectCountry: "Select Country",
    enterMobileNumber: "Enter mobile number",
    enterOtp: "Enter 6-Digit OTP",
    otpSentTo: "OTP sent to",
    didntReceiveOtp: "Didn't receive OTP?",
    resend: "Resend",
    verifyAndLogin: "Verify & Login",
    continueWithMobile: "Continue with Mobile Number",
    smartCreditMgmt: "Smart Credit Management for Growing Businesses",
    repaymentType: "Repayment Type",
    simple: "Simple Credit",
    fixedDaily: "Fixed Daily Repayment",
    interestLoan: "Interest Loan",
    dailyAmount: "Daily Collection Amount",
    totalDays: "Total Days",
    totalToCollect: "Total to Collect",
    profitAmount: "Your Profit",
    interestRate: "Interest Rate (%/month)",
    loanDuration: "Loan Duration (months)",
    repaymentMode: "Repayment Mode",
    endOfTerm: "Full Payment at End",
    monthly: "Monthly",
    quarterly: "Quarterly",
    halfYearly: "Half Yearly",
    daily: "Daily",
    totalInterest: "Total Interest",
    totalPayable: "Total Payable",
    dailyInstallment: "Daily Installment",
    monthlyInstallment: "Monthly Installment",
    quarterlyInstallment: "Quarterly Installment",
    halfYearlyInstallment: "Half Yearly Installment",
    repaymentBreakdown: "Repayment Breakdown",
    repaymentSchedule: "Repayment Schedule",
    customer: "Customer",
    creditAmount: "Credit Amount",
    productService: "Product / Service",
    searchCustomer: "Search and select customer",
    saveCreditEntry: "Save Credit Entry",
    saving: "Saving...",
    optional: "(optional)",
    customerManagement: "Customer Management",
    totalCustomers: "Total Customers",
    blockedAccounts: "Blocked Accounts",
    active: "Active",
    blocked: "Blocked",
    blockCustomer: "Block",
    unblockCustomer: "Unblock",
    deleteCustomer: "Delete",
    editCustomer: "Edit",
    name: "Name",
    address: "Address",
    creditLimit: "Credit Limit",
    actions: "Actions",
    status: "Status",
    areYouSureDelete: "Are you sure?",
    cannotBeUndone: "This cannot be undone.",
    confirm: "Confirm",
    adminDashboard: "Admin Dashboard",
    adminPanel: "Admin Panel",
    allCustomers: "All Customers",
    allTransactions: "All Transactions",
    systemStats: "System Stats",
    totalTransactions: "Total Transactions",
    blockedCount: "Blocked Count",
    creditTotal: "Credit Total",
    collectionTotal: "Collection Total",
    adminAccess: "Admin Access",
    notAdmin: "You do not have admin access.",
    setAsAdmin: "Set as Admin",
    adminSetupTitle: "Admin Setup",
    adminSetupDesc: "Set the admin principal for this canister.",
    fullSystemControl: "Full System Control",
    outstandingCredit: "Outstanding Credit",
    totalCreditIssued: "Total Credit Issued",
    totalCollections: "Total Collections",
    quickActions: "Quick Actions",
    date: "Date",
    transactionType: "Type",
    amount: "Amount",
    customerBlocked: "Customer blocked",
    customerUnblocked: "Customer unblocked",
    customerUpdated: "Customer updated",
    customerDeleted: "Customer deleted",
    manageCustomers: "Manage Customers",
    transactionsPage: "Transactions",
    filterAll: "All",
    filterCredit: "Credit",
    filterCollection: "Collection",
    sortNewest: "Newest First",
    sortOldest: "Oldest First",
    sortAmount: "By Amount",
    downloadReport: "Download Report",
    scrollToTop: "Scroll to Top",
    drIndicator: "Dr",
    crIndicator: "Cr",
    statusSuccess: "SUCCESS",
    statusProcessing: "PROCESSING",
    statusFailed: "FAILED",
    transactionId: "Transaction ID",
    noTransactions: "No transactions found",
    emailAddress: "Email Address",
    emailNotifications: "Email Notifications",
    customerPortal: "Customer Portal",
    myAccount: "My Account",
    linkAccount: "Link Account",
    submitPayment: "Submit Payment",
    paymentRequests: "Payment Requests",
    pendingApprovals: "Pending Approvals",
    submitPaymentRequest: "Submit Payment Request",
    paymentSubmitted: "Payment submitted — awaiting shop owner approval",
    approvePayment: "Approve",
    rejectPayment: "Reject",
    approvalPending: "Pending",
    paymentApproved: "Approved",
    paymentRejected: "Rejected",
    enterCustomerId: "Enter Customer ID",
    linkMyAccount: "Link My Account",
    accountLinked: "Account linked successfully",
    accountNotFound: "Account not found. Please check your details.",
    amountLabel: "Amount",
    paymentTypeLabel: "Payment Type",
    cashPayment: "Cash",
    onlinePayment: "Online",
    depositPayment: "Deposit",
    totalCredits: "Total Credits",
    totalPaymentsMade: "Total Payments Made",
    noPaymentRequests: "No payment requests yet",
    noPendingApprovals: "No pending approvals",
    pendingApprovalAlert: "You have pending payment requests to review",
    viewPendingApprovals: "View Pending Approvals",
    allRequests: "All Requests",
    rejectionReason: "Rejection Reason",
  },
  hi: {
    totalCredit: "कुल उधार",
    totalCollection: "कुल जमा",
    outstandingBalance: "बाकाया राशि",
    todaysCollection: "आज की जमा",
    addCustomer: "ग्राहक जोड़ें",
    addCredit: "उधार जोड़ें",
    addCollection: "जमा जोड़ें",
    dashboard: "डैशबोर्ड",
    customers: "ग्राहक",
    settings: "सेटिंग्स",
    creditHistory: "उधार इतिहास",
    collectionHistory: "जमा इतिहास",
    noCustomers: "कोई ग्राहक नहीं मिला",
    search: "खोजें",
    save: "सहेजें",
    cancel: "रद्द करें",
    country: "देश",
    currency: "मुद्रा",
    language: "भाषा",
    theme: "थीम",
    businessName: "व्यापार का नाम",
    mobileNumber: "मोबाइल नंबर",
    backupSync: "बैकअप और सिंक",
    dueDate: "देय तिथि",
    paymentHistory: "भुगतान इतिहास",
    notes: "नोट्स",
    riskScore: "जोखिम स्कोर",
    signIn: "साइन इन करें",
    mobileNumberLabel: "मोबाइल नंबर",
    loginWithOtp: "OTP से लॉगिन करें",
    secureBusinessLogin: "सुरक्षित व्यापार लॉगिन",
    credit: "उधार",
    collection: "जमा",
    logout: "लॉगआउट",
    overdueCustomers: "बकाया ग्राहक",
    topPendingCustomers: "शीर्ष बकाया ग्राहक",
    recentTransactions: "हालिया लेनदेन",
    businessDashboard: "व्यापार डैशबोर्ड",
    creditCollectionOverview: "आपका उधार और जमा सारांश",
    viewAll: "सभी देखें",
    noCustomersYet: "अभी कोई ग्राहक नहीं",
    noTransactionsYet: "अभी कोई लेनदेन नहीं",
    addFirstCustomer: "ग्राहक जोड़कर उधार दर्ज करें",
    browseCustomers: "ग्राहक देखें",
    loading: "लोड हो रहा है...",
    failedToLoad: "लोड नहीं हुआ। फिर कोशिश करें।",
    saveSettings: "सेटिंग्स सहेजें",
    businessProfile: "व्यापार प्रोफ़ाइल",
    regionalSettings: "क्षेत्रीय सेटिंग्स",
    preferences: "प्राथमिकताएं",
    lightMode: "लाइट",
    darkMode: "डार्क",
    cloudSync: "क्लाउड सिंक",
    cloudSyncSoon: "क्लाउड सिंक जल्द आ रहा है। आपका डेटा ऑन-चेन सुरक्षित है।",
    selectCountry: "देश चुनें",
    enterMobileNumber: "मोबाइल नंबर दर्ज करें",
    enterOtp: "6-अंकीय OTP दर्ज करें",
    otpSentTo: "OTP भेजा गया",
    didntReceiveOtp: "OTP नहीं मिला?",
    resend: "दोबारा भेजें",
    verifyAndLogin: "सत्यापित करें और लॉगिन करें",
    continueWithMobile: "मोबाइल नंबर से जारी रखें",
    smartCreditMgmt: "बढ़ते व्यापार के लिए स्मार्ट उधार प्रबंधन",
    repaymentType: "भुगतान प्रकार",
    simple: "सामान्य उधार",
    fixedDaily: "निश्चित दैनिक भुगतान",
    interestLoan: "ब्याज ऋण",
    dailyAmount: "दैनिक जमा राशि",
    totalDays: "कुल दिन",
    totalToCollect: "कुल वसूली",
    profitAmount: "आपका लाभ",
    interestRate: "ब्याज दर (%/माह)",
    loanDuration: "ऋण अवधि (महीने)",
    repaymentMode: "भुगतान मोड",
    endOfTerm: "अंत में पूरा भुगतान",
    monthly: "मासिक",
    quarterly: "तिमाही",
    halfYearly: "छमाही",
    daily: "दैनिक",
    totalInterest: "कुल ब्याज",
    totalPayable: "कुल देय",
    dailyInstallment: "दैनिक किस्त",
    monthlyInstallment: "मासिक किस्त",
    quarterlyInstallment: "तिमाही किस्त",
    halfYearlyInstallment: "छमाही किस्त",
    repaymentBreakdown: "भुगतान विवरण",
    repaymentSchedule: "भुगतान अनुसूची",
    customer: "ग्राहक",
    creditAmount: "उधार राशि",
    productService: "उत्पाद / सेवा",
    searchCustomer: "ग्राहक खोजें और चुनें",
    saveCreditEntry: "उधार सहेजें",
    saving: "सहेज रहे हैं...",
    optional: "(वैकल्पिक)",
    customerManagement: "ग्राहक प्रबंधन",
    totalCustomers: "कुल ग्राहक",
    blockedAccounts: "ब्लॉक खाते",
    active: "सक्रिय",
    blocked: "ब्लॉक",
    blockCustomer: "ब्लॉक करें",
    unblockCustomer: "अनब्लॉक करें",
    deleteCustomer: "हटाएं",
    editCustomer: "संपादित करें",
    name: "नाम",
    address: "पता",
    creditLimit: "क्रेडिट सीमा",
    actions: "कार्रवाई",
    status: "स्थिति",
    areYouSureDelete: "क्या आप सुनिश्चित हैं?",
    cannotBeUndone: "इसे वापस नहीं किया जा सकता।",
    confirm: "पुष्टि करें",
    adminDashboard: "एडमिन डैशबोर्ड",
    adminPanel: "एडमिन पैनल",
    allCustomers: "सभी ग्राहक",
    allTransactions: "सभी लेनदेन",
    systemStats: "सिस्टम आंकड़े",
    totalTransactions: "कुल लेनदेन",
    blockedCount: "ब्लॉक संख्या",
    creditTotal: "कुल उधार",
    collectionTotal: "कुल जमा",
    adminAccess: "एडमिन एक्सेस",
    notAdmin: "आपके पास एडमिन एक्सेस नहीं है।",
    setAsAdmin: "एडमिन बनाएं",
    adminSetupTitle: "एडमिन सेटअप",
    adminSetupDesc: "इस कैनिस्टर के लिए एडमिन प्रिंसिपल सेट करें।",
    fullSystemControl: "पूर्ण सिस्टम नियंत्रण",
    outstandingCredit: "बाकाया उधार",
    totalCreditIssued: "कुल जारी उधार",
    totalCollections: "कुल वसूली",
    quickActions: "त्वरित कार्रवाई",
    date: "तारीख",
    transactionType: "प्रकार",
    amount: "राशि",
    customerBlocked: "ग्राहक ब्लॉक हुआ",
    customerUnblocked: "ग्राहक अनब्लॉक हुआ",
    customerUpdated: "ग्राहक अपडेट हुआ",
    customerDeleted: "ग्राहक हटाया",
    manageCustomers: "ग्राहक प्रबंधन",
    transactionsPage: "लेनदेन",
    filterAll: "सभी",
    filterCredit: "उधार",
    filterCollection: "जमा",
    sortNewest: "सबसे नया",
    sortOldest: "सबसे पुराना",
    sortAmount: "राशि के अनुसार",
    downloadReport: "रिपोर्ट डाउनलोड करें",
    scrollToTop: "ऊपर जाएं",
    drIndicator: "डेबिट",
    crIndicator: "क्रेडिट",
    statusSuccess: "सफल",
    statusProcessing: "प्रक्रिया में",
    statusFailed: "विफल",
    transactionId: "लेनदेन आईडी",
    noTransactions: "कोई लेनदेन नहीं मिला",
    emailAddress: "ईमेल पता",
    emailNotifications: "ईमेल सूचनाएं",
    customerPortal: "ग्राहक पोर्टल",
    myAccount: "मेरा खाता",
    linkAccount: "खाता लिंक करें",
    submitPayment: "भुगतान जमा करें",
    paymentRequests: "भुगतान अनुरोध",
    pendingApprovals: "लंबित अनुमोदन",
    submitPaymentRequest: "भुगतान अनुरोध जमा करें",
    paymentSubmitted: "भुगतान जमा किया गया — दुकान मालिक की स्वीकृति का इंतजार है",
    approvePayment: "स्वीकृत करें",
    rejectPayment: "अस्वीकार करें",
    approvalPending: "लंबित",
    paymentApproved: "स्वीकृत",
    paymentRejected: "अस्वीकृत",
    enterCustomerId: "ग्राहक आईडी दर्ज करें",
    linkMyAccount: "मेरा खाता लिंक करें",
    accountLinked: "खाता सफलतापूर्वक लिंक हो गया",
    accountNotFound: "खाता नहीं मिला। कृपया अपना विवरण जांचें।",
    amountLabel: "राशि",
    paymentTypeLabel: "भुगतान प्रकार",
    cashPayment: "नकद",
    onlinePayment: "ऑनलाइन",
    depositPayment: "जमा",
    totalCredits: "कुल उधार",
    totalPaymentsMade: "कुल भुगतान",
    noPaymentRequests: "अभी कोई भुगतान अनुरोध नहीं",
    noPendingApprovals: "कोई लंबित अनुमोदन नहीं",
    pendingApprovalAlert: "आपके पास समीक्षा के लिए लंबित भुगतान अनुरोध हैं",
    viewPendingApprovals: "लंबित अनुमोदन देखें",
    allRequests: "सभी अनुरोध",
    rejectionReason: "अस्वीकृति का कारण",
  },
};

export function translate(lang: Language, key: TranslationKey): string {
  return TRANSLATIONS[lang][key] ?? key;
}
