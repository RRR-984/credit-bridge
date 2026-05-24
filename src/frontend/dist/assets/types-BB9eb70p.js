var CustomerStatus = /* @__PURE__ */ ((CustomerStatus2) => {
  CustomerStatus2["active"] = "active";
  CustomerStatus2["overdue"] = "overdue";
  return CustomerStatus2;
})(CustomerStatus || {});
var PaymentType = /* @__PURE__ */ ((PaymentType2) => {
  PaymentType2["cash"] = "cash";
  PaymentType2["deposit"] = "deposit";
  PaymentType2["online"] = "online";
  return PaymentType2;
})(PaymentType || {});
var TransactionKind = /* @__PURE__ */ ((TransactionKind2) => {
  TransactionKind2["jama"] = "jama";
  TransactionKind2["udhar"] = "udhar";
  return TransactionKind2;
})(TransactionKind || {});
export {
  CustomerStatus as C,
  PaymentType as P,
  TransactionKind as T
};
