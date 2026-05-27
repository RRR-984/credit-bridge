import { f as createLucideIcon, ab as useActor, a6 as useAuth, b as useAppContext, a as useNavigate, q as useSearch, r as reactExports, j as jsxRuntimeExports, o as motion, z as LoaderCircle, ac as createActorWithHost } from "./index-BMWWyN1B.js";
import { C as CircleCheck } from "./circle-check-B6opSAPi.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8", key: "12jkf8" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }],
  ["path", { d: "m16 19 2 2 4-4", key: "1b14m6" }]
];
const MailCheck = createLucideIcon("mail-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
function EmailVerificationPage() {
  const { actor, isFetching } = useActor(createActorWithHost);
  const { user, logout } = useAuth();
  const { language } = useAppContext();
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const token = (search == null ? void 0 : search.token) ?? "";
  const isHindi = language === "hi";
  const [verifying, setVerifying] = reactExports.useState(false);
  const [verified, setVerified] = reactExports.useState(false);
  const [resending, setResending] = reactExports.useState(false);
  const [resendSent, setResendSent] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!token || !actor || isFetching) return;
    setVerifying(true);
    actor.verifyEmail(token).then((ok) => {
      if (ok) {
        setVerified(true);
        setTimeout(() => navigate({ to: "/dashboard" }), 2500);
      } else {
        setError(
          isHindi ? "सत्यापन टोकन अमान्य है।" : "Verification link is invalid or expired."
        );
      }
    }).catch(() => setError(isHindi ? "सत्यापन विफल।" : "Verification failed.")).finally(() => setVerifying(false));
  }, [token, actor, isFetching, isHindi, navigate]);
  async function handleResend() {
    if (!actor || resending) return;
    setResending(true);
    setError("");
    try {
      const email = (user == null ? void 0 : user.email) ?? "";
      const backendActor = actor;
      if (typeof backendActor.resendVerificationEmail === "function") {
        const ok = await backendActor.resendVerificationEmail(email);
        if (!ok) {
          throw new Error("resend failed");
        }
      } else {
        throw new Error("not available");
      }
      setResendSent(true);
      setTimeout(() => setResendSent(false), 5e3);
    } catch {
      setError(
        isHindi ? "दोबारा भेजना विफल। कृपया पुनः प्रयास करें।" : "Failed to send. Please try again."
      );
    } finally {
      setResending(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative flex min-h-screen w-full items-center justify-center overflow-x-hidden px-4",
      style: {
        background: "linear-gradient(135deg, oklch(0.96 0.025 210) 0%, oklch(0.99 0.008 200) 50%, oklch(0.96 0.022 185) 100%)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute inset-0 overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute -top-20 left-0 h-80 w-80 rounded-full opacity-25 blur-3xl",
                  style: { background: "oklch(0.82 0.18 195)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute bottom-0 right-0 h-64 w-64 rounded-full opacity-20 blur-3xl",
                  style: { background: "oklch(0.78 0.14 185)" }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 24, scale: 0.97 },
            animate: { opacity: 1, y: 0, scale: 1 },
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            className: "glass-card relative w-full max-w-sm px-6 sm:px-8 py-10 shadow-xl text-center",
            "data-ocid": "verify.card",
            children: [
              verifying ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center gap-4 py-4",
                  "data-ocid": "verify.loading_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      LoaderCircle,
                      {
                        size: 36,
                        className: "animate-spin",
                        style: { color: "oklch(0.60 0.2 195)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: isHindi ? "सत्यापित कर रहे हैं..." : "Verifying your email..." })
                  ]
                }
              ) : verified ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.95 },
                  animate: { opacity: 1, scale: 1 },
                  className: "flex flex-col items-center gap-4 py-4",
                  "data-ocid": "verify.success_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "flex h-16 w-16 items-center justify-center rounded-full",
                        style: { background: "oklch(0.88 0.1 155 / 0.4)" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CircleCheck,
                          {
                            size: 32,
                            style: { color: "oklch(0.55 0.2 155)" }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-bold text-foreground", children: isHindi ? "ईमेल सत्यापित!" : "Email Verified!" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: isHindi ? "डैशबोर्ड पर जा रहे हैं..." : "Redirecting to your dashboard..." })
                    ] })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-col items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "mb-4 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.72 0.18 195), oklch(0.60 0.22 200))",
                        boxShadow: "0 0 28px oklch(0.72 0.18 195 / 0.4)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(MailCheck, { size: 26, className: "text-white" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: isHindi ? "ईमेल सत्यापित करें" : "Verify Your Email" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: (user == null ? void 0 : user.email) ? isHindi ? `${user.email} पर एक सत्यापन लिंक भेजा गया है।` : `A verification link was sent to ${user.email}` : isHindi ? "आपके ईमेल पर एक सत्यापन लिंक भेजा गया है।" : "A verification link was sent to your email address." })
                ] }),
                error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    "data-ocid": "verify.error_state",
                    className: "mb-4 rounded-xl px-3 py-2.5 text-sm",
                    style: {
                      background: "oklch(0.95 0.04 10 / 0.5)",
                      color: "oklch(0.45 0.22 10)"
                    },
                    children: error
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleResend,
                      disabled: resending || resendSent,
                      "data-ocid": "verify.resend_button",
                      className: "auth-button w-full flex items-center justify-center gap-2",
                      children: resending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }),
                        " ",
                        isHindi ? "भेज रहे हैं..." : "Sending..."
                      ] }) : resendSent ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 16 }),
                        " ",
                        isHindi ? "भेजा गया!" : "Sent!"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 16 }),
                        " ",
                        isHindi ? "लिंक दोबारा भेजें" : "Resend Verification Link"
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: async () => {
                        await logout();
                      },
                      "data-ocid": "verify.signout_button",
                      className: "block w-full text-sm text-center text-muted-foreground hover:text-foreground transition-colors",
                      children: isHindi ? "साइन आउट करें" : "Sign Out"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-center text-[10px] text-muted-foreground", children: [
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
      ]
    }
  );
}
export {
  EmailVerificationPage as default
};
