import Debug "mo:core/Debug";
import List "mo:core/List";
import AuthTypes "../types/auth";

module {
  /// Register a new user. Returns AuthResult.
  public func signup(
    args     : AuthTypes.SignupArgs,
    users    : List.List<AuthTypes.User>,
    sessions : List.List<AuthTypes.Session>,
    state    : AuthTypes.AuthState,
  ) : AuthTypes.AuthResult {
    ignore (args, users, sessions, state);
    Debug.todo();
  };

  /// Authenticate with email + password. Returns AuthResult with session token.
  public func login(
    args     : AuthTypes.LoginArgs,
    users    : List.List<AuthTypes.User>,
    sessions : List.List<AuthTypes.Session>,
  ) : AuthTypes.AuthResult {
    ignore (args, users, sessions);
    Debug.todo();
  };

  /// Invalidate an active session token.
  public func logout(
    token    : Text,
    sessions : List.List<AuthTypes.Session>,
  ) : Bool {
    ignore (token, sessions);
    Debug.todo();
  };

  /// Mark the user's email as verified given a verification token.
  public func verifyEmail(
    verificationToken : Text,
    users             : List.List<AuthTypes.User>,
  ) : Bool {
    ignore (verificationToken, users);
    Debug.todo();
  };

  /// Initiate forgot-password flow: generate reset token and send email.
  public func forgotPassword(
    email        : Text,
    users        : List.List<AuthTypes.User>,
    resetTokens  : List.List<AuthTypes.ResetToken>,
  ) : Bool {
    ignore (email, users, resetTokens);
    Debug.todo();
  };

  /// Apply a password reset using a one-time token.
  public func resetPassword(
    token       : Text,
    newPassword : Text,
    users       : List.List<AuthTypes.User>,
    resetTokens : List.List<AuthTypes.ResetToken>,
  ) : Bool {
    ignore (token, newPassword, users, resetTokens);
    Debug.todo();
  };

  /// Return the UserView for an authenticated caller, or null if not found.
  public func getMe(
    token    : Text,
    users    : List.List<AuthTypes.User>,
    sessions : List.List<AuthTypes.Session>,
  ) : ?AuthTypes.UserView {
    ignore (token, users, sessions);
    Debug.todo();
  };

  /// Guard helper: trap if the token is not a valid active session.
  public func requireAuth(
    token    : Text,
    sessions : List.List<AuthTypes.Session>,
  ) : AuthTypes.Session {
    ignore (token, sessions);
    Debug.todo();
  };
};
