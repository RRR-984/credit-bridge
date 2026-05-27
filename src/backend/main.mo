import List "mo:core/List";
import CustomerTypes "types/customer";
import UdharTypes "types/udhar";
import JamaTypes "types/jama";
import AdminTypes "types/admin";
import CustomerApi "mixins/customer-api";
import UdharApi "mixins/udhar-api";
import JamaApi "mixins/jama-api";
import DashboardApi "mixins/dashboard-api";
import ProfileLib "lib/profile";
import ProfileApi "mixins/profile-api";
import AdminApi "mixins/admin-api";
import CPTypes "types/customer-payment";
import CustomerPaymentApi "mixins/customer-payment-api";
import AuthTypes "types/auth";
import AuthApi "mixins/auth-api";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import AccessControl "mo:caffeineai-authorization/access-control";







actor {
  // --- Stable state ---
  let customers = List.empty<CustomerTypes.Customer>();
  let udharList = List.empty<UdharTypes.Udhar>();
  let jamaList  = List.empty<JamaTypes.Jama>();
  let state = {
    var nextCustomerId : Nat = 0;
    var nextUdharId    : Nat = 0;
    var nextJamaId     : Nat = 0;
  };
  let profileState = ProfileLib.newState();
  let adminState = AdminTypes.newState();
  let paymentRequests = List.empty<CPTypes.CustomerPaymentRequest>();
  let customerLinks = List.empty<CPTypes.CustomerLinkRecord>();
  let paymentState = CPTypes.newState();
  // Auth state
  let authUsers              = List.empty<AuthTypes.User>();
  let authSessions           = List.empty<AuthTypes.Session>();
  let authResetTokens        = List.empty<AuthTypes.ResetToken>();
  let authVerificationTokens = List.empty<AuthTypes.VerificationToken>();
  let authState              = AuthTypes.newAuthState();
  let accessControlState = AccessControl.initState();

  // --- Mixin composition ---
  include CustomerApi(customers, udharList, jamaList, state);
  include UdharApi(customers, udharList, jamaList, state);
  include JamaApi(customers, udharList, jamaList, state);
  include DashboardApi(customers, udharList, jamaList);
  include ProfileApi(profileState);
  include AdminApi(adminState, customers, udharList, jamaList);
  include CustomerPaymentApi(customers, udharList, jamaList, paymentRequests, customerLinks, state, paymentState);
  include AuthApi(authUsers, authSessions, authResetTokens, authVerificationTokens, authState);
  include MixinAuthorization(accessControlState);
};

