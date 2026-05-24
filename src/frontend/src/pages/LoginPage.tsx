import { useAppContext } from "@/context/AppContext";
import { COUNTRIES, type CountryConfig } from "@/lib/countries";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Navigate } from "@tanstack/react-router";
import {
  ChevronDown,
  CreditCard,
  Download,
  Lock,
  Phone,
  Shield,
  Smartphone,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePWAInstall } from "../hooks/usePWAInstall";

const OTP_KEYS = ["p0", "p1", "p2", "p3", "p4", "p5"] as const;

const FEATURE_PILLS = [
  { icon: TrendingUp, label: "Credit Tracking" },
  { icon: Wallet, label: "Live Balances" },
  { icon: Shield, label: "Secure & Private" },
  { icon: Smartphone, label: "Mobile-First" },
];

export default function LoginPage() {
  const { login, loginStatus } = useInternetIdentity();
  const { setCountry, selectedCountry, t } = useAppContext();
  const { canInstall, isIOS, isInstalled, promptInstall } = usePWAInstall();

  const [selectedC, setSelectedC] = useState<CountryConfig>(selectedCountry);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobile, setMobile] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
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

  if (loginStatus === "success") {
    return <Navigate to="/dashboard" />;
  }

  function handleCountrySelect(c: CountryConfig) {
    setSelectedC(c);
    setCountry(c);
    setDropdownOpen(false);
  }

  function handleOtpChange(idx: number, val: string) {
    if (!/^[0-9]?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
  }

  function handleOtpKeyDown(
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  }

  function handleContinue() {
    if (!showOtp) {
      setShowOtp(true);
      setTimeout(() => otpRefs.current[0]?.focus(), 150);
    } else {
      // OTP submitted — trigger actual Internet Identity auth
      login();
    }
  }

  const isLoading = loginStatus === "logging-in";

  return (
    <div
      className="relative flex min-h-screen w-full max-w-full flex-col overflow-x-hidden overflow-y-auto"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.96 0.025 210) 0%, oklch(0.99 0.008 200) 50%, oklch(0.96 0.022 185) 100%)",
      }}
    >
      {/* Ambient glow orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -top-20 left-0 h-[300px] w-[300px] rounded-full opacity-30 blur-3xl sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]"
          style={{ background: "oklch(0.82 0.18 195)" }}
        />
        <div
          className="absolute -bottom-10 right-0 h-48 w-48 rounded-full opacity-25 blur-3xl sm:h-64 sm:w-64 lg:h-80 lg:w-80"
          style={{ background: "oklch(0.78 0.14 185)" }}
        />
        <div
          className="absolute right-1/4 top-1/4 h-40 w-40 rounded-full opacity-15 blur-3xl sm:h-52 sm:w-52 lg:h-64 lg:w-64"
          style={{ background: "oklch(0.88 0.1 200)" }}
        />
      </div>

      {/* Install App pill */}
      {(canInstall || isIOS) && !isInstalled && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.35 }}
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

      {/* Hero banner */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center gap-0 min-h-screen w-full max-w-full overflow-x-hidden px-4 sm:px-6">
        {/* Left hero panel */}
        <div className="hidden lg:flex flex-1 flex-col justify-center px-16 py-12 max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Logo mark */}
            <div className="mb-8 flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.18 195), oklch(0.60 0.22 200))",
                  boxShadow:
                    "0 0 28px oklch(0.72 0.18 195 / 0.45), 0 4px 14px oklch(0.72 0.18 195 / 0.25)",
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

            <h1
              className="font-display text-4xl font-extrabold leading-tight mb-4"
              style={{
                color: "oklch(0.15 0.03 245)",
              }}
            >
              Manage Credit.
              <br />
              <span style={{ color: "oklch(0.60 0.2 195)" }}>Grow Faster.</span>
            </h1>
            <p
              className="text-base mb-8"
              style={{ color: "oklch(0.40 0.04 245)" }}
            >
              {t("smartCreditMgmt")}
            </p>

            {/* Floating metric cards */}
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex items-center gap-4 rounded-2xl px-5 py-4"
                style={{
                  background: "oklch(1.0 0 0 / 0.85)",
                  border: "1px solid oklch(0.88 0.06 195 / 0.6)",
                  backdropFilter: "blur(12px)",
                  boxShadow:
                    "0 4px 20px oklch(0.72 0.15 195 / 0.1), 0 1px 4px oklch(0 0 0 / 0.05)",
                }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: "oklch(0.92 0.08 195 / 0.5)" }}
                >
                  <TrendingUp
                    size={18}
                    style={{ color: "oklch(0.60 0.20 195)" }}
                  />
                </div>
                <div>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.50 0.04 245)" }}
                  >
                    Total Credit Issued
                  </p>
                  <p
                    className="font-display text-lg font-bold"
                    style={{ color: "oklch(0.15 0.03 245)" }}
                  >
                    ₹ 2,45,000
                  </p>
                </div>
                <div
                  className="ml-auto text-xs font-semibold px-2 py-1 rounded-lg"
                  style={{
                    background: "oklch(0.92 0.1 155 / 0.3)",
                    color: "oklch(0.42 0.18 155)",
                  }}
                >
                  +12%
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="flex items-center gap-4 rounded-2xl px-5 py-4"
                style={{
                  background: "oklch(1.0 0 0 / 0.85)",
                  border: "1px solid oklch(0.88 0.06 195 / 0.6)",
                  backdropFilter: "blur(12px)",
                  boxShadow:
                    "0 4px 20px oklch(0.72 0.15 195 / 0.1), 0 1px 4px oklch(0 0 0 / 0.05)",
                }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: "oklch(0.92 0.08 195 / 0.5)" }}
                >
                  <Wallet size={18} style={{ color: "oklch(0.60 0.20 195)" }} />
                </div>
                <div>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.50 0.04 245)" }}
                  >
                    Collected This Month
                  </p>
                  <p
                    className="font-display text-lg font-bold"
                    style={{ color: "oklch(0.15 0.03 245)" }}
                  >
                    ₹ 1,82,000
                  </p>
                </div>
                <div
                  className="ml-auto text-xs font-semibold px-2 py-1 rounded-lg"
                  style={{
                    background: "oklch(0.90 0.08 195 / 0.4)",
                    color: "oklch(0.45 0.18 195)",
                  }}
                >
                  On track
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex items-center gap-4 rounded-2xl px-5 py-4"
                style={{
                  background: "oklch(1.0 0 0 / 0.85)",
                  border: "1px solid oklch(0.88 0.06 195 / 0.6)",
                  backdropFilter: "blur(12px)",
                  boxShadow:
                    "0 4px 20px oklch(0.72 0.15 195 / 0.1), 0 1px 4px oklch(0 0 0 / 0.05)",
                }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: "oklch(0.92 0.08 195 / 0.5)" }}
                >
                  <Shield size={18} style={{ color: "oklch(0.60 0.20 195)" }} />
                </div>
                <div>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.50 0.04 245)" }}
                  >
                    Data Security
                  </p>
                  <p
                    className="font-display text-base font-bold"
                    style={{ color: "oklch(0.15 0.03 245)" }}
                  >
                    Blockchain Secured
                  </p>
                </div>
                <div
                  className="ml-auto text-xs font-semibold px-2 py-1 rounded-lg"
                  style={{
                    background: "oklch(0.90 0.08 195 / 0.4)",
                    color: "oklch(0.45 0.18 195)",
                  }}
                >
                  ✓ Safe
                </div>
              </motion.div>
            </div>

            {/* Feature pills row */}
            <div className="mt-8 flex flex-wrap gap-2">
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

        {/* Right login panel */}
        <div className="flex w-full lg:w-auto items-center justify-center py-8 lg:py-12 lg:pr-16">
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card relative w-full max-w-sm px-6 sm:px-8 pb-8 pt-10 shadow-xl"
            data-ocid="login.card"
          >
            {/* Brand */}
            <div className="mb-8 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.18 195), oklch(0.60 0.22 200))",
                  boxShadow:
                    "0 0 28px oklch(0.72 0.18 195 / 0.4), 0 4px 14px oklch(0.72 0.18 195 / 0.2)",
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
                {t("smartCreditMgmt")}
              </p>
            </div>

            {/* Headline */}
            <h2 className="mb-6 text-center font-display text-lg font-semibold text-foreground">
              {t("secureBusinessLogin")}
            </h2>

            {/* Country selector */}
            <div className="mb-4" ref={dropdownRef}>
              <p className="mb-1.5 block text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {t("selectCountry")}
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
                  <span className="text-xl leading-none">{selectedC.flag}</span>
                  <span>{selectedC.name}</span>
                  <span className="text-muted-foreground">
                    {selectedC.dialCode}
                  </span>
                </span>
                <ChevronDown
                  size={16}
                  className={`text-muted-foreground transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="glass-md absolute z-50 mt-1.5 w-full max-w-sm overflow-hidden rounded-xl border border-border shadow-xl"
                    data-ocid="login.country_dropdown"
                  >
                    {COUNTRIES.map((c) => (
                      <button
                        type="button"
                        key={c.code}
                        onClick={() => handleCountrySelect(c)}
                        className={`flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-primary/10 ${
                          c.code === selectedC.code
                            ? "bg-primary/15 font-semibold text-primary"
                            : "text-foreground"
                        }`}
                        data-ocid={`login.country_option.${c.code.toLowerCase()}`}
                      >
                        <span className="text-xl leading-none">{c.flag}</span>
                        <span className="flex-1 text-left">{c.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {c.dialCode}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {c.currency.code}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile number input */}
            <div className="mb-5">
              <label
                htmlFor="mobile-input"
                className="mb-1.5 block text-xs font-medium text-muted-foreground uppercase tracking-wide"
              >
                {t("mobileNumberLabel")}
              </label>
              <div className="flex overflow-hidden rounded-xl border border-border bg-secondary/60 transition-all focus-within:border-primary/60 focus-within:ring-1 focus-within:ring-primary/30">
                <span className="flex items-center gap-1.5 border-r border-border bg-secondary/80 px-3 py-3 text-sm font-semibold text-foreground">
                  <Phone size={14} className="text-primary" />
                  <span>{selectedC.dialCode}</span>
                </span>
                <input
                  id="mobile-input"
                  type="tel"
                  inputMode="numeric"
                  placeholder={t("enterMobileNumber")}
                  value={mobile}
                  onChange={(e) =>
                    setMobile(e.target.value.replace(/\D/g, "").slice(0, 12))
                  }
                  className="flex-1 bg-transparent px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  data-ocid="login.mobile_input"
                />
              </div>
            </div>

            {/* OTP section */}
            <AnimatePresence>
              {showOtp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-5 overflow-hidden"
                >
                  <p className="mb-3 block text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {t("enterOtp")}
                  </p>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {OTP_KEYS.map((key, idx) => (
                      <input
                        key={key}
                        ref={(el) => {
                          otpRefs.current[idx] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={otp[idx]}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl border border-border bg-secondary/60 text-center text-lg font-bold text-foreground transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                        data-ocid={`login.otp_input.${idx + 1}`}
                      />
                    ))}
                  </div>
                  <p className="mt-2.5 text-center text-xs text-muted-foreground">
                    {t("otpSentTo")} {selectedC.dialCode} {mobile}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA button */}
            <button
              type="button"
              onClick={handleContinue}
              disabled={isLoading || mobile.length < 7}
              className="glow-blue mb-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.18 195), oklch(0.58 0.22 200))",
              }}
              data-ocid="login.primary_button"
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : showOtp ? (
                <>
                  <Lock size={15} /> {t("verifyAndLogin")}
                </>
              ) : (
                <>
                  <Phone size={15} /> {t("continueWithMobile")}
                </>
              )}
            </button>

            {/* OTP resend / alternate login hint */}
            {showOtp && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-3 text-center text-xs text-muted-foreground"
              >
                {t("didntReceiveOtp")}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setShowOtp(false);
                    setOtp(["", "", "", "", "", ""]);
                  }}
                  className="text-primary hover:underline focus:outline-none"
                  data-ocid="login.resend_otp_button"
                >
                  {t("resend")}
                </button>
              </motion.p>
            )}

            {/* Feature pills — shown only on mobile/small screens; desktop hero panel shows them */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 lg:hidden">
              {FEATURE_PILLS.map((pill) => (
                <span
                  key={pill.label}
                  className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground"
                >
                  <pill.icon size={11} className="text-primary" />
                  {pill.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mt-6 text-center"
          >
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()}. Powered by FiFO BRIDGE
            </p>
          </motion.footer>
        </div>
      </div>
    </div>
  );
}
