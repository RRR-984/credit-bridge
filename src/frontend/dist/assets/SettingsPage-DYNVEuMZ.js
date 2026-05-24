import { e as createLucideIcon, s as useGetProfile, v as useUpdateProfile, b as useAppContext, r as reactExports, w as COUNTRIES, j as jsxRuntimeExports, n as motion, x as usePWAInstall, D as Download, S as Smartphone } from "./index-ac2W1xmb.js";
import { F as FloatingActionButton } from "./FloatingActionButton-DzZSvdON.js";
import { u as useTheme, L as Layout, S as Sun, M as Moon } from "./Layout-6jInawvU.js";
import { B as Button } from "./button-VwdXeUZz.js";
import { I as Input } from "./input-DQr0BIeD.js";
import { L as Label } from "./label-CYOH15mI.js";
import { u as ue } from "./index-D8FpD-hq.js";
import { L as LoaderCircle } from "./loader-circle-ESLee9Yt.js";
import { B as Building2 } from "./building-2-CTcEekTG.js";
import "./arrow-up-right-m25OCOyE.js";
import "./x-Bv973hmb.js";
import "./users-YniusYf_.js";
import "./settings-DushNHAJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
];
const Cloud = createLucideIcon("cloud", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode);
function SectionCard({
  icon,
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-5 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-semibold text-foreground", children: title })
    ] }),
    children
  ] });
}
function AppInstallSection() {
  const { canInstall, isIOS, isInstalled, promptInstall } = usePWAInstall();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { size: 18 }), title: "App Installation", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: isInstalled ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "settings.app_installed_badge",
      className: "flex items-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 16 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Installed as App" })
      ]
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    (canInstall || isIOS) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: isIOS ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "settings.ios_install_instructions",
        className: "rounded-lg bg-muted/40 px-4 py-3 text-sm text-muted-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mb-1", children: "Install on iPhone / iPad" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "list-decimal list-inside space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Tap the Share button ⬆ in Safari" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: 'Scroll down and tap "Add to Home Screen"' }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: 'Tap "Add" in the top right' })
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: promptInstall,
        "data-ocid": "settings.install_app_button",
        className: "flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all duration-200",
        style: {
          background: "linear-gradient(135deg, oklch(0.68 0.18 195), oklch(0.58 0.22 200))"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 15 }),
          "Install Credit Bridge"
        ]
      }
    ) }),
    !canInstall && !isIOS && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your browser supports installing this app. Look for the install icon in the address bar or browser menu." })
  ] }) }) });
}
function SettingsPage() {
  const { data: profile, isLoading } = useGetProfile();
  const updateProfile = useUpdateProfile();
  const { theme, setTheme } = useTheme();
  const { selectedCountry, language, setCountry, setLanguage, t } = useAppContext();
  const [businessName, setBusinessName] = reactExports.useState("");
  const [mobileNumber, setMobileNumber] = reactExports.useState("");
  const [countryCode, setCountryCode] = reactExports.useState(selectedCountry.code);
  reactExports.useEffect(() => {
    if (profile) {
      setBusinessName(profile.businessName ?? "");
      setMobileNumber(profile.mobileNumber ?? "");
      if (profile.country) setCountryCode(profile.country);
    }
  }, [profile]);
  const resolvedCountry = COUNTRIES.find((c) => c.code === countryCode) ?? selectedCountry;
  async function handleSave() {
    const updatedProfile = {
      businessName,
      mobileNumber,
      country: resolvedCountry.code,
      currency: resolvedCountry.currency.code,
      timezone: resolvedCountry.timezone,
      dateFormat: resolvedCountry.dateFormat,
      language
    };
    try {
      await updateProfile.mutateAsync(updatedProfile);
      setCountry(resolvedCountry);
      ue.success(`${t("saveSettings")} ✓`, {
        description: "Your profile and preferences have been updated."
      });
    } catch {
      ue.error("Failed to save settings", {
        description: "Please try again."
      });
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { title: t("settings"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex min-h-[40vh] items-center justify-center",
        "data-ocid": "settings.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" })
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { title: t("settings"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl space-y-6 pb-24 md:pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: t("settings") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Manage your business profile and preferences." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: 0.05 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 18 }),
              title: t("businessProfile"),
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "businessName", children: t("businessName") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "businessName",
                      value: businessName,
                      onChange: (e) => setBusinessName(e.target.value),
                      placeholder: "e.g. Sharma General Store",
                      "data-ocid": "settings.business_name_input",
                      className: "bg-input/60"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "mobileNumber", children: t("mobileNumber") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "mobileNumber",
                      type: "tel",
                      value: mobileNumber,
                      onChange: (e) => setMobileNumber(e.target.value),
                      placeholder: "Enter mobile number",
                      "data-ocid": "settings.mobile_number_input",
                      className: "bg-input/60"
                    }
                  )
                ] })
              ] })
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 18 }), title: t("regionalSettings"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "country", children: t("country") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    id: "country",
                    value: countryCode,
                    onChange: (e) => setCountryCode(e.target.value),
                    "data-ocid": "settings.country_select",
                    className: "w-full appearance-none rounded-md border border-input bg-input/60 px-3 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
                    children: COUNTRIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: c.code, children: [
                      c.flag,
                      " ",
                      c.name,
                      " (",
                      c.dialCode,
                      ")"
                    ] }, c.code))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-muted-foreground", children: "▾" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("currency") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "settings.currency_display",
                  className: "flex items-center gap-2 rounded-md border border-border/60 bg-muted/40 px-3 py-2 text-sm text-muted-foreground",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: resolvedCountry.currency.symbol }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: resolvedCountry.currency.code }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs opacity-60", children: language === "en" ? "Auto-set by country" : "देश के अनुसार" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("language") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex gap-2",
                  "data-ocid": "settings.language_toggle",
                  "aria-label": "Language selection",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setLanguage("en"),
                        "data-ocid": "settings.language_en_button",
                        className: `flex-1 rounded-md border px-3 py-2 text-sm font-medium transition-smooth ${language === "en" ? "border-primary bg-primary/15 text-primary" : "border-border bg-input/60 text-muted-foreground hover:text-foreground"}`,
                        children: "🇬🇧 English"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setLanguage("hi"),
                        "data-ocid": "settings.language_hi_button",
                        className: `flex-1 rounded-md border px-3 py-2 text-sm font-medium transition-smooth ${language === "hi" ? "border-primary bg-primary/15 text-primary" : "border-border bg-input/60 text-muted-foreground hover:text-foreground"}`,
                        children: "🇮🇳 हिंदी"
                      }
                    )
                  ]
                }
              )
            ] })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: 0.15 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionCard,
            {
              icon: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { size: 18 }),
              title: t("preferences"),
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("theme") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex gap-2",
                    "data-ocid": "settings.theme_toggle",
                    "aria-label": "Theme selection",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setTheme("light"),
                          "data-ocid": "settings.theme_light_button",
                          className: `flex flex-1 items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-smooth ${theme === "light" ? "border-primary bg-primary/15 text-primary" : "border-border bg-input/60 text-muted-foreground hover:text-foreground"}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { size: 15 }),
                            " ",
                            t("lightMode")
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setTheme("dark"),
                          "data-ocid": "settings.theme_dark_button",
                          className: `flex flex-1 items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-smooth ${theme === "dark" ? "border-primary bg-primary/15 text-primary" : "border-border bg-input/60 text-muted-foreground hover:text-foreground"}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { size: 15 }),
                            " ",
                            t("darkMode")
                          ]
                        }
                      )
                    ]
                  }
                )
              ] })
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: 0.18 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppInstallSection, {})
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: 0.22 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Cloud, { size: 18 }), title: t("backupSync"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "settings.backup_section",
              className: "flex items-start gap-3 rounded-lg bg-muted/40 px-4 py-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Cloud,
                  {
                    size: 18,
                    className: "mt-0.5 shrink-0 text-muted-foreground"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: t("cloudSync") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: t("cloudSyncSoon") })
                ] })
              ]
            }
          ) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: 0.25 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: handleSave,
              disabled: updateProfile.isPending,
              "data-ocid": "settings.save_button",
              className: "w-full gap-2 font-semibold",
              size: "lg",
              children: [
                updateProfile.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 17, className: "animate-spin" }) : updateProfile.isSuccess ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 17 }) : null,
                updateProfile.isPending ? t("loading").replace("...", "…") : t("saveSettings")
              ]
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingActionButton, {})
  ] });
}
export {
  SettingsPage as default
};
