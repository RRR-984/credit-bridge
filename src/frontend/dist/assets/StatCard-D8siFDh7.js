import { j as jsxRuntimeExports } from "./index-BOlz_vt-.js";
import { c as cn } from "./button-C2O8Pd5v.js";
function StatCard({
  label,
  value,
  change,
  changePositive,
  icon: Icon,
  iconClassName,
  className,
  subLabel,
  valueClassName,
  badge,
  "data-ocid": dataOcid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-ocid": dataOcid,
      className: cn(
        "relative overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md",
        className
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs font-medium uppercase tracking-wide text-muted-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: cn(
                  "truncate text-2xl font-bold text-foreground font-display",
                  valueClassName
                ),
                children: value
              }
            ),
            badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground", children: badge })
          ] }),
          subLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: subLabel }),
          change && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: cn(
                "mt-1 text-xs font-medium",
                changePositive ? "text-green-500" : "text-destructive"
              ),
              children: change
            }
          )
        ] }),
        Icon && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg",
              iconClassName ?? "bg-primary/10 text-primary"
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 20 })
          }
        )
      ] })
    }
  );
}
export {
  StatCard as S
};
