import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { COUNTRIES, type CountryConfig } from "@/lib/countries";
import { Link, Navigate, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ChevronDown,
  Download,
  Eye,
  EyeOff,
  Loader2,
  Shield,
  Smartphone,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePWAInstall } from "../hooks/usePWAInstall";

const FEATURE_PILLS = [
  { icon: TrendingUp, label: "Credit Tracking" },
  { icon: Wallet, label: "Live Balances" },
  { icon: Shield, label: "Secure & Private" },
  { icon: Smartphone, label: "Mobile-First" },
];

export default function LoginPage() {
  const { login, isAuthenticated, isLoading: authInitializing } = useAuth();
  const { setCountry, selectedCountry, language } = useAppContext();
  const navigate = useNavigate();
  const { canInstall, isIOS, isInstalled, promptInstall } = usePWAInstall();
  const isHindi = language === "hi";

  const [selectedC, setSelectedC] = useState<CountryConfig>(selectedCountry);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = {
    email:
      touched.email && !/^[^@]+@[^@]+\.[^@]+$/.test(email)
        ? isHindi
          ? "वैध ईमेल दर्ज करें"
          : "Enter a valid email address"
        : "",
    password:
      touched.password && password.length < 1
        ? isHindi
          ? "पासवर्ड आवश्यक है"
          : "Password is required"
        : "",
  };

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  function handleCountrySelect(c: CountryConfig) {
    setSelectedC(c);
    setCountry(c);
    setDropdownOpen(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (errors.email || errors.password || !email || !password) return;
    setSubmitting(true);
    setServerError("");
    const err = await login(email.trim(), password);
    setSubmitting(false);
    if (err) {
      setServerError(err);
    } else {
      navigate({ to: "/dashboard" });
    }
  }

  const isWorking = submitting || authInitializing;

  return (
    <div
      className="relative flex min-h-screen w-full max-w-full flex-col overflow-x-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.96 0.025 210) 0%, oklch(0.99 0.008 200) 50%, oklch(0.96 0.022 185) 100%)",
      }}
    >
      {/* Ambient glow orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -top-20 left-0 h-[400px] w-[400px] rounded-full opacity-30 blur-3xl"
          style={{ background: "oklch(0.82 0.18 195)" }}
        />
        <div
          className="absolute -bottom-10 right-0 h-64 w-64 rounded-full opacity-25 blur-3xl"
          style={{ background: "oklch(0.78 0.14 185)" }}
        />
        <div
          className="absolute right-1/4 top-1/4 h-52 w-52 rounded-full opacity-15 blur-3xl"
          style={{ background: "oklch(0.88 0.1 200)" }}
        />
      </div>

      {/* Install App pill */}
      {(canInstall || isIOS) && !isInstalled && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onClick={promptInstall}
          data-ocid="login.install_app_button"
          className="absolute right-4 top-4 z-50 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white shadow-lg transition-transform hover:scale-105"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.18 195), oklch(0.58 0.22 200))",
          }}
        >
          <Download size={13} />
          Install App
        </motion.button>
      )}

      {/* Page grid */}
      <div className="relative z-10 flex flex-1 flex-col lg:flex-row items-center justify-center min-h-screen w-full px-4 sm:px-6">
        {/* Left hero panel */}
        <div className="hidden lg:flex flex-1 flex-col justify-center items-center px-12 py-16 max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <div className="mb-8 flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.18 195), oklch(0.60 0.22 200))",
                  boxShadow: "0 0 28px oklch(0.72 0.18 195 / 0.45)",
                }}
              >
                <span className="font-display text-xl font-bold text-white">
                  CB
                </span>
              </div>
              <div>
                <p
                  className="font-display text-xl font-bold"
                  style={{ color: "oklch(0.15 0.03 245)" }}
                >
                  Credit Bridge
                </p>
                <p
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "oklch(0.62 0.18 195)" }}
                >
                  Finance OS
                </p>
              </div>
            </div>
            <div className="relative mb-6">
              <img
                src="/assets/generated/auth-hero-network.dim_600x700.png"
                alt="Credit Bridge Network"
                className="w-full max-w-sm mx-auto object-contain"
              />
            </div>
            <h1
              className="font-display text-4xl font-extrabold leading-tight mb-4"
              style={{ color: "oklch(0.15 0.03 245)" }}
            >
              {isHindi ? "उधार प्रबंधन." : "Manage Credit."}
              <br />
              <span style={{ color: "oklch(0.60 0.2 195)" }}>
                {isHindi ? "तेजी से बढ़ें।" : "Grow Faster."}
              </span>
            </h1>
            <p
              className="text-base mb-8"
              style={{ color: "oklch(0.40 0.04 245)" }}
            >
              {isHindi
                ? "बढ़ते व्यापार के लिए स्मार्ट उधार प्रबंधन"
                : "Smart Credit Management for Growing Businesses"}
            </p>
            <div className="flex flex-wrap gap-2">
              {FEATURE_PILLS.map((pill) => (
                <span
                  key={pill.label}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                  style={{
                    background: "oklch(1.0 0 0 / 0.7)",
                    border: "1px solid oklch(0.82 0.08 195 / 0.6)",
                    color: "oklch(0.50 0.18 195)",
                  }}
                >
                  <pill.icon size={11} />
                  {pill.label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right login form */}
        <div className="flex w-full lg:w-auto items-center justify-center py-8 lg:py-12 lg:pr-12">
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card relative w-full max-w-sm px-6 sm:px-8 pb-8 pt-10 shadow-xl"
            data-ocid="login.card"
          >
            <div className="mb-8 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.18 195), oklch(0.60 0.22 200))",
                  boxShadow: "0 0 28px oklch(0.72 0.18 195 / 0.4)",
                }}
              >
                <span className="font-display text-2xl font-bold text-white">
                  CB
                </span>
              </motion.div>
              <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
                Credit Bridge
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {isHindi
                  ? "बढ़ते व्यापार के लिए स्मार्ट उधार प्रबंधन"
                  : "Smart Credit Management"}
              </p>
            </div>

            <h2 className="mb-6 text-center font-display text-lg font-semibold text-foreground">
              {isHindi ? "साइन इन करें" : "Sign In"}
            </h2>

            {serverError && (
              <div
                data-ocid="login.error_state"
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

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div ref={dropdownRef} className="relative">
                <p className="mb-1.5 block text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {isHindi ? "देश चुनें" : "Select Country"}
                </p>
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={dropdownOpen}
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex w-full items-center justify-between rounded-xl border border-border bg-secondary/60 px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  data-ocid="login.country_select"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-xl leading-none">
                      {selectedC.flag}
                    </span>
                    <span>{selectedC.name}</span>
                    <span className="text-muted-foreground">
                      {selectedC.dialCode}
                    </span>
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-muted-foreground transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.ul
                      aria-label={isHindi ? "देश चुनें" : "Select Country"}
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-border bg-card shadow-lg"
                    >
                      {COUNTRIES.map((c) => (
                        <li key={c.code}>
                          <button
                            type="button"
                            aria-current={
                              selectedC.code === c.code ? "true" : undefined
                            }
                            onClick={() => handleCountrySelect(c)}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-secondary"
                          >
                            <span className="text-lg">{c.flag}</span>
                            <span className="font-medium">{c.name}</span>
                            <span className="ml-auto text-xs text-muted-foreground">
                              {c.dialCode}
                            </span>
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label
                  htmlFor="login-email"
                  className="mb-1.5 block text-xs font-medium text-muted-foreground uppercase tracking-wide"
                >
                  {isHindi ? "ईमेल" : "Email"}
                </label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="name@business.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  data-ocid="login.email_input"
                  className="auth-input w-full"
                  autoComplete="email"
                />
                {errors.email && (
                  <p
                    data-ocid="login.email_field_error"
                    className="mt-1 flex items-center gap-1 text-xs"
                    style={{ color: "oklch(0.55 0.22 10)" }}
                  >
                    <AlertCircle size={11} /> {errors.email}
                  </p>
                )}
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label
                    htmlFor="login-password"
                    className="block text-xs font-medium text-muted-foreground uppercase tracking-wide"
                  >
                    {isHindi ? "पासवर्ड" : "Password"}
                  </label>
                  <Link
                    to="/forgot-password"
                    className="auth-link text-xs"
                    data-ocid="login.forgot_password_link"
                  >
                    {isHindi ? "पासवर्ड भूले?" : "Forgot Password?"}
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    placeholder={isHindi ? "अपना पासवर्ड" : "Your password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                    data-ocid="login.password_input"
                    className="auth-input w-full pr-10"
                    autoComplete="current-password"
                    id="login-password"
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
                {errors.password && (
                  <p
                    data-ocid="login.password_field_error"
                    className="mt-1 flex items-center gap-1 text-xs"
                    style={{ color: "oklch(0.55 0.22 10)" }}
                  >
                    <AlertCircle size={11} /> {errors.password}
                  </p>
                )}
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  data-ocid="login.remember_checkbox"
                  className="h-4 w-4 rounded accent-primary"
                />
                <span className="text-xs text-muted-foreground">
                  {isHindi ? "मुझे याद रखें" : "Remember me"}
                </span>
              </label>

              <button
                type="submit"
                disabled={isWorking}
                data-ocid="login.submit_button"
                className="auth-button w-full mt-2 flex items-center justify-center gap-2"
              >
                {isWorking ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />{" "}
                    {isHindi ? "साइन इन हो रहा है..." : "Signing in..."}
                  </>
                ) : isHindi ? (
                  "साइन इन करें"
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <p className="mt-5 text-center text-xs text-muted-foreground">
              {isHindi ? "खाता नहीं है?" : "Don't have an account?"}{" "}
              <Link
                to="/signup"
                className="auth-link"
                data-ocid="login.signup_link"
              >
                {isHindi ? "खाता बनाएं" : "Sign Up"}
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
    </div>
  );
}
