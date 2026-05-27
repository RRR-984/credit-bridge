
module {
  /// Stored user record (password hash kept opaque as Blob).
  public type User = {
    id          : Principal;           // identity anchor
    email       : Text;
    var passwordHash : Blob;           // bcrypt / SHA-256 hash, never exposed
    var displayName  : Text;
    var isVerified   : Bool;           // email verified
    var isActive     : Bool;           // not blocked
    createdAt   : Int;
  };

  /// Active login session
  public type Session = {
    token     : Text;
    userId    : Principal;
    expiresAt : Int;
  };

  /// Password-reset one-time token
  public type ResetToken = {
    token     : Text;
    userId    : Principal;
    expiresAt : Int;
  };

  /// Email-verification one-time token
  public type VerificationToken = {
    token     : Text;
    userId    : Principal;
    email     : Text;
    expiresAt : Int;
  };

  // ── API argument / result types (all shared) ─────────────────────────────

  public type SignupArgs = {
    email       : Text;
    password    : Text;
    displayName : Text;
  };

  public type LoginArgs = {
    email    : Text;
    password : Text;
  };

  public type AuthResult = {
    #ok  : { token : Text; user : UserView };
    #err : Text;
  };

  /// Safe public projection of User (no password hash)
  public type UserView = {
    id          : Principal;
    email       : Text;
    displayName : Text;
    isVerified  : Bool;
  };

  // ── Mutable container state shared with lib / mixins ────────────────────

  public type AuthState = {
    var nextUserId : Nat;          // monotonic counter used for user id generation
  };

  public func newAuthState() : AuthState {
    { var nextUserId = 0 };
  };
};
