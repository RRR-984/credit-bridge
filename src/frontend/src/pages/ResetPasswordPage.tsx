import { createActor } from "@/backend";
import { useAppContext } from "@/context/AppContext";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function ResetPasswordPage() {
  const { actor, isFetching } = useActor(createActor);
  const { language } = useAppContext();
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { token?: string };
  const token = search?.token ?? "";
  const isHindi = language === "hi";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = {
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
  };

  // Auto-redirect after success
  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => navigate({ to: "/" }), 3000);
    return () => clearTimeout(t);
  }, [success, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ password: true, confirm: true });
    if (errors.password || errors.confirm || !token) return;
    setSubmitting(true);
    setError("");
    try {
      if (!actor) throw new Error("Service unavailable");
      const ok = await actor.resetPassword(token, password);
      if (ok) {
        setSuccess(true);
      } else {
        setError(
          isHindi
            ? "रीसेट लिंक अमान्य या समाप्त हो गया है।"
            : "Reset link is invalid or has expired.",
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : isHindi
            ? "कुछ गलत हुआ"
            : "Something went wrong",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden px-4"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.96 0.025 210) 0%, oklch(0.99 0.008 200) 50%, oklch(0.96 0.022 185) 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -top-20 left-0 h-80 w-80 rounded-full opacity-25 blur-3xl"
          style={{ background: "oklch(0.82 0.18 195)" }}
        />
        <div
          className="absolute bottom-0 right-0 h-64 w-64 rounded-full opacity-20 blur-3xl"
          style={{ background: "oklch(0.78 0.14 185)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card relative w-full max-w-sm px-6 sm:px-8 py-10 shadow-xl"
        data-ocid="reset.card"
      >
        <div className="mb-7 flex flex-col items-center text-center">
          <div
            className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.18 195), oklch(0.60 0.22 200))",
              boxShadow: "0 0 28px oklch(0.72 0.18 195 / 0.4)",
            }}
          >
            <KeyRound size={22} className="text-white" />
          </div>
          <h1 className="font-display text-xl font-bold text-foreground">
            {isHindi ? "नया पासवर्ड" : "Reset Password"}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {isHindi ? "अपना नया पासवर्ड सेट करें" : "Set your new password below"}
          </p>
        </div>

        {!token && (
          <div
            data-ocid="reset.error_state"
            className="mb-4 flex items-start gap-2 rounded-xl px-3 py-2.5 text-sm"
            style={{
              background: "oklch(0.95 0.04 10 / 0.5)",
              color: "oklch(0.45 0.22 10)",
            }}
          >
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            <span>
              {isHindi ? "अमान्य रीसेट लिंक।" : "Invalid or missing reset token."}
            </span>
          </div>
        )}

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-4"
            data-ocid="reset.success_state"
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full"
              style={{ background: "oklch(0.88 0.1 155 / 0.4)" }}
            >
              <CheckCircle2
                size={28}
                style={{ color: "oklch(0.55 0.2 155)" }}
              />
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground">
                {isHindi ? "पासवर्ड बदल गया!" : "Password Reset!"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {isHindi
                  ? "आपको लॉगिन पेज पर भेजा जा रहा है..."
                  : "Redirecting you to Sign In..."}
              </p>
            </div>
            <Link
              to="/"
              className="auth-link text-sm"
              data-ocid="reset.login_link"
            >
              {isHindi ? "अभी साइन इन करें" : "Sign In Now"}
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {error && (
              <div
                data-ocid="reset.error_state"
                className="flex items-start gap-2 rounded-xl px-3 py-2.5 text-sm"
                style={{
                  background: "oklch(0.95 0.04 10 / 0.5)",
                  color: "oklch(0.45 0.22 10)",
                }}
              >
                <AlertCircle size={15} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="reset-password"
                className="mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wide"
              >
                {isHindi ? "नया पासवर्ड" : "New Password"}
              </label>
              <div className="relative">
                <input
                  id="reset-password"
                  type={showPw ? "text" : "password"}
                  placeholder={isHindi ? "नया पासवर्ड" : "New password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                  data-ocid="reset.password_input"
                  className="auth-input w-full pr-10"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle visibility"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && (
                <p
                  data-ocid="reset.password_field_error"
                  className="mt-1 flex items-center gap-1 text-xs"
                  style={{ color: "oklch(0.55 0.22 10)" }}
                >
                  <AlertCircle size={11} /> {errors.password}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="reset-confirm"
                className="mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wide"
              >
                {isHindi ? "पासवर्ड दोहराएं" : "Confirm Password"}
              </label>
              <div className="relative">
                <input
                  id="reset-confirm"
                  type={showConfirm ? "text" : "password"}
                  placeholder={isHindi ? "पासवर्ड दोहराएं" : "Confirm password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
                  data-ocid="reset.confirm_input"
                  className="auth-input w-full pr-10"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle visibility"
                >
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.confirm && (
                <p
                  data-ocid="reset.confirm_field_error"
                  className="mt-1 flex items-center gap-1 text-xs"
                  style={{ color: "oklch(0.55 0.22 10)" }}
                >
                  <AlertCircle size={11} /> {errors.confirm}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting || isFetching || !token}
              data-ocid="reset.submit_button"
              className="auth-button w-full flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />{" "}
                  {isHindi ? "बदल रहे हैं..." : "Resetting..."}
                </>
              ) : isHindi ? (
                "पासवर्ड बदलें"
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        )}

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
  );
}
