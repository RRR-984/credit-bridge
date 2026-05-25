import { f as createLucideIcon, b as useAppContext, a as useNavigate, I as useInternetIdentity, J as useSetAdminPrincipal, j as jsxRuntimeExports } from "./index-BOlz_vt-.js";
import { B as Button } from "./button-C2O8Pd5v.js";
import { u as ue } from "./index-DZsTT9Vr.js";
import { L as Lock } from "./lock-DbWmYmc6.js";
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
function AdminSetupPage() {
  const { t } = useAppContext();
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const mutation = useSetAdminPrincipal();
  const handleSetAdmin = async () => {
    if (!identity) {
      ue.error(t("failedToLoad"));
      return;
    }
    try {
      await mutation.mutateAsync(identity.getPrincipal());
      ue.success("Admin set successfully");
      navigate({ to: "/admin" });
    } catch {
      ue.error(t("failedToLoad"));
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "admin.setup.card",
      className: "glass-card w-full max-w-md p-8 text-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-8 w-8 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground font-display sm:text-2xl", children: t("adminSetupTitle") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: t("adminSetupDesc") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "admin.setup.set_button",
            type: "button",
            className: "mt-6 w-full glow-blue",
            size: "lg",
            onClick: handleSetAdmin,
            disabled: mutation.isPending || !identity,
            children: mutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" }),
              t("loading")
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 18 }),
              t("setAsAdmin")
            ] })
          }
        )
      ]
    }
  ) });
}
export {
  AdminSetupPage as default
};
