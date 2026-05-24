import List "mo:core/List";
import Result "mo:core/Result";
import Time "mo:core/Time";
import Common "../types/common";
import CustomerTypes "../types/customer";
import JamaTypes "../types/jama";
import CPTypes "../types/customer-payment";

module {
  public type CustomerPaymentRequest = CPTypes.CustomerPaymentRequest;
  public type CustomerPaymentRequestView = CPTypes.CustomerPaymentRequestView;
  public type CustomerLinkRecord = CPTypes.CustomerLinkRecord;
  public type Customer = CustomerTypes.Customer;
  public type CustomerView = CustomerTypes.CustomerView;
  public type Jama = JamaTypes.Jama;

  public func toView(r : CustomerPaymentRequest) : CustomerPaymentRequestView {
    {
      id = r.id;
      customerId = r.customerId;
      shopOwnerPrincipal = r.shopOwnerPrincipal;
      customerPrincipal = r.customerPrincipal;
      amount = r.amount;
      paymentType = r.paymentType;
      notes = r.notes;
      status = r.status;
      createdAt = r.createdAt;
      resolvedAt = r.resolvedAt;
      rejectionReason = r.rejectionReason;
    };
  };

  // Link a customer principal to a customer record (verifies mobile number)
  public func linkCustomerAccount(
    customerLinks : List.List<CustomerLinkRecord>,
    customers : List.List<Customer>,
    customerId : Common.CustomerId,
    mobileNumber : Text,
    principal : Principal,
  ) : Result.Result<Text, Text> {
    // Check if principal already linked to a different customer
    switch (customerLinks.find(func(l) { l.linkedPrincipal == principal })) {
      case (?existing) {
        if (existing.customerId == customerId) {
          return #ok("Already linked");
        } else {
          return #err("Principal already linked to a different customer");
        };
      };
      case null {};
    };
    // Find the customer and verify mobile number
    switch (customers.find(func(c) { c.id == customerId })) {
      case null { #err("Customer not found") };
      case (?c) {
        if (c.mobileNumber != mobileNumber) {
          return #err("Mobile number does not match");
        };
        // Remove any previous link for this customer
        let kept = customerLinks.filter(func(l) { l.customerId != customerId });
        customerLinks.clear();
        customerLinks.addAll(kept.values());
        customerLinks.add({
          customerId;
          mobileNumber;
          linkedPrincipal = principal;
          linkedAt = Time.now();
        });
        #ok("Account linked successfully");
      };
    };
  };

  // Find the customer linked to a given principal
  public func getCustomerByPrincipal(
    customerLinks : List.List<CustomerLinkRecord>,
    customers : List.List<Customer>,
    principal : Principal,
  ) : ?Customer {
    switch (customerLinks.find(func(l) { l.linkedPrincipal == principal })) {
      case null { null };
      case (?link) {
        customers.find(func(c) { c.id == link.customerId });
      };
    };
  };

  // Create a payment request from a linked customer
  public func createPaymentRequest(
    paymentRequests : List.List<CustomerPaymentRequest>,
    state : CPTypes.CustomerPaymentState,
    customerId : Common.CustomerId,
    customerPrincipal : Principal,
    shopOwnerPrincipal : Principal,
    amount : Nat,
    paymentType : Common.PaymentType,
    notes : Text,
  ) : Result.Result<CustomerPaymentRequestView, Text> {
    if (amount == 0) {
      return #err("Amount must be greater than zero");
    };
    let id = state.nextPaymentId;
    state.nextPaymentId += 1;
    let req : CustomerPaymentRequest = {
      id;
      customerId;
      shopOwnerPrincipal;
      customerPrincipal;
      var amount;
      var paymentType;
      var notes;
      var status = #pending;
      createdAt = Time.now();
      var resolvedAt = null;
      var rejectionReason = null;
    };
    paymentRequests.add(req);
    #ok(toView(req));
  };

  // Get all payment requests for a customer
  public func getPaymentRequestsByCustomer(
    paymentRequests : List.List<CustomerPaymentRequest>,
    customerId : Common.CustomerId,
  ) : [CustomerPaymentRequestView] {
    paymentRequests
      .filter(func(r) { r.customerId == customerId })
      .map<CustomerPaymentRequest, CustomerPaymentRequestView>(func(r) { toView(r) })
      .toArray();
  };

  // Get all payment requests for a shop owner
  public func getPaymentRequestsByOwner(
    paymentRequests : List.List<CustomerPaymentRequest>,
    shopOwnerPrincipal : Principal,
  ) : [CustomerPaymentRequestView] {
    paymentRequests
      .filter(func(r) { r.shopOwnerPrincipal == shopOwnerPrincipal })
      .map<CustomerPaymentRequest, CustomerPaymentRequestView>(func(r) { toView(r) })
      .toArray();
  };

  // Get only pending payment requests for a shop owner
  public func getPendingRequestsByOwner(
    paymentRequests : List.List<CustomerPaymentRequest>,
    shopOwnerPrincipal : Principal,
  ) : [CustomerPaymentRequestView] {
    paymentRequests
      .filter(func(r) { r.shopOwnerPrincipal == shopOwnerPrincipal and r.status == #pending })
      .map<CustomerPaymentRequest, CustomerPaymentRequestView>(func(r) { toView(r) })
      .toArray();
  };

  // Approve a payment request — creates a real Jama entry and updates customer balance
  public func approvePaymentRequest(
    paymentRequests : List.List<CustomerPaymentRequest>,
    requestId : Nat,
    approverPrincipal : Principal,
    jamaList : List.List<Jama>,
    state : { var nextJamaId : Nat },
    customers : List.List<Customer>,
  ) : Result.Result<Text, Text> {
    switch (paymentRequests.find(func(r) { r.id == requestId })) {
      case null { #err("Payment request not found") };
      case (?req) {
        if (req.shopOwnerPrincipal != approverPrincipal) {
          return #err("Not authorized: only the shop owner can approve");
        };
        if (req.status != #pending) {
          return #err("Request is not in pending state");
        };
        // Create actual Jama entry
        let jamaId = state.nextJamaId;
        state.nextJamaId += 1;
        let j : Jama = {
          id = jamaId;
          customerId = req.customerId;
          owner = approverPrincipal;
          var amount = req.amount;
          var paymentType = req.paymentType;
          var notes = req.notes;
          createdAt = Time.now();
        };
        jamaList.add(j);
        // Recalculate customer balance
        switch (customers.find(func(c) { c.id == req.customerId })) {
          case null {};
          case (?c) {
            c.outstandingBalance := c.outstandingBalance - req.amount;
            if (c.outstandingBalance <= 0) {
              c.status := #active;
            };
          };
        };
        // Update request status
        req.status := #approved;
        req.resolvedAt := ?Time.now();
        #ok("Payment request approved and recorded");
      };
    };
  };

  // Reject a payment request
  public func rejectPaymentRequest(
    paymentRequests : List.List<CustomerPaymentRequest>,
    requestId : Nat,
    approverPrincipal : Principal,
    reason : Text,
  ) : Result.Result<Text, Text> {
    switch (paymentRequests.find(func(r) { r.id == requestId })) {
      case null { #err("Payment request not found") };
      case (?req) {
        if (req.shopOwnerPrincipal != approverPrincipal) {
          return #err("Not authorized: only the shop owner can reject");
        };
        if (req.status != #pending) {
          return #err("Request is not in pending state");
        };
        req.status := #rejected;
        req.resolvedAt := ?Time.now();
        req.rejectionReason := ?reason;
        #ok("Payment request rejected");
      };
    };
  };
};
