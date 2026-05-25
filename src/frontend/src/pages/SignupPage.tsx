import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  UserPlus,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useState } from "react";

function getPasswordStrength(pw: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { label: "", color: "" },
    { label: "Weak", color: "oklch(0.58 0.22 10)" },
    { label: "Fair", color: "oklch(0.72 0.18 55)" },
    { label: "Good", color: "oklch(0.72 0.18 195)" },
    { label: "Strong", color: "oklch(0.65 0.2 155)" },
  ];
  return { score, ...map[score] };
}

export default function SignupPage() {
  const { signup, isLoading: authLoading } = useAuth();
  const { language } = useAppContext();
  const navigate = useNavigate();
  const isHindi = language === "hi";

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const strength = getPasswordStrength(password);

  const errors = {
    displayName:
      touched.displayName && !displayName.trim()
        ? isHindi
          ? "नाम आवश्यक है"
          : "Name is required"
        : "",
    email:
      touched.email && !/^[^@]+@[^@]+\.[^@]+$/.test(email)
        ? isHindi
          ? "वैध ईमेल दर्ज करें"
          : "Enter a valid email"
        : "",
    password:
      touched.password && password.length < 8
        ? isHindi
          ? "पासवर्ड कम से कम 8 अक्षर का होना चाहिए"
          : "Password must be at least 8 characters"
        : "",
    confirm:
      touched.confirm && confirm !== password
        ? isHindi
          ? "पासवर्ड मेल नहीं खाते"
          : "Passwords do not match"
        : "",
    agreed:
      touched.agreed && !agreed
        ? isHindi
          ? "शर्तें स्वीकार करें"
          : "Please accept the terms"
        : "",
  };

  const blur = useCallback((field: string) => {
    setTouched((t) => ({ ...t, [field]: true }));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({
      displayName: true,
      email: true,
      password: true,
      confirm: true,
      agreed: true,
    });
    if (
      errors.displayName ||
      errors.email ||
      errors.password ||
      errors.confirm ||
      !agreed
    )
      return;
    setSubmitting(true);
    setServerError("");
    const err = await signup(displayName.trim(), email.trim(), password);
    setSubmitting(false);
    if (err) {
      setServerError(err);
    } else {
      navigate({ to: "/verify-email" });
    }
  }

  const isWorking = submitting || authLoading;

  return (
    <div className="auth-page-bg relative flex min-h-screen w-full max-w-full overflow-x-hidden">
      {/* Ambient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="auth-glow-orb-1 absolute -top-20 left-0 h-96 w-96 rounded-full opacity-25 blur-3xl" />
        <div className="auth-glow-orb-2 absolute bottom-0 right-0 h-64 w-64 rounded-full opacity-20 blur-3xl" />
      </div>

      {/* Hero panel — desktop */}
      <div className="hidden lg:flex flex-1 flex-col justify-center items-center px-12 py-16 max-w-lg">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/assets/generated/auth-hero-network.dim_600x700.png"
            alt="Credit Bridge Network"
            className="w-full max-w-sm mx-auto object-contain"
          />
          <div className="mt-6 text-center">
            <h2
              className="font-display text-3xl font-extrabold"
              style={{ color: "oklch(0.15 0.03 245)" }}
            >
              {isHindi ? "जुड़ें Credit Bridge से" : "Join Credit Bridge"}
            </h2>
            <p
              className="mt-2 text-sm"
              style={{ color: "oklch(0.42 0.04 245)" }}
            >
              {isHindi
                ? "हजारों व्यापारी पहले से भरोसा करते हैं"
                : "Thousands of businesses already trust us"}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 items-center justify-center px-4 py-8 lg:py-12 lg:pr-12">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card w-full max-w-sm px-6 sm:px-8 py-8 shadow-xl"
          data-ocid="signup.card"
        >
          {/* Logo */}
          <div className="mb-6 flex flex-col items-center text-center">
            <div
              className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.18 195), oklch(0.60 0.22 200))",
                boxShadow: "0 0 28px oklch(0.72 0.18 195 / 0.4)",
              }}
            >
              <UserPlus size={22} className="text-white" />
            </div>
            <h1 className="font-display text-xl font-bold text-foreground">
              {isHindi ? "खाता बनाएं" : "Create Account"}
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              {isHindi
                ? "अपना व्यापार शुरू करें"
                : "Start managing your business today"}
            </p>
          </div>

          {serverError && (
            <div
              data-ocid="signup.error_state"
              className="mb-4 flex items-start gap-2 rounded-xl px-3 py-2.5 text-sm"
              style={{
                background: "oklch(0.95 0.04 10 / 0.5)",
                color: "oklch(0.45 0.22 10)",
              }}
            >
              <AlertCircle size={15} className="mt-0.5 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
            {/* Display Name */}
            <div>
              <label
                htmlFor="signup-name"
                className="mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wide"
              >
                {isHindi ? "पूरा नाम" : "Full Name"}
              </label>
              <input
                id="signup-name"
                type="text"
                placeholder={isHindi ? "आपका नाम" : "Your name"}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                onBlur={() => blur("displayName")}
                data-ocid="signup.name_input"
                className="auth-input w-full"
                autoComplete="name"
              />
              {errors.displayName && (
                <p
                  data-ocid="signup.name_field_error"
                  className="mt-1 flex items-center gap-1 text-xs"
                  style={{ color: "oklch(0.55 0.22 10)" }}
                >
                  <AlertCircle size={11} /> {errors.displayName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="signup-email"
                className="mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wide"
              >
                {isHindi ? "ईमेल" : "Email"}
              </label>
              <input
                id="signup-email"
                type="email"
                placeholder="name@business.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => blur("email")}
                data-ocid="signup.email_input"
                className="auth-input w-full"
                autoComplete="email"
              />
              {errors.email && (
                <p
                  data-ocid="signup.email_field_error"
                  className="mt-1 flex items-center gap-1 text-xs"
                  style={{ color: "oklch(0.55 0.22 10)" }}
                >
                  <AlertCircle size={11} /> {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="signup-password"
                className="mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wide"
              >
                {isHindi ? "पासवर्ड" : "Password"}
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPw ? "text" : "password"}
                  placeholder={isHindi ? "मजबूत पासवर्ड" : "Strong password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => blur("password")}
                  data-ocid="signup.password_input"
                  className="auth-input w-full pr-10"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {/* Strength indicator */}
              {password.length > 0 && (
                <div className="mt-1.5">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{
                          background:
                            n <= strength.score
                              ? strength.color
                              : "oklch(0.88 0.04 195 / 0.5)",
                        }}
                      />
                    ))}
                  </div>
                  {strength.label && (
                    <p
                      className="mt-0.5 text-xs font-medium"
                      style={{ color: strength.color }}
                    >
                      {strength.label}
                    </p>
                  )}
                </div>
              )}
              {errors.password && (
                <p
                  data-ocid="signup.password_field_error"
                  className="mt-1 flex items-center gap-1 text-xs"
                  style={{ color: "oklch(0.55 0.22 10)" }}
                >
                  <AlertCircle size={11} /> {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="signup-confirm"
                className="mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wide"
              >
                {isHindi ? "पासवर्ड दोहराएं" : "Confirm Password"}
              </label>
              <div className="relative">
                <input
                  id="signup-confirm"
                  type={showConfirm ? "text" : "password"}
                  placeholder={isHindi ? "पासवर्ड दोहराएं" : "Repeat password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  onBlur={() => blur("confirm")}
                  data-ocid="signup.confirm_input"
                  className="auth-input w-full pr-10"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {confirm.length > 0 && confirm === password && (
                <p
                  className="mt-1 flex items-center gap-1 text-xs"
                  style={{ color: "oklch(0.55 0.2 155)" }}
                >
                  <CheckCircle2 size={11} />{" "}
                  {isHindi ? "मेल खाता है" : "Passwords match"}
                </p>
              )}
              {errors.confirm && (
                <p
                  data-ocid="signup.confirm_field_error"
                  className="mt-1 flex items-center gap-1 text-xs"
                  style={{ color: "oklch(0.55 0.22 10)" }}
                >
                  <AlertCircle size={11} /> {errors.confirm}
                </p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => {
                    setAgreed(e.target.checked);
                    setTouched((t) => ({ ...t, agreed: true }));
                  }}
                  data-ocid="signup.terms_checkbox"
                  className="mt-0.5 h-4 w-4 rounded accent-primary"
                />
                <span className="text-xs text-muted-foreground">
                  {isHindi ? "मैं " : "I agree to the "}
                  <span
                    className="font-medium"
                    style={{ color: "oklch(0.60 0.2 195)" }}
                  >
                    {isHindi ? "सेवा शर्तें" : "Terms of Service"}
                  </span>
                  {isHindi ? " स्वीकार करता/करती हूं" : " and "}
                  {!isHindi && (
                    <span
                      className="font-medium"
                      style={{ color: "oklch(0.60 0.2 195)" }}
                    >
                      Privacy Policy
                    </span>
                  )}
                </span>
              </label>
              {errors.agreed && (
                <p
                  data-ocid="signup.terms_field_error"
                  className="mt-1 flex items-center gap-1 text-xs"
                  style={{ color: "oklch(0.55 0.22 10)" }}
                >
                  <AlertCircle size={11} /> {errors.agreed}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isWorking}
              data-ocid="signup.submit_button"
              className="auth-button w-full mt-1 flex items-center justify-center gap-2"
            >
              {isWorking ? (
                <>
                  <Loader2 size={16} className="animate-spin" />{" "}
                  {isHindi ? "बना रहे हैं..." : "Creating account..."}
                </>
              ) : isHindi ? (
                "खाता बनाएं"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            {isHindi ? "पहले से खाता है?" : "Already have an account?"}{" "}
            <Link to="/" className="auth-link" data-ocid="signup.login_link">
              {isHindi ? "साइन इन करें" : "Sign In"}
            </Link>
          </p>

          <p className="mt-4 text-center text-[10px] text-muted-foreground">
            Powered by{" "}
            <span
              className="font-semibold"
              style={{ color: "oklch(0.60 0.2 195)" }}
            >
              FiFO BRIDGE
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
