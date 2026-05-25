import { createActor } from "@/backend";
import { useAppContext } from "@/context/AppContext";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import { AlertCircle, CheckCircle2, Loader2, Mail } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const { actor, isFetching } = useActor(createActor);
  const { language } = useAppContext();
  const isHindi = language === "hi";

  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  const emailError =
    touched && !/^[^@]+@[^@]+\.[^@]+$/.test(email)
      ? isHindi
        ? "वैध ईमेल दर्ज करें"
        : "Enter a valid email address"
      : "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (emailError || !email) return;
    setSubmitting(true);
    setError("");
    try {
      if (!actor) throw new Error("Service unavailable");
      await actor.forgotPassword(email.trim());
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : isHindi
            ? "कुछ गलत हुआ। फिर कोशिश करें।"
            : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-page-bg relative flex min-h-screen w-full items-center justify-center overflow-x-hidden px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="auth-glow-orb-1 absolute -top-20 left-0 h-80 w-80 rounded-full opacity-25 blur-3xl" />
        <div className="auth-glow-orb-2 absolute bottom-0 right-0 h-64 w-64 rounded-full opacity-20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card relative w-full max-w-sm px-6 sm:px-8 py-10 shadow-xl"
        data-ocid="forgot.card"
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
            <Mail size={22} className="text-white" />
          </div>
          <h1 className="font-display text-xl font-bold text-foreground">
            {isHindi ? "पासवर्ड भूल गए?" : "Forgot Password?"}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {isHindi
              ? "अपना ईमेल दर्ज करें — हम रीसेट लिंक भेजेंगे"
              : "Enter your email and we'll send you a reset link"}
          </p>
        </div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-4"
            data-ocid="forgot.success_state"
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
                {isHindi ? "ईमेल भेजा गया!" : "Email Sent!"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {isHindi
                  ? `${email} पर रीसेट लिंक भेजा गया है।`
                  : `A reset link was sent to ${email}`}
              </p>
            </div>
            <Link
              to="/"
              className="auth-link text-sm"
              data-ocid="forgot.back_to_login_link"
            >
              {isHindi ? "लॉगिन पर वापस जाएं" : "Back to Sign In"}
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {error && (
              <div
                data-ocid="forgot.error_state"
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
                htmlFor="forgot-email"
                className="mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wide"
              >
                {isHindi ? "ईमेल पता" : "Email Address"}
              </label>
              <input
                id="forgot-email"
                type="email"
                placeholder="name@business.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched(true)}
                data-ocid="forgot.email_input"
                className="auth-input w-full"
                autoComplete="email"
              />
              {emailError && (
                <p
                  data-ocid="forgot.email_field_error"
                  className="mt-1 flex items-center gap-1 text-xs"
                  style={{ color: "oklch(0.55 0.22 10)" }}
                >
                  <AlertCircle size={11} /> {emailError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting || isFetching}
              data-ocid="forgot.submit_button"
              className="auth-button w-full flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />{" "}
                  {isHindi ? "भेज रहे हैं..." : "Sending..."}
                </>
              ) : isHindi ? (
                "रीसेट लिंक भेजें"
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        )}

        {!sent && (
          <p className="mt-5 text-center text-xs text-muted-foreground">
            {isHindi ? "याद आया?" : "Remembered it?"}{" "}
            <Link to="/" className="auth-link" data-ocid="forgot.login_link">
              {isHindi ? "साइन इन करें" : "Sign In"}
            </Link>
          </p>
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
