import Debug "mo:core/Debug";
import List "mo:core/List";
import AuthTypes "../types/auth";
import AuthLib "../lib/auth";

/// Public auth API mixin.
/// Receives the three auth state slices it needs as mixin parameters.
mixin (
  users       : List.List<AuthTypes.User>,
  sessions    : List.List<AuthTypes.Session>,
  resetTokens : List.List<AuthTypes.ResetToken>,
  authState   : AuthTypes.AuthState,
) {

  /// Create a new account. Sends a verification email on success.
  public shared func signup(args : AuthTypes.SignupArgs) : async AuthTypes.AuthResult {
    ignore (args, users, sessions, resetTokens, authState);
    Debug.todo();
  };

  /// Authenticate with email + password. Returns a bearer token on success.
  public shared func login(args : AuthTypes.LoginArgs) : async AuthTypes.AuthResult {
    ignore (args, users, sessions);
    Debug.todo();
  };

  /// Invalidate the caller's session token.
  public shared func logout(token : Text) : async Bool {
    ignore (token, sessions);
    Debug.todo();
  };

  /// Verify the caller's email address with the one-time token from the email link.
  public shared func verifyEmail(verificationToken : Text) : async Bool {
    ignore (verificationToken, users);
    Debug.todo();
  };

  /// Initiate a password-reset flow for the given email address.
  public shared func forgotPassword(email : Text) : async Bool {
    ignore (email, users, resetTokens);
    Debug.todo();
  };

  /// Apply a new password using the one-time reset token.
  public shared func resetPassword(token : Text, newPassword : Text) : async Bool {
    ignore (token, newPassword, users, resetTokens);
    Debug.todo();
  };

  /// Return the current user's public profile (requires a valid session token).
  public shared query func getMe(token : Text) : async ?AuthTypes.UserView {
    ignore (token, users, sessions);
    Debug.todo();
  };
};
