import List "mo:core/List";
import Result "mo:core/Result";
import Common "../types/common";
import CustomerTypes "../types/customer";
import UdharTypes "../types/udhar";
import JamaTypes "../types/jama";
import CPTypes "../types/customer-payment";
import CPLib "../lib/customer-payment";
import UdharLib "../lib/udhar";
import JamaLib "../lib/jama";

mixin (
  customers : List.List<CustomerTypes.Customer>,
  udharList : List.List<UdharTypes.Udhar>,
  jamaList : List.List<JamaTypes.Jama>,
  paymentRequests : List.List<CPTypes.CustomerPaymentRequest>,
  customerLinks : List.List<CPTypes.CustomerLinkRecord>,
  state : { var nextJamaId : Nat },
  paymentState : CPTypes.CustomerPaymentState,
) {

  // --- Customer-facing methods ---

  // Link this principal to a customer record using their mobile number
  public shared ({ caller }) func linkMyAccount(
    customerId : Nat,
    mobileNumber : Text,
  ) : async Result.Result<Text, Text> {
    CPLib.linkCustomerAccount(customerLinks, customers, customerId, mobileNumber, caller);
  };

  // Get the customer profile for the logged-in customer
  public shared query ({ caller }) func getMyCustomerProfile() : async Result.Result<CustomerTypes.CustomerView, Text> {
    switch (CPLib.getCustomerByPrincipal(customerLinks, customers, caller)) {
      case null { #err("No customer account linked to this identity") };
      case (?c) {
        if (c.blocked) {
          return #err("Your account has been blocked. Please contact the shop owner.");
        };
        #ok({
          id = c.id;
          name = c.name;
          mobileNumber = c.mobileNumber;
          address = c.address;
          creditLimit = c.creditLimit;
          notes = c.notes;
          outstandingBalance = c.outstandingBalance;
          status = c.status;
          blocked = c.blocked;
          email = c.email;
          createdAt = c.createdAt;
        });
      };
    };
  };

  // Get outstanding balance for the logged-in customer
  public shared query ({ caller }) func getMyOutstandingBalance() : async Result.Result<Int, Text> {
    switch (CPLib.getCustomerByPrincipal(customerLinks, customers, caller)) {
      case null { #err("No customer account linked to this identity") };
      case (?c) { #ok(c.outstandingBalance) };
    };
  };

  // Get full transaction history (all udhar + approved jama) for the logged-in customer
  public shared query ({ caller }) func getMyTransactionHistory() : async Result.Result<[Common.TransactionEntry], Text> {
    switch (CPLib.getCustomerByPrincipal(customerLinks, customers, caller)) {
      case null { #err("No customer account linked to this identity") };
      case (?c) {
        let shopOwner = c.owner;
        let udhars = UdharLib.getByCustomer(udharList, shopOwner, c.id);
        let jamas = JamaLib.getByCustomer(jamaList, shopOwner, c.id);
        var entries : List.List<Common.TransactionEntry> = List.empty();
        for (u in udhars.values()) {
          entries.add({
            id = u.id;
            customerId = c.id;
            kind = #udhar;
            amount = u.amount;
            description = u.description;
            createdAt = u.createdAt;
          });
        };
        for (j in jamas.values()) {
          entries.add({
            id = j.id;
            customerId = c.id;
            kind = #jama;
            amount = j.amount;
            description = j.notes;
            createdAt = j.createdAt;
          });
        };
        #ok(entries.toArray());
      };
    };
  };

  // Submit a payment request to the shop owner
  public shared ({ caller }) func submitPaymentRequest(
    amount : Nat,
    paymentType : Common.PaymentType,
    notes : Text,
  ) : async Result.Result<CPTypes.CustomerPaymentRequestView, Text> {
    switch (CPLib.getCustomerByPrincipal(customerLinks, customers, caller)) {
      case null { #err("No customer account linked to this identity") };
      case (?c) {
        if (c.blocked) {
          return #err("Your account has been blocked. Please contact the shop owner.");
        };
        CPLib.createPaymentRequest(
          paymentRequests,
          paymentState,
          c.id,
          caller,
          c.owner,
          amount,
          paymentType,
          notes,
        );
      };
    };
  };

  // Get all payment requests submitted by the logged-in customer
  public shared query ({ caller }) func getMyPaymentRequests() : async Result.Result<[CPTypes.CustomerPaymentRequestView], Text> {
    switch (CPLib.getCustomerByPrincipal(customerLinks, customers, caller)) {
      case null { #err("No customer account linked to this identity") };
      case (?c) {
        #ok(CPLib.getPaymentRequestsByCustomer(paymentRequests, c.id));
      };
    };
  };

  // Get only pending payment requests for the logged-in customer
  public shared query ({ caller }) func getMyPendingPaymentRequests() : async Result.Result<[CPTypes.CustomerPaymentRequestView], Text> {
    switch (CPLib.getCustomerByPrincipal(customerLinks, customers, caller)) {
      case null { #err("No customer account linked to this identity") };
      case (?c) {
        let all = CPLib.getPaymentRequestsByCustomer(paymentRequests, c.id);
        #ok(all.filter(func(r) { r.status == #pending }));
      };
    };
  };

  // --- Shop owner-facing methods ---

  // Owner: get all pending payment requests for their customers
  public shared query ({ caller }) func ownerGetPendingPaymentRequests() : async [CPTypes.CustomerPaymentRequestView] {
    CPLib.getPendingRequestsByOwner(paymentRequests, caller);
  };

  // Owner: get all payment requests (any status) for their customers
  public shared query ({ caller }) func ownerGetAllPaymentRequests() : async [CPTypes.CustomerPaymentRequestView] {
    CPLib.getPaymentRequestsByOwner(paymentRequests, caller);
  };

  // Owner: approve a payment request — creates a Jama entry and updates balance
  public shared ({ caller }) func ownerApprovePaymentRequest(
    requestId : Nat,
  ) : async Result.Result<Text, Text> {
    CPLib.approvePaymentRequest(
      paymentRequests,
      requestId,
      caller,
      jamaList,
      state,
      customers,
    );
  };

  // Owner: reject a payment request with a reason
  public shared ({ caller }) func ownerRejectPaymentRequest(
    requestId : Nat,
    reason : Text,
  ) : async Result.Result<Text, Text> {
    CPLib.rejectPaymentRequest(paymentRequests, requestId, caller, reason);
  };
};
