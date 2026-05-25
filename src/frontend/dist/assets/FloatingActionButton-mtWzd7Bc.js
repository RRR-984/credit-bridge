import { f as createLucideIcon, r as reactExports, a as useNavigate, b as useAppContext, j as jsxRuntimeExports, A as AnimatePresence, o as motion } from "./index-BOlz_vt-.js";
import { U as UserPlus } from "./user-plus-DQVGmE4d.js";
import { A as ArrowDownLeft, a as ArrowUpRight } from "./arrow-up-right-COfzHNXt.js";
import { X } from "./x-BeJ_vxcM.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode);
function FloatingActionButton() {
  const [open, setOpen] = reactExports.useState(false);
  const navigate = useNavigate();
  const { t } = useAppContext();
  const containerRef = reactExports.useRef(null);
  const actions = [
    {
      label: t("addCustomer"),
      icon: UserPlus,
      ocid: "fab.add_customer_button",
      colorClass: "bg-secondary/80 border-border hover:bg-primary/20 hover:border-primary/60 text-foreground",
      onClick: () => {
        setOpen(false);
        navigate({ to: "/customers" });
      }
    },
    {
      label: t("addCollection"),
      icon: ArrowDownLeft,
      ocid: "fab.add_collection_button",
      colorClass: "bg-secondary/80 border-border hover:bg-accent/20 hover:border-accent/60 text-accent",
      onClick: () => {
        setOpen(false);
        navigate({ to: "/jama/new" });
      }
    },
    {
      label: t("addCredit"),
      icon: ArrowUpRight,
      ocid: "fab.add_credit_button",
      colorClass: "bg-secondary/80 border-border hover:bg-destructive/20 hover:border-destructive/60 text-destructive",
      onClick: () => {
        setOpen(false);
        navigate({ to: "/udhar/new" });
      }
    }
  ];
  reactExports.useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  reactExports.useEffect(() => {
    if (!open) return;
    function onPointer(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
        className: "fixed inset-0 z-40 bg-background/60 backdrop-blur-sm",
        onClick: () => setOpen(false),
        "aria-hidden": "true"
      },
      "fab-backdrop"
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: containerRef,
        className: "fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && actions.map((action, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              type: "button",
              "data-ocid": action.ocid,
              initial: { opacity: 0, y: 20, scale: 0.85 },
              animate: { opacity: 1, y: 0, scale: 1 },
              exit: { opacity: 0, y: 16, scale: 0.85 },
              transition: {
                duration: 0.22,
                delay: open ? (actions.length - 1 - i) * 0.06 : i * 0.04,
                ease: "easeOut"
              },
              onClick: action.onClick,
              className: [
                "flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-semibold",
                "shadow-lg backdrop-blur-md transition-colors duration-150",
                action.colorClass
              ].join(" "),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(action.icon, { size: 16 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: action.label })
              ]
            },
            action.ocid
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              type: "button",
              "data-ocid": "fab.toggle_button",
              onClick: () => setOpen((v) => !v),
              animate: { rotate: open ? 135 : 0 },
              transition: { duration: 0.25, ease: "easeInOut" },
              className: [
                "flex h-14 w-14 items-center justify-center rounded-full shadow-xl",
                "border border-primary/60 bg-primary text-primary-foreground",
                "glow-blue transition-shadow duration-200",
                "hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              ].join(" "),
              "aria-label": open ? "Close actions" : "Open quick actions",
              "aria-expanded": open,
              children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 22, strokeWidth: 2.5 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 24, strokeWidth: 2.5 })
            }
          )
        ]
      }
    )
  ] });
}
export {
  FloatingActionButton as F,
  Plus as P
};
