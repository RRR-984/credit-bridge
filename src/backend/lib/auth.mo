import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Text "mo:core/Text";
import Blob "mo:core/Blob";
import Principal "mo:core/Principal";
import AuthTypes "../types/auth";
import Char "mo:core/Char";
import Nat32 "mo:core/Nat32";
import Nat8 "mo:core/Nat8";
import Runtime "mo:core/Runtime";

module {
  // ── Private helpers ────────────────────────────────────────────────────

  /// Simple deterministic password hash: fold chars with multiply-add, store as 8-byte Blob.
  func hashPassword(password : Text) : Blob {
    let salt : Nat = 0x5A4C5F2E;
    var h : Nat = salt;
    for (c in password.chars()) {
      h := (h * 31 + c.toNat32().toNat()) % 0xFFFFFFFF;
    };
    // Pack h into 4 bytes
    let b0 = Nat8.fromNat((h / 0x1000000) % 256);
    let b1 = Nat8.fromNat((h / 0x10000)   % 256);
    let b2 = Nat8.fromNat((h / 0x100)     % 256);
    let b3 = Nat8.fromNat(h               % 256);
    Blob.fromArray([b0, b1, b2, b3]);
  };

  /// Generate a short token from current time + seed string.
  func generateToken(seed : Text) : Text {
    let t = Time.now().toText();
    let combined = t # seed;
    // Take up to 32 chars
    let size = combined.size();
    if (size <= 32) { combined } else {
      var result = "";
      var i = 0;
      for (c in combined.chars()) {
        if (i < 32) { result := result # Text.fromChar(c) };
        i += 1;
      };
      result
    };
  };

  /// Build a UserView from a full User record.
  func toView(u : AuthTypes.User) : AuthTypes.UserView {
    { id = u.id; email = u.email; displayName = u.displayName; isVerified = u.isVerified };
  };

  /// Derive a stable Principal from a Nat index using blob encoding.
  func principalFromIndex(n : Nat) : Principal {
    let bytes : [Nat8] = [
      Nat8.fromNat(n % 256),
      Nat8.fromNat((n / 256) % 256),
      Nat8.fromNat((n / 65536) % 256),
      0x02,  // self-authenticating type byte
    ];
    Blob.fromArray(bytes).fromBlob();
  };

  // 30 days in nanoseconds
  let sessionTTL : Int = 2_592_000_000_000_000;
  // 1 hour in nanoseconds
  let resetTTL   : Int = 3_600_000_000_000;

  // ── Public functions ───────────────────────────────────────────────────

  /// Register a new user. Returns AuthResult.
  /// Register a new user. Returns AuthResult plus a fresh verification token.
  public func signup(
    args               : AuthTypes.SignupArgs,
    users              : List.List<AuthTypes.User>,
    sessions           : List.List<AuthTypes.Session>,
    verificationTokens : List.List<AuthTypes.VerificationToken>,
    state              : AuthTypes.AuthState,
  ) : { result : AuthTypes.AuthResult; verificationToken : Text } {
    // Check duplicate email
    let existing = users.find(func(u : AuthTypes.User) : Bool { u.email == args.email });
    switch (existing) {
      case (?_) { return { result = #err "Email already registered"; verificationToken = "" } };
      case null {};
    };
    // Create user
    let uid = state.nextUserId;
    state.nextUserId += 1;
    let user : AuthTypes.User = {
      id               = principalFromIndex(uid);
      email            = args.email;
      var passwordHash = hashPassword(args.password);
      var displayName  = args.displayName;
      var isVerified   = false;
      var isActive     = true;
      createdAt        = Time.now();
    };
    users.add(user);
    // Create session
    let token = generateToken(args.email);
    let session : AuthTypes.Session = {
      token     = token;
      userId    = user.id;
      expiresAt = Time.now() + sessionTTL;
    };
    sessions.add(session);
    // Create verification token (24 hours TTL)
    let vToken = generateToken("verify" # args.email # uid.toText());
    let vt : AuthTypes.VerificationToken = {
      token     = vToken;
      userId    = user.id;
      email     = args.email;
      expiresAt = Time.now() + 24 * 3600 * 1_000_000_000;
    };
    verificationTokens.add(vt);
    { result = #ok { token; user = toView(user) }; verificationToken = vToken };
  };

  /// Authenticate with email + password. Returns AuthResult with session token.
  public func login(
    args     : AuthTypes.LoginArgs,
    users    : List.List<AuthTypes.User>,
    sessions : List.List<AuthTypes.Session>,
  ) : AuthTypes.AuthResult {
    let found = users.find(func(u : AuthTypes.User) : Bool { u.email == args.email });
    switch (found) {
      case null { return #err "Invalid email or password" };
      case (?user) {
        if (user.passwordHash != hashPassword(args.password)) {
          return #err "Invalid email or password";
        };
        if (not user.isActive) {
          return #err "Account is blocked";
        };
        let token = generateToken(args.email # Time.now().toText());
        let session : AuthTypes.Session = {
          token     = token;
          userId    = user.id;
          expiresAt = Time.now() + sessionTTL;
        };
        sessions.add(session);
        #ok { token; user = toView(user) };
      };
    };
  };

  /// Invalidate an active session token.
  public func logout(
    token    : Text,
    sessions : List.List<AuthTypes.Session>,
  ) : Bool {
    let before = sessions.size();
    sessions.retain(func(s : AuthTypes.Session) : Bool { s.token != token });
    sessions.size() < before;
  };

  /// Mark the user's email as verified given a verification token.
  /// Mark the user's email as verified given a verification token.
  public func verifyEmail(
    verificationToken  : Text,
    users              : List.List<AuthTypes.User>,
    verificationTokens : List.List<AuthTypes.VerificationToken>,
  ) : Bool {
    let found = verificationTokens.find(func(vt : AuthTypes.VerificationToken) : Bool {
      vt.token == verificationToken
    });
    switch (found) {
      case null { false };
      case (?vt) {
        if (vt.expiresAt < Time.now()) { return false };
        // Mark user verified
        users.mapInPlace(func(u : AuthTypes.User) : AuthTypes.User {
          if (u.id == vt.userId) { u.isVerified := true };
          u
        });
        // Consume the token
        verificationTokens.retain(func(v : AuthTypes.VerificationToken) : Bool {
          v.token != verificationToken
        });
        true;
      };
    };
  };

  /// Initiate forgot-password flow
  /// Resend verification: generate a new token for an unverified user.
  /// Returns the new token text, or "" if user not found / already verified.
  public func resendVerification(
    email              : Text,
    users              : List.List<AuthTypes.User>,
    verificationTokens : List.List<AuthTypes.VerificationToken>,
  ) : Text {
    let found = users.find(func(u : AuthTypes.User) : Bool { u.email == email });
    switch (found) {
      case null { "" };
      case (?user) {
        if (user.isVerified) { return "" };
        // Remove any existing verification token for this user
        verificationTokens.retain(func(v : AuthTypes.VerificationToken) : Bool {
          v.userId != user.id
        });
        let vToken = generateToken("verify" # email # Time.now().toText());
        let vt : AuthTypes.VerificationToken = {
          token     = vToken;
          userId    = user.id;
          email     = email;
          expiresAt = Time.now() + 24 * 3600 * 1_000_000_000;
        };
        verificationTokens.add(vt);
        vToken;
      };
    };
  };

  /// Initiate forgot-password flow: generate reset token and store it.
  public func forgotPassword(
    email        : Text,
    users        : List.List<AuthTypes.User>,
    resetTokens  : List.List<AuthTypes.ResetToken>,
  ) : Bool {
    switch (users.find(func(u : AuthTypes.User) : Bool { u.email == email })) {
      case null {}; // Don't reveal whether email exists
      case (?user) {
        let token = generateToken("reset" # email);
        let rt : AuthTypes.ResetToken = {
          token     = token;
          userId    = user.id;
          expiresAt = Time.now() + resetTTL;
        };
        // Remove any existing reset token for this user
        resetTokens.retain(func(r : AuthTypes.ResetToken) : Bool { r.userId != user.id });
        resetTokens.add(rt);
      };
    };
    true; // Always return true to avoid email enumeration
  };

  /// Apply a password reset using a one-time token.
  public func resetPassword(
    token       : Text,
    newPassword : Text,
    users       : List.List<AuthTypes.User>,
    resetTokens : List.List<AuthTypes.ResetToken>,
  ) : Bool {
    let found = resetTokens.find(func(r : AuthTypes.ResetToken) : Bool { r.token == token });
    switch (found) {
      case null { return false };
      case (?rt) {
        if (rt.expiresAt < Time.now()) { return false };
        // Update password on the matching user
        var updated = false;
        users.mapInPlace(func(u : AuthTypes.User) : AuthTypes.User {
          if (u.id == rt.userId) {
            u.passwordHash := hashPassword(newPassword);
            updated := true;
          };
          u
        });
        // Consume the reset token
        resetTokens.retain(func(r : AuthTypes.ResetToken) : Bool { r.token != token });
        updated;
      };
    };
  };

  /// Return the UserView for an authenticated caller, or null if not found.
  public func getMe(
    token    : Text,
    users    : List.List<AuthTypes.User>,
    sessions : List.List<AuthTypes.Session>,
  ) : ?AuthTypes.UserView {
    let now = Time.now();
    let session = sessions.find(func(s : AuthTypes.Session) : Bool {
      s.token == token and s.expiresAt > now
    });
    switch (session) {
      case null { null };
      case (?s) {
        switch (users.find(func(u : AuthTypes.User) : Bool { u.id == s.userId })) {
          case null { null };
          case (?user) { ?toView(user) };
        };
      };
    };
  };

  /// Guard helper: trap if the token is not a valid active session.
  public func requireAuth(
    token    : Text,
    sessions : List.List<AuthTypes.Session>,
  ) : AuthTypes.Session {
    let now = Time.now();
    switch (sessions.find(func(s : AuthTypes.Session) : Bool {
      s.token == token and s.expiresAt > now
    })) {
      case (?s) { s };
      case null { Runtime.trap("Unauthorized") };
    };
  };
};
