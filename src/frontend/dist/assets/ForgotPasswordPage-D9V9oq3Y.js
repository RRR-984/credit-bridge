import { ab as useActor, b as useAppContext, r as reactExports, j as jsxRuntimeExports, o as motion, L as Link, C as CircleAlert, z as LoaderCircle, ac as createActor } from "./index-BOlz_vt-.js";
import { M as Mail } from "./mail-BBL1lBaN.js";
import { C as CircleCheck } from "./circle-check-DDjjY6mE.js";
function ForgotPasswordPage() {
  const { actor, isFetching } = useActor(createActor);
  const { language } = useAppContext();
  const isHindi = language === "hi";
  const [email, setEmail] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [sent, setSent] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [touched, setTouched] = reactExports.useState(false);
  const emailError = touched && !/^[^@]+@[^@]+\.[^@]+$/.test(email) ? isHindi ? "वैध ईमेल दर्ज करें" : "Enter a valid email address" : "";
  async function handleSubmit(e) {
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
        err instanceof Error ? err.message : isHindi ? "कुछ गलत हुआ। फिर कोशिश करें।" : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-page-bg relative flex min-h-screen w-full items-center justify-center overflow-x-hidden px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "aria-hidden": true,
        className: "pointer-events-none absolute inset-0 overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "auth-glow-orb-1 absolute -top-20 left-0 h-80 w-80 rounded-full opacity-25 blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "auth-glow-orb-2 absolute bottom-0 right-0 h-64 w-64 rounded-full opacity-20 blur-3xl" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24, scale: 0.97 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        className: "glass-card relative w-full max-w-sm px-6 sm:px-8 py-10 shadow-xl",
        "data-ocid": "forgot.card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-7 flex flex-col items-center text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "mb-4 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg",
                style: {
                  background: "linear-gradient(135deg, oklch(0.72 0.18 195), oklch(0.60 0.22 200))",
                  boxShadow: "0 0 28px oklch(0.72 0.18 195 / 0.4)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 22, className: "text-white" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: isHindi ? "पासवर्ड भूल गए?" : "Forgot Password?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground", children: isHindi ? "अपना ईमेल दर्ज करें — हम रीसेट लिंक भेजेंगे" : "Enter your email and we'll send you a reset link" })
          ] }),
          sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              className: "flex flex-col items-center gap-4 py-4",
              "data-ocid": "forgot.success_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex h-14 w-14 items-center justify-center rounded-full",
                    style: { background: "oklch(0.88 0.1 155 / 0.4)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CircleCheck,
                      {
                        size: 28,
                        style: { color: "oklch(0.55 0.2 155)" }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: isHindi ? "ईमेल भेजा गया!" : "Email Sent!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: isHindi ? `${email} पर रीसेट लिंक भेजा गया है।` : `A reset link was sent to ${email}` })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/",
                    className: "auth-link text-sm",
                    "data-ocid": "forgot.back_to_login_link",
                    children: isHindi ? "लॉगिन पर वापस जाएं" : "Back to Sign In"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, className: "space-y-4", children: [
            error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "forgot.error_state",
                className: "flex items-start gap-2 rounded-xl px-3 py-2.5 text-sm",
                style: {
                  background: "oklch(0.95 0.04 10 / 0.5)",
                  color: "oklch(0.45 0.22 10)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 15, className: "mt-0.5 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "forgot-email",
                  className: "mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wide",
                  children: isHindi ? "ईमेल पता" : "Email Address"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "forgot-email",
                  type: "email",
                  placeholder: "name@business.com",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  onBlur: () => setTouched(true),
                  "data-ocid": "forgot.email_input",
                  className: "auth-input w-full",
                  autoComplete: "email"
                }
              ),
              emailError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  "data-ocid": "forgot.email_field_error",
                  className: "mt-1 flex items-center gap-1 text-xs",
                  style: { color: "oklch(0.55 0.22 10)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 11 }),
                    " ",
                    emailError
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                disabled: submitting || isFetching,
                "data-ocid": "forgot.submit_button",
                className: "auth-button w-full flex items-center justify-center gap-2",
                children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }),
                  " ",
                  isHindi ? "भेज रहे हैं..." : "Sending..."
                ] }) : isHindi ? "रीसेट लिंक भेजें" : "Send Reset Link"
              }
            )
          ] }),
          !sent && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-5 text-center text-xs text-muted-foreground", children: [
            isHindi ? "याद आया?" : "Remembered it?",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "auth-link", "data-ocid": "forgot.login_link", children: isHindi ? "साइन इन करें" : "Sign In" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-center text-[10px] text-muted-foreground", children: [
            "Powered by",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-semibold",
                style: { color: "oklch(0.60 0.2 195)" },
                children: "FiFO BRIDGE"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
export {
  ForgotPasswordPage as default
};
