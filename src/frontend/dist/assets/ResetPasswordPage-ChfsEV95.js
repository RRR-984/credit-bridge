import { f as createLucideIcon, ab as useActor, b as useAppContext, a as useNavigate, q as useSearch, r as reactExports, j as jsxRuntimeExports, o as motion, C as CircleAlert, L as Link, a9 as EyeOff, aa as Eye, z as LoaderCircle, ac as createActor } from "./index-BOlz_vt-.js";
import { C as CircleCheck } from "./circle-check-DDjjY6mE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
      key: "1s6t7t"
    }
  ],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }]
];
const KeyRound = createLucideIcon("key-round", __iconNode);
function ResetPasswordPage() {
  const { actor, isFetching } = useActor(createActor);
  const { language } = useAppContext();
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const token = (search == null ? void 0 : search.token) ?? "";
  const isHindi = language === "hi";
  const [password, setPassword] = reactExports.useState("");
  const [confirm, setConfirm] = reactExports.useState("");
  const [showPw, setShowPw] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [success, setSuccess] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [touched, setTouched] = reactExports.useState({});
  const errors = {
    password: touched.password && password.length < 8 ? isHindi ? "पासवर्ड कम से कम 8 अक्षर का होना चाहिए" : "Password must be at least 8 characters" : "",
    confirm: touched.confirm && confirm !== password ? isHindi ? "पासवर्ड मेल नहीं खाते" : "Passwords do not match" : ""
  };
  reactExports.useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => navigate({ to: "/" }), 3e3);
    return () => clearTimeout(t);
  }, [success, navigate]);
  async function handleSubmit(e) {
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
          isHindi ? "रीसेट लिंक अमान्य या समाप्त हो गया है।" : "Reset link is invalid or has expired."
        );
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : isHindi ? "कुछ गलत हुआ" : "Something went wrong"
      );
    } finally {
      setSubmitting(false);
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
            className: "glass-card relative w-full max-w-sm px-6 sm:px-8 py-10 shadow-xl",
            "data-ocid": "reset.card",
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
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { size: 22, className: "text-white" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: isHindi ? "नया पासवर्ड" : "Reset Password" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground", children: isHindi ? "अपना नया पासवर्ड सेट करें" : "Set your new password below" })
              ] }),
              !token && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "reset.error_state",
                  className: "mb-4 flex items-start gap-2 rounded-xl px-3 py-2.5 text-sm",
                  style: {
                    background: "oklch(0.95 0.04 10 / 0.5)",
                    color: "oklch(0.45 0.22 10)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 15, className: "mt-0.5 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isHindi ? "अमान्य रीसेट लिंक।" : "Invalid or missing reset token." })
                  ]
                }
              ),
              success ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.95 },
                  animate: { opacity: 1, scale: 1 },
                  className: "flex flex-col items-center gap-4 py-4",
                  "data-ocid": "reset.success_state",
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
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: isHindi ? "पासवर्ड बदल गया!" : "Password Reset!" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: isHindi ? "आपको लॉगिन पेज पर भेजा जा रहा है..." : "Redirecting you to Sign In..." })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Link,
                      {
                        to: "/",
                        className: "auth-link text-sm",
                        "data-ocid": "reset.login_link",
                        children: isHindi ? "अभी साइन इन करें" : "Sign In Now"
                      }
                    )
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, className: "space-y-4", children: [
                error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": "reset.error_state",
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
                      htmlFor: "reset-password",
                      className: "mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wide",
                      children: isHindi ? "नया पासवर्ड" : "New Password"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "reset-password",
                        type: showPw ? "text" : "password",
                        placeholder: isHindi ? "नया पासवर्ड" : "New password",
                        value: password,
                        onChange: (e) => setPassword(e.target.value),
                        onBlur: () => setTouched((t) => ({ ...t, password: true })),
                        "data-ocid": "reset.password_input",
                        className: "auth-input w-full pr-10",
                        autoComplete: "new-password"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setShowPw((v) => !v),
                        className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                        "aria-label": "Toggle visibility",
                        children: showPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 15 })
                      }
                    )
                  ] }),
                  errors.password && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      "data-ocid": "reset.password_field_error",
                      className: "mt-1 flex items-center gap-1 text-xs",
                      style: { color: "oklch(0.55 0.22 10)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 11 }),
                        " ",
                        errors.password
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "reset-confirm",
                      className: "mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wide",
                      children: isHindi ? "पासवर्ड दोहराएं" : "Confirm Password"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "reset-confirm",
                        type: showConfirm ? "text" : "password",
                        placeholder: isHindi ? "पासवर्ड दोहराएं" : "Confirm password",
                        value: confirm,
                        onChange: (e) => setConfirm(e.target.value),
                        onBlur: () => setTouched((t) => ({ ...t, confirm: true })),
                        "data-ocid": "reset.confirm_input",
                        className: "auth-input w-full pr-10",
                        autoComplete: "new-password"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setShowConfirm((v) => !v),
                        className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                        "aria-label": "Toggle visibility",
                        children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 15 })
                      }
                    )
                  ] }),
                  errors.confirm && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      "data-ocid": "reset.confirm_field_error",
                      className: "mt-1 flex items-center gap-1 text-xs",
                      style: { color: "oklch(0.55 0.22 10)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 11 }),
                        " ",
                        errors.confirm
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: submitting || isFetching || !token,
                    "data-ocid": "reset.submit_button",
                    className: "auth-button w-full flex items-center justify-center gap-2",
                    children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }),
                      " ",
                      isHindi ? "बदल रहे हैं..." : "Resetting..."
                    ] }) : isHindi ? "पासवर्ड बदलें" : "Reset Password"
                  }
                )
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
      ]
    }
  );
}
export {
  ResetPasswordPage as default
};
