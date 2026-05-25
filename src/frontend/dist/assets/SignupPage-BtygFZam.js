import { a6 as useAuth, b as useAppContext, a as useNavigate, r as reactExports, j as jsxRuntimeExports, o as motion, C as CircleAlert, a9 as EyeOff, aa as Eye, z as LoaderCircle, L as Link } from "./index-BOlz_vt-.js";
import { U as UserPlus } from "./user-plus-DQVGmE4d.js";
import { C as CircleCheck } from "./circle-check-DDjjY6mE.js";
function getPasswordStrength(pw) {
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
    { label: "Strong", color: "oklch(0.65 0.2 155)" }
  ];
  return { score, ...map[score] };
}
function SignupPage() {
  const { signup, isLoading: authLoading } = useAuth();
  const { language } = useAppContext();
  const navigate = useNavigate();
  const isHindi = language === "hi";
  const [displayName, setDisplayName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirm, setConfirm] = reactExports.useState("");
  const [agreed, setAgreed] = reactExports.useState(false);
  const [showPw, setShowPw] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [serverError, setServerError] = reactExports.useState("");
  const [touched, setTouched] = reactExports.useState({});
  const strength = getPasswordStrength(password);
  const errors = {
    displayName: touched.displayName && !displayName.trim() ? isHindi ? "नाम आवश्यक है" : "Name is required" : "",
    email: touched.email && !/^[^@]+@[^@]+\.[^@]+$/.test(email) ? isHindi ? "वैध ईमेल दर्ज करें" : "Enter a valid email" : "",
    password: touched.password && password.length < 8 ? isHindi ? "पासवर्ड कम से कम 8 अक्षर का होना चाहिए" : "Password must be at least 8 characters" : "",
    confirm: touched.confirm && confirm !== password ? isHindi ? "पासवर्ड मेल नहीं खाते" : "Passwords do not match" : "",
    agreed: touched.agreed && !agreed ? isHindi ? "शर्तें स्वीकार करें" : "Please accept the terms" : ""
  };
  const blur = reactExports.useCallback((field) => {
    setTouched((t) => ({ ...t, [field]: true }));
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({
      displayName: true,
      email: true,
      password: true,
      confirm: true,
      agreed: true
    });
    if (errors.displayName || errors.email || errors.password || errors.confirm || !agreed)
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-page-bg relative flex min-h-screen w-full max-w-full overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "aria-hidden": true,
        className: "pointer-events-none absolute inset-0 overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "auth-glow-orb-1 absolute -top-20 left-0 h-96 w-96 rounded-full opacity-25 blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "auth-glow-orb-2 absolute bottom-0 right-0 h-64 w-64 rounded-full opacity-20 blur-3xl" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:flex flex-1 flex-col justify-center items-center px-12 py-16 max-w-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -24 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.6 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/auth-hero-network.dim_600x700.png",
              alt: "Credit Bridge Network",
              className: "w-full max-w-sm mx-auto object-contain"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display text-3xl font-extrabold",
                style: { color: "oklch(0.15 0.03 245)" },
                children: isHindi ? "जुड़ें Credit Bridge से" : "Join Credit Bridge"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "mt-2 text-sm",
                style: { color: "oklch(0.42 0.04 245)" },
                children: isHindi ? "हजारों व्यापारी पहले से भरोसा करते हैं" : "Thousands of businesses already trust us"
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 items-center justify-center px-4 py-8 lg:py-12 lg:pr-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24, scale: 0.97 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        className: "glass-card w-full max-w-sm px-6 sm:px-8 py-8 shadow-xl",
        "data-ocid": "signup.card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-col items-center text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "mb-3 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg",
                style: {
                  background: "linear-gradient(135deg, oklch(0.72 0.18 195), oklch(0.60 0.22 200))",
                  boxShadow: "0 0 28px oklch(0.72 0.18 195 / 0.4)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { size: 22, className: "text-white" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: isHindi ? "खाता बनाएं" : "Create Account" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: isHindi ? "अपना व्यापार शुरू करें" : "Start managing your business today" })
          ] }),
          serverError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "signup.error_state",
              className: "mb-4 flex items-start gap-2 rounded-xl px-3 py-2.5 text-sm",
              style: {
                background: "oklch(0.95 0.04 10 / 0.5)",
                color: "oklch(0.45 0.22 10)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 15, className: "mt-0.5 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: serverError })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, className: "space-y-3.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "signup-name",
                  className: "mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wide",
                  children: isHindi ? "पूरा नाम" : "Full Name"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "signup-name",
                  type: "text",
                  placeholder: isHindi ? "आपका नाम" : "Your name",
                  value: displayName,
                  onChange: (e) => setDisplayName(e.target.value),
                  onBlur: () => blur("displayName"),
                  "data-ocid": "signup.name_input",
                  className: "auth-input w-full",
                  autoComplete: "name"
                }
              ),
              errors.displayName && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  "data-ocid": "signup.name_field_error",
                  className: "mt-1 flex items-center gap-1 text-xs",
                  style: { color: "oklch(0.55 0.22 10)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 11 }),
                    " ",
                    errors.displayName
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "signup-email",
                  className: "mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wide",
                  children: isHindi ? "ईमेल" : "Email"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "signup-email",
                  type: "email",
                  placeholder: "name@business.com",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  onBlur: () => blur("email"),
                  "data-ocid": "signup.email_input",
                  className: "auth-input w-full",
                  autoComplete: "email"
                }
              ),
              errors.email && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  "data-ocid": "signup.email_field_error",
                  className: "mt-1 flex items-center gap-1 text-xs",
                  style: { color: "oklch(0.55 0.22 10)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 11 }),
                    " ",
                    errors.email
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "signup-password",
                  className: "mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wide",
                  children: isHindi ? "पासवर्ड" : "Password"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "signup-password",
                    type: showPw ? "text" : "password",
                    placeholder: isHindi ? "मजबूत पासवर्ड" : "Strong password",
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                    onBlur: () => blur("password"),
                    "data-ocid": "signup.password_input",
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
                    "aria-label": showPw ? "Hide password" : "Show password",
                    children: showPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 15 })
                  }
                )
              ] }),
              password.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-1 flex-1 rounded-full transition-all duration-300",
                    style: {
                      background: n <= strength.score ? strength.color : "oklch(0.88 0.04 195 / 0.5)"
                    }
                  },
                  n
                )) }),
                strength.label && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "mt-0.5 text-xs font-medium",
                    style: { color: strength.color },
                    children: strength.label
                  }
                )
              ] }),
              errors.password && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  "data-ocid": "signup.password_field_error",
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
                  htmlFor: "signup-confirm",
                  className: "mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wide",
                  children: isHindi ? "पासवर्ड दोहराएं" : "Confirm Password"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "signup-confirm",
                    type: showConfirm ? "text" : "password",
                    placeholder: isHindi ? "पासवर्ड दोहराएं" : "Repeat password",
                    value: confirm,
                    onChange: (e) => setConfirm(e.target.value),
                    onBlur: () => blur("confirm"),
                    "data-ocid": "signup.confirm_input",
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
                    "aria-label": showConfirm ? "Hide password" : "Show password",
                    children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 15 })
                  }
                )
              ] }),
              confirm.length > 0 && confirm === password && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "mt-1 flex items-center gap-1 text-xs",
                  style: { color: "oklch(0.55 0.2 155)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 11 }),
                    " ",
                    isHindi ? "मेल खाता है" : "Passwords match"
                  ]
                }
              ),
              errors.confirm && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  "data-ocid": "signup.confirm_field_error",
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
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-2 cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: agreed,
                    onChange: (e) => {
                      setAgreed(e.target.checked);
                      setTouched((t) => ({ ...t, agreed: true }));
                    },
                    "data-ocid": "signup.terms_checkbox",
                    className: "mt-0.5 h-4 w-4 rounded accent-primary"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  isHindi ? "मैं " : "I agree to the ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-medium",
                      style: { color: "oklch(0.60 0.2 195)" },
                      children: isHindi ? "सेवा शर्तें" : "Terms of Service"
                    }
                  ),
                  isHindi ? " स्वीकार करता/करती हूं" : " and ",
                  !isHindi && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-medium",
                      style: { color: "oklch(0.60 0.2 195)" },
                      children: "Privacy Policy"
                    }
                  )
                ] })
              ] }),
              errors.agreed && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  "data-ocid": "signup.terms_field_error",
                  className: "mt-1 flex items-center gap-1 text-xs",
                  style: { color: "oklch(0.55 0.22 10)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 11 }),
                    " ",
                    errors.agreed
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                disabled: isWorking,
                "data-ocid": "signup.submit_button",
                className: "auth-button w-full mt-1 flex items-center justify-center gap-2",
                children: isWorking ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }),
                  " ",
                  isHindi ? "बना रहे हैं..." : "Creating account..."
                ] }) : isHindi ? "खाता बनाएं" : "Create Account"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-5 text-center text-xs text-muted-foreground", children: [
            isHindi ? "पहले से खाता है?" : "Already have an account?",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "auth-link", "data-ocid": "signup.login_link", children: isHindi ? "साइन इन करें" : "Sign In" })
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
    ) })
  ] });
}
export {
  SignupPage as default
};
