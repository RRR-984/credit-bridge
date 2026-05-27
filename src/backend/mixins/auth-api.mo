import List "mo:core/List";
import AuthTypes "../types/auth";
import AuthLib "../lib/auth";
import EmailClient "mo:caffeineai-email/emailClient";

/// Public auth API mixin.
/// Receives the four auth state slices it needs as mixin parameters.
mixin (
  users              : List.List<AuthTypes.User>,
  sessions           : List.List<AuthTypes.Session>,
  resetTokens        : List.List<AuthTypes.ResetToken>,
  verificationTokens : List.List<AuthTypes.VerificationToken>,
  authState          : AuthTypes.AuthState,
) {

  /// Create a new account. Sends a verification email and returns a session token.
  public shared func signup(args : AuthTypes.SignupArgs) : async AuthTypes.AuthResult {
    let out = AuthLib.signup(args, users, sessions, verificationTokens, authState);
    switch (out.result) {
      case (#ok _) {
        if (out.verificationToken != "") {
          let verifyUrl = "https://www.fifobridgeapp.com/verify-email?token=" # out.verificationToken;
          let htmlBody = buildVerifyEmailHtml(verifyUrl);
          let sendResult = await EmailClient.sendServiceEmail(
            "noreply",
            [args.email],
            "Verify Your Credit Bridge Email",
            htmlBody,
          );
          // User is registered regardless of email send result;
          // email delivery failure does not block account creation.
          switch (sendResult) {
            case (#ok _) {};
            case (#err e) { ignore e };
          };
        };
      };
      case (#err _) {};
    };
    out.result;
  };

  /// Authenticate with email + password. Returns a bearer token on success.
  public shared func login(args : AuthTypes.LoginArgs) : async AuthTypes.AuthResult {
    AuthLib.login(args, users, sessions);
  };

  /// Invalidate the caller's session token.
  public shared func logout(token : Text) : async Bool {
    AuthLib.logout(token, sessions);
  };

  /// Verify the caller's email address with the one-time token from the email link.
  public shared func verifyEmail(verificationToken : Text) : async Bool {
    AuthLib.verifyEmail(verificationToken, users, verificationTokens);
  };

  /// Resend verification email.
  public shared func resendVerificationEmail(email : Text) : async Bool {
    let token = AuthLib.resendVerification(email, users, verificationTokens);
    if (token == "") { return false };
    let verifyUrl = "https://www.fifobridgeapp.com/verify-email?token=" # token;
    let htmlBody = buildVerifyEmailHtml(verifyUrl);
    let sendResult = await EmailClient.sendServiceEmail(
      "noreply",
      [email],
      "Verify Your Credit Bridge Email",
      htmlBody,
    );
    switch (sendResult) {
      case (#ok _) { true };
      case (#err _) { false };
    };
  };

  /// Initiate a password-reset flow for the given email address.
  public shared func forgotPassword(email : Text) : async Bool {
    let ok = AuthLib.forgotPassword(email, users, resetTokens);
    if (ok) {
      // Get the reset token for this user and send email
      switch (users.find(func(u : AuthTypes.User) : Bool { u.email == email })) {
        case null {};
        case (?user) {
          switch (resetTokens.find(func(r : AuthTypes.ResetToken) : Bool { r.userId == user.id })) {
            case null {};
            case (?rt) {
              ignore await EmailClient.sendServiceEmail(
                "noreply",
                [email],
                "Reset your Credit Bridge password",
                "You requested a password reset.\n\nReset token: " # rt.token # "\n\nThis link expires in 1 hour.",
              );
            };
          };
        };
      };
    };
    true;
  };

  /// Apply a new password using the one-time reset token.
  public shared func resetPassword(token : Text, newPassword : Text) : async Bool {
    AuthLib.resetPassword(token, newPassword, users, resetTokens);
  };

  /// Return the current user's public profile (requires a valid session token).
  public shared query func getMe(token : Text) : async ?AuthTypes.UserView {
    AuthLib.getMe(token, users, sessions);
  };

  /// Build the HTML body for the verification email.
  func buildVerifyEmailHtml(verifyUrl : Text) : Text {
    "<!DOCTYPE html><html><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width,initial-scale=1'></head>" #
    "<body style='margin:0;padding:0;background:#f0fdfa;font-family:Arial,sans-serif;'>" #
    "<table width='100%' cellpadding='0' cellspacing='0' style='background:#f0fdfa;padding:40px 20px;'>" #
    "<tr><td align='center'>" #
    "<table width='600' cellpadding='0' cellspacing='0' style='max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(20,184,166,0.10);'>" #
    "<tr><td style='background:linear-gradient(135deg,#0d9488,#14b8a6);padding:36px 40px 28px;text-align:center;'>" #
    "<div style='font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;'>Credit Bridge</div>" #
    "<div style='font-size:13px;color:#ccfbf1;margin-top:4px;letter-spacing:1px;'>SECURE CREDIT MANAGEMENT</div>" #
    "</td></tr>" #
    "<tr><td style='padding:40px 40px 32px;'>" #
    "<p style='font-size:16px;color:#1e293b;line-height:1.6;margin:0 0 24px;'>Hello! Please verify your email address to activate your Credit Bridge account.</p>" #
    "<div style='text-align:center;margin:32px 0;'>" #
    "<a href='" # verifyUrl # "' style='display:inline-block;background:#14b8a6;color:#ffffff;text-decoration:none;font-size:16px;font-weight:700;padding:16px 40px;border-radius:8px;letter-spacing:0.5px;'>Verify Email Address</a>" #
    "</div>" #
    "<p style='font-size:13px;color:#64748b;line-height:1.6;margin:24px 0 8px;'>Or copy this link:</p>" #
    "<p style='font-size:12px;color:#0d9488;word-break:break-all;margin:0 0 24px;'>" # verifyUrl # "</p>" #
    "<p style='font-size:13px;color:#64748b;margin:0 0 8px;'><strong>This link expires in 24 hours.</strong></p>" #
    "<hr style='border:none;border-top:1px solid #f0fdfa;margin:24px 0;'>" #
    "<p style='font-size:12px;color:#94a3b8;margin:0;'>If you didn&#39;t create a Credit Bridge account, you can safely ignore this email.</p>" #
    "</td></tr>" #
    "<tr><td style='background:#f8fafc;padding:20px 40px;text-align:center;'>" #
    "<p style='font-size:12px;color:#94a3b8;margin:0;'>Powered by FiFO BRIDGE</p>" #
    "</td></tr></table></td></tr></table></body></html>";
  };
};
