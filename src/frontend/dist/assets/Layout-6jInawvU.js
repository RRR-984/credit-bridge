import { e as createLucideIcon, r as reactExports, x as usePWAInstall, j as jsxRuntimeExports, S as Smartphone, D as Download, F as useInternetIdentity, b as useAppContext, X as useRouterState, Y as Shield, n as motion, Z as Link } from "./index-ac2W1xmb.js";
import { c as cn, B as Button } from "./button-VwdXeUZz.js";
import { X } from "./x-Bv973hmb.js";
import { U as Users } from "./users-YniusYf_.js";
import { S as Settings } from "./settings-DushNHAJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 18h.01", key: "1tta3j" }],
  ["path", { d: "M3 6h.01", key: "1rqtza" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 18h13", key: "1lx6n3" }],
  ["path", { d: "M8 6h13", key: "ik3vkj" }]
];
const List = createLucideIcon("list", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 18h16", key: "19g7jn" }],
  ["path", { d: "M4 6h16", key: "1o0s65" }]
];
const Menu = createLucideIcon("menu", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
];
const Moon = createLucideIcon("moon", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
];
const Sun = createLucideIcon("sun", __iconNode);
const THEME_KEY = "creditsetu-theme";
function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  localStorage.setItem(THEME_KEY, theme);
}
function useTheme() {
  const [theme, setThemeState] = reactExports.useState(getInitialTheme);
  reactExports.useEffect(() => {
    applyTheme(theme);
  }, [theme]);
  const setTheme = (t) => {
    setThemeState(t);
    applyTheme(t);
  };
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  return { theme, setTheme, toggleTheme, isDark: theme === "dark" };
}
function InstallPrompt() {
  const {
    canInstall,
    isIOS,
    isInstalled,
    promptInstall,
    dismissInstall,
    dismissed
  } = usePWAInstall();
  const [visible, setVisible] = reactExports.useState(false);
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setMounted(true);
  }, []);
  reactExports.useEffect(() => {
    if (canInstall && !isInstalled && !dismissed) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
    setVisible(false);
  }, [canInstall, isInstalled, dismissed]);
  const handleDismiss = () => {
    setVisible(false);
    setTimeout(dismissInstall, 350);
  };
  const handleInstall = async () => {
    await promptInstall();
    setVisible(false);
  };
  if (!mounted) return null;
  if (!canInstall && !isIOS) return null;
  if (isInstalled || dismissed) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `fixed inset-x-0 bottom-0 z-[100] flex justify-center px-4 pb-6 transition-all duration-500 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`,
      "data-ocid": "install.prompt.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-md w-full max-w-md overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 pt-4 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-5 w-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Install Credit Bridge App" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Access your dashboard instantly" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleDismiss,
              className: "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              "aria-label": "Dismiss install prompt",
              "data-ocid": "install.dismiss_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-2 pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "Access your financial dashboard instantly — no browser needed. Works offline and feels like a native app." }) }),
        isIOS && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-5 mb-3 rounded-lg bg-primary/5 px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs font-medium text-foreground", children: "To install on iPhone/iPad:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary", children: "1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Tap the ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "inline h-3 w-3 mx-0.5" }),
              " Share button in Safari"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary", children: "2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Scroll down and tap",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Add to Home Screen" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 px-5 pb-5 pt-2", children: [
          !isIOS && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleInstall,
              className: "flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98]",
              "data-ocid": "install.confirm_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
                "Install App"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleDismiss,
              className: "flex flex-1 items-center justify-center rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted",
              "data-ocid": "install.cancel_button",
              children: "Maybe Later"
            }
          )
        ] })
      ] })
    }
  );
}
const NAV_ITEMS = [
  {
    to: "/dashboard",
    label: "Dashboard",
    labelHi: "डैशबोर्ड",
    icon: LayoutDashboard,
    ocid: "nav.dashboard_link"
  },
  {
    to: "/customers",
    label: "Customers",
    labelHi: "ग्राहक",
    icon: Users,
    ocid: "nav.customers_link"
  },
  {
    to: "/transactions",
    label: "Transactions",
    labelHi: "लेनदेन",
    icon: List,
    ocid: "nav.transactions_link"
  },
  {
    to: "/settings",
    label: "Settings",
    labelHi: "सेटिंग्स",
    icon: Settings,
    ocid: "nav.settings_link"
  }
];
const ADMIN_NAV_ITEM = {
  to: "/admin",
  label: "Admin Panel",
  labelHi: "एडमिन पैनल",
  icon: Shield,
  ocid: "nav.admin_link"
};
function Layout({ children, title }) {
  const { clear, loginStatus } = useInternetIdentity();
  const { toggleTheme, isDark } = useTheme();
  const { language, setLanguage, isAdmin } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = reactExports.useState(false);
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const isHindi = language === "hi";
  const navLabel = (item) => isHindi ? item.labelHi : item.label;
  const allNavItems = isAdmin ? [...NAV_ITEMS, ADMIN_NAV_ITEM] : NAV_ITEMS;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        className: "fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r md:flex",
        style: {
          background: "linear-gradient(180deg, oklch(0.14 0.03 248) 0%, oklch(0.11 0.025 248) 100%)",
          borderColor: "oklch(0.26 0.04 248 / 0.6)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex h-16 items-center gap-3 px-5 border-b",
              style: { borderColor: "oklch(0.26 0.04 248 / 0.5)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex h-9 w-9 items-center justify-center rounded-xl",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.62 0.22 260), oklch(0.5 0.2 270))",
                      boxShadow: "0 0 18px oklch(0.62 0.22 260 / 0.45)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm font-bold text-white", children: "₹" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-display text-base font-bold tracking-tight",
                      style: {
                        color: "oklch(0.94 0.01 245)",
                        textShadow: "0 0 20px oklch(0.62 0.22 260 / 0.5)"
                      },
                      children: "Credit Bridge"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-[10px] font-medium tracking-widest uppercase",
                      style: { color: "oklch(0.62 0.22 260)" },
                      children: "Finance OS"
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 space-y-0.5 px-3 py-4", children: allNavItems.map(({ to, icon: Icon, ocid }, index) => {
            const isActive = currentPath.startsWith(to);
            const isAdminLink = to === "/admin";
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, x: -12 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: index * 0.06, duration: 0.25 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to,
                    "data-ocid": ocid,
                    className: cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 relative",
                      isActive ? "text-white" : "hover:text-white"
                    ),
                    style: isActive ? {
                      background: isAdminLink ? "linear-gradient(135deg, oklch(0.65 0.18 85 / 0.25), oklch(0.55 0.15 80 / 0.15))" : "linear-gradient(135deg, oklch(0.62 0.22 260 / 0.2), oklch(0.5 0.2 270 / 0.12))",
                      borderLeft: isAdminLink ? "3px solid oklch(0.7 0.18 85)" : "3px solid oklch(0.62 0.22 260)",
                      boxShadow: isAdminLink ? "inset 0 0 20px oklch(0.65 0.18 85 / 0.1)" : "inset 0 0 20px oklch(0.62 0.22 260 / 0.08)",
                      color: isAdminLink ? "oklch(0.85 0.14 85)" : "oklch(0.88 0.12 260)"
                    } : {
                      color: isAdminLink ? "oklch(0.65 0.12 85)" : "oklch(0.58 0.012 245)",
                      borderLeft: "3px solid transparent"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 17 }),
                      navLabel(
                        allNavItems.find((n) => n.to === to) ?? allNavItems[0]
                      )
                    ]
                  }
                )
              },
              to
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "border-t p-3 space-y-0.5",
              style: { borderColor: "oklch(0.26 0.04 248 / 0.5)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": "sidebar.language_toggle",
                    className: "flex gap-1 rounded-xl p-1",
                    style: { background: "oklch(0.10 0.02 248 / 0.8)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setLanguage("en"),
                          "data-ocid": "sidebar.language_en_button",
                          className: "flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-semibold transition-all duration-200",
                          style: !isHindi ? {
                            background: "linear-gradient(135deg, oklch(0.62 0.22 260 / 0.25), oklch(0.5 0.2 270 / 0.2))",
                            color: "oklch(0.82 0.16 260)",
                            boxShadow: "0 0 10px oklch(0.62 0.22 260 / 0.2)"
                          } : { color: "oklch(0.48 0.01 245)" },
                          children: "🇬🇧 EN"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setLanguage("hi"),
                          "data-ocid": "sidebar.language_hi_button",
                          className: "flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-semibold transition-all duration-200",
                          style: isHindi ? {
                            background: "linear-gradient(135deg, oklch(0.62 0.22 260 / 0.25), oklch(0.5 0.2 270 / 0.2))",
                            color: "oklch(0.82 0.16 260)",
                            boxShadow: "0 0 10px oklch(0.62 0.22 260 / 0.2)"
                          } : { color: "oklch(0.48 0.01 245)" },
                          children: "🇮🇳 HI"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: toggleTheme,
                    "data-ocid": "sidebar.theme_toggle",
                    className: "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    style: { color: "oklch(0.45 0.04 245)" },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.color = "oklch(0.50 0.18 195)";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.color = "oklch(0.45 0.04 245)";
                    },
                    children: [
                      isDark ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { size: 17 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { size: 17 }),
                      isDark ? isHindi ? "लाइट मोड" : "Light mode" : isHindi ? "डार्क मोड" : "Dark mode"
                    ]
                  }
                ),
                loginStatus === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => clear(),
                    "data-ocid": "sidebar.logout_button",
                    className: "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-destructive/10 hover:text-destructive",
                    style: { color: "oklch(0.45 0.04 245)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 17 }),
                      isHindi ? "लॉगआउट" : "Logout"
                    ]
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col md:pl-64", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "header",
        {
          className: "sticky top-0 z-30 flex h-14 items-center justify-between border-b px-4 shadow-sm md:hidden",
          style: {
            background: "linear-gradient(90deg, oklch(0.14 0.03 248), oklch(0.12 0.025 248))",
            borderColor: "oklch(0.26 0.04 248 / 0.6)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex h-7 w-7 items-center justify-center rounded-lg",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.62 0.22 260), oklch(0.5 0.2 270))",
                    boxShadow: "0 0 12px oklch(0.62 0.22 260 / 0.4)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xs font-bold text-white", children: "₹" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-display text-base font-bold",
                  style: {
                    color: "oklch(0.94 0.01 245)",
                    textShadow: "0 0 16px oklch(0.62 0.22 260 / 0.45)"
                  },
                  children: title ?? "Credit Bridge"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "header.language_toggle",
                  className: "flex gap-0.5 rounded-lg p-0.5",
                  style: {
                    background: "oklch(0.10 0.02 248 / 0.9)",
                    border: "1px solid oklch(0.62 0.22 260 / 0.2)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setLanguage("en"),
                        "data-ocid": "header.language_en_button",
                        "aria-label": "Switch to English",
                        className: "rounded px-2 py-1 text-xs font-bold transition-all duration-200",
                        style: !isHindi ? {
                          background: "oklch(0.62 0.22 260 / 0.3)",
                          color: "oklch(0.88 0.14 260)"
                        } : { color: "oklch(0.48 0.01 245)" },
                        children: "EN"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setLanguage("hi"),
                        "data-ocid": "header.language_hi_button",
                        "aria-label": "हिंदी में बदलें",
                        className: "rounded px-2 py-1 text-xs font-bold transition-all duration-200",
                        style: isHindi ? {
                          background: "oklch(0.62 0.22 260 / 0.3)",
                          color: "oklch(0.88 0.14 260)"
                        } : { color: "oklch(0.48 0.01 245)" },
                        children: "HI"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  type: "button",
                  onClick: toggleTheme,
                  "aria-label": "Toggle theme",
                  "data-ocid": "header.theme_toggle",
                  className: "text-muted-foreground",
                  children: isDark ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { size: 16 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  type: "button",
                  onClick: () => setMobileMenuOpen((v) => !v),
                  "aria-label": "Toggle menu",
                  "data-ocid": "header.menu_toggle",
                  className: "text-muted-foreground",
                  children: mobileMenuOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 18 })
                }
              )
            ] })
          ]
        }
      ),
      mobileMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: -8 },
          animate: { opacity: 1, y: 0 },
          className: "absolute inset-x-0 top-14 z-30 border-b px-4 py-3 shadow-xl md:hidden",
          style: {
            background: "oklch(0.14 0.03 248 / 0.98)",
            borderColor: "oklch(0.26 0.04 248 / 0.6)",
            backdropFilter: "blur(16px)"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "space-y-0.5", children: [
            allNavItems.map(({ to, icon: Icon, ocid }) => {
              const item = allNavItems.find((n) => n.to === to) ?? allNavItems[0];
              const isActive = currentPath.startsWith(to);
              const isAdminLink = to === "/admin";
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to,
                  "data-ocid": ocid,
                  onClick: () => setMobileMenuOpen(false),
                  className: "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  style: isActive ? {
                    background: isAdminLink ? "oklch(0.65 0.18 85 / 0.2)" : "oklch(0.62 0.22 260 / 0.15)",
                    color: isAdminLink ? "oklch(0.8 0.14 85)" : "oklch(0.78 0.16 260)"
                  } : {
                    color: isAdminLink ? "oklch(0.65 0.12 85)" : "oklch(0.58 0.012 245)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18 }),
                    navLabel(item)
                  ]
                },
                to
              );
            }),
            loginStatus === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  clear();
                  setMobileMenuOpen(false);
                },
                "data-ocid": "mobile_menu.logout_button",
                className: "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all hover:bg-destructive/10 hover:text-destructive",
                style: { color: "oklch(0.58 0.012 245)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 18 }),
                  isHindi ? "लॉगआउट" : "Logout"
                ]
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "main",
        {
          className: "flex-1 w-full max-w-full overflow-x-hidden px-4 py-5 md:px-6 md:py-6",
          style: { paddingBottom: "env(safe-area-inset-bottom, 0px)" },
          children
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "nav",
        {
          className: "fixed bottom-0 inset-x-0 z-30 border-t md:hidden",
          style: {
            background: "linear-gradient(0deg, oklch(0.13 0.03 248 / 0.98), oklch(0.14 0.025 248 / 0.95))",
            borderColor: "oklch(0.26 0.04 248 / 0.6)",
            backdropFilter: "blur(20px)"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex", children: allNavItems.map(({ to, icon: Icon, ocid }) => {
            const item = allNavItems.find((n) => n.to === to) ?? allNavItems[0];
            const isActive = currentPath.startsWith(to);
            const isAdminLink = to === "/admin";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to,
                "data-ocid": ocid,
                className: "flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium transition-all duration-200",
                style: {
                  color: isActive ? isAdminLink ? "oklch(0.75 0.16 85)" : "oklch(0.72 0.2 260)" : isAdminLink ? "oklch(0.55 0.08 85)" : "oklch(0.48 0.01 245)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "relative",
                      style: {
                        filter: isActive ? isAdminLink ? "drop-shadow(0 0 6px oklch(0.65 0.18 85 / 0.7))" : "drop-shadow(0 0 6px oklch(0.62 0.22 260 / 0.7))" : void 0
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 20 }),
                        isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            layoutId: "bottom-nav-indicator",
                            className: "absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full",
                            style: {
                              background: isAdminLink ? "oklch(0.65 0.18 85)" : "oklch(0.62 0.22 260)"
                            }
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: navLabel(item) })
                ]
              },
              to
            );
          }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InstallPrompt, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "hidden border-t border-border bg-muted/40 py-3 text-center md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        ". Powered by FiFO BRIDGE"
      ] }) })
    ] })
  ] });
}
export {
  Layout as L,
  Moon as M,
  Sun as S,
  useTheme as u
};
