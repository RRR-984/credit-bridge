import { createActor } from "@/backend";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { createActorWithHost } from "@/lib/createActorWithHost";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { CheckCircle2, Loader2, MailCheck, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function EmailVerificationPage() {
  const { actor, isFetching } = useActor(createActorWithHost);
  const { user, logout } = useAuth();
  const { language } = useAppContext();
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { token?: string };
  const token = search?.token ?? "";
  const isHindi = language === "hi";

  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendSent, setResendSent] = useState(false);
  const [error, setError] = useState("");

  // Auto-verify if token is present in URL
  useEffect(() => {
    if (!token || !actor || isFetching) return;
    setVerifying(true);
    actor
      .verifyEmail(token)
      .then((ok) => {
        if (ok) {
          setVerified(true);
          setTimeout(() => navigate({ to: "/dashboard" }), 2500);
        } else {
          setError(
            isHindi
              ? "सत्यापन टोकन अमान्य है।"
              : "Verification link is invalid or expired.",
          );
        }
      })
      .catch(() => setError(isHindi ? "सत्यापन विफल।" : "Verification failed."))
      .finally(() => setVerifying(false));
  }, [token, actor, isFetching, isHindi, navigate]);

  async function handleResend() {
    if (!actor || resending) return;
    setResending(true);
    setError("");
    try {
      const email = user?.email ?? "";
      // Call resendVerificationEmail if available, otherwise fallback
      const backendActor = actor as typeof actor & {
        resendVerificationEmail?: (email: string) => Promise<boolean>;
      };
      if (typeof backendActor.resendVerificationEmail === "function") {
        const ok = await backendActor.resendVerificationEmail(email);
        if (!ok) {
          throw new Error("resend failed");
        }
      } else {
        // Backend method not deployed yet — show a helpful message
        throw new Error("not available");
      }
      setResendSent(true);
      // Reset after 5 seconds so user can resend again if needed
      setTimeout(() => setResendSent(false), 5000);
    } catch {
      setError(
        isHindi
          ? "दोबारा भेजना विफल। कृपया पुनः प्रयास करें।"
          : "Failed to send. Please try again.",
      );
    } finally {
      setResending(false);
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
        className="glass-card relative w-full max-w-sm px-6 sm:px-8 py-10 shadow-xl text-center"
        data-ocid="verify.card"
      >
        {verifying ? (
          <div
            className="flex flex-col items-center gap-4 py-4"
            data-ocid="verify.loading_state"
          >
            <Loader2
              size={36}
              className="animate-spin"
              style={{ color: "oklch(0.60 0.2 195)" }}
            />
            <p className="text-sm text-muted-foreground">
              {isHindi ? "सत्यापित कर रहे हैं..." : "Verifying your email..."}
            </p>
          </div>
        ) : verified ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-4"
            data-ocid="verify.success_state"
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: "oklch(0.88 0.1 155 / 0.4)" }}
            >
              <CheckCircle2
                size={32}
                style={{ color: "oklch(0.55 0.2 155)" }}
              />
            </div>
            <div>
              <p className="font-display text-xl font-bold text-foreground">
                {isHindi ? "ईमेल सत्यापित!" : "Email Verified!"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {isHindi
                  ? "डैशबोर्ड पर जा रहे हैं..."
                  : "Redirecting to your dashboard..."}
              </p>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="mb-6 flex flex-col items-center">
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.18 195), oklch(0.60 0.22 200))",
                  boxShadow: "0 0 28px oklch(0.72 0.18 195 / 0.4)",
                }}
              >
                <MailCheck size={26} className="text-white" />
              </div>
              <h1 className="font-display text-xl font-bold text-foreground">
                {isHindi ? "ईमेल सत्यापित करें" : "Verify Your Email"}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {user?.email
                  ? isHindi
                    ? `${user.email} पर एक सत्यापन लिंक भेजा गया है।`
                    : `A verification link was sent to ${user.email}`
                  : isHindi
                    ? "आपके ईमेल पर एक सत्यापन लिंक भेजा गया है।"
                    : "A verification link was sent to your email address."}
              </p>
            </div>

            {error && (
              <div
                data-ocid="verify.error_state"
                className="mb-4 rounded-xl px-3 py-2.5 text-sm"
                style={{
                  background: "oklch(0.95 0.04 10 / 0.5)",
                  color: "oklch(0.45 0.22 10)",
                }}
              >
                {error}
              </div>
            )}

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleResend}
                disabled={resending || resendSent}
                data-ocid="verify.resend_button"
                className="auth-button w-full flex items-center justify-center gap-2"
              >
                {resending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />{" "}
                    {isHindi ? "भेज रहे हैं..." : "Sending..."}
                  </>
                ) : resendSent ? (
                  <>
                    <CheckCircle2 size={16} /> {isHindi ? "भेजा गया!" : "Sent!"}
                  </>
                ) : (
                  <>
                    <RefreshCw size={16} />{" "}
                    {isHindi ? "लिंक दोबारा भेजें" : "Resend Verification Link"}
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={async () => {
                  await logout();
                }}
                data-ocid="verify.signout_button"
                className="block w-full text-sm text-center text-muted-foreground hover:text-foreground transition-colors"
              >
                {isHindi ? "साइन आउट करें" : "Sign Out"}
              </button>
            </div>
          </>
        )}

        <p className="mt-6 text-center text-[10px] text-muted-foreground">
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
