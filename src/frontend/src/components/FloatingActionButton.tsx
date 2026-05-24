import { useAppContext } from "@/context/AppContext";
import { useNavigate } from "@tanstack/react-router";
import { ArrowDownLeft, ArrowUpRight, Plus, UserPlus, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Action {
  label: string;
  icon: React.ElementType;
  ocid: string;
  colorClass: string;
  onClick: () => void;
}

export function FloatingActionButton() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useAppContext();
  const containerRef = useRef<HTMLDivElement>(null);

  const actions: Action[] = [
    {
      label: t("addCustomer"),
      icon: UserPlus,
      ocid: "fab.add_customer_button",
      colorClass:
        "bg-secondary/80 border-border hover:bg-primary/20 hover:border-primary/60 text-foreground",
      onClick: () => {
        setOpen(false);
        navigate({ to: "/customers" });
      },
    },
    {
      label: t("addCollection"),
      icon: ArrowDownLeft,
      ocid: "fab.add_collection_button",
      colorClass:
        "bg-secondary/80 border-border hover:bg-accent/20 hover:border-accent/60 text-accent",
      onClick: () => {
        setOpen(false);
        navigate({ to: "/jama/new" });
      },
    },
    {
      label: t("addCredit"),
      icon: ArrowUpRight,
      ocid: "fab.add_credit_button",
      colorClass:
        "bg-secondary/80 border-border hover:bg-destructive/20 hover:border-destructive/60 text-destructive",
      onClick: () => {
        setOpen(false);
        navigate({ to: "/udhar/new" });
      },
    },
  ];

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onPointer(e: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="fab-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* FAB container */}
      <div
        ref={containerRef}
        className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3"
      >
        {/* Action buttons */}
        <AnimatePresence>
          {open &&
            actions.map((action, i) => (
              <motion.button
                key={action.ocid}
                type="button"
                data-ocid={action.ocid}
                initial={{ opacity: 0, y: 20, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.85 }}
                transition={{
                  duration: 0.22,
                  delay: open ? (actions.length - 1 - i) * 0.06 : i * 0.04,
                  ease: "easeOut",
                }}
                onClick={action.onClick}
                className={[
                  "flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-semibold",
                  "shadow-lg backdrop-blur-md transition-colors duration-150",
                  action.colorClass,
                ].join(" ")}
              >
                <action.icon size={16} />
                <span>{action.label}</span>
              </motion.button>
            ))}
        </AnimatePresence>

        {/* Main + / X button */}
        <motion.button
          type="button"
          data-ocid="fab.toggle_button"
          onClick={() => setOpen((v) => !v)}
          animate={{ rotate: open ? 135 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={[
            "flex h-14 w-14 items-center justify-center rounded-full shadow-xl",
            "border border-primary/60 bg-primary text-primary-foreground",
            "glow-blue transition-shadow duration-200",
            "hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          ].join(" ")}
          aria-label={open ? "Close actions" : "Open quick actions"}
          aria-expanded={open}
        >
          {open ? (
            <X size={22} strokeWidth={2.5} />
          ) : (
            <Plus size={24} strokeWidth={2.5} />
          )}
        </motion.button>
      </div>
    </>
  );
}
