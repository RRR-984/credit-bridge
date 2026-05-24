import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Clock,
  LayoutDashboard,
  List,
  LogOut,
  Menu,
  Moon,
  Settings,
  Shield,
  Sun,
  UserCircle,
  Users,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { type ReactNode, useState } from "react";
import { useOwnerGetPendingPaymentRequests } from "../hooks/useBackend";
import { InstallPrompt } from "./InstallPrompt";

const NAV_ITEMS = [
  {
    to: "/dashboard",
    label: "Dashboard",
    labelHi: "डैशबोर्ड",
    icon: LayoutDashboard,
    ocid: "nav.dashboard_link",
  },
  {
    to: "/customers",
    label: "Customers",
    labelHi: "ग्राहक",
    icon: Users,
    ocid: "nav.customers_link",
  },
  {
    to: "/transactions",
    label: "Transactions",
    labelHi: "लेनदेन",
    icon: List,
    ocid: "nav.transactions_link",
  },
  {
    to: "/settings",
    label: "Settings",
    labelHi: "सेटिंग्स",
    icon: Settings,
    ocid: "nav.settings_link",
  },
  {
    to: "/customer-portal",
    label: "Customer Portal",
    labelHi: "ग्राहक पोर्टल",
    icon: UserCircle,
    ocid: "nav.customer_portal_link",
  },
  {
    to: "/pending-approvals",
    label: "Pending Approvals",
    labelHi: "लंबित अनुमोदन",
    icon: Clock,
    ocid: "nav.pending_approvals_link",
  },
];

const ADMIN_NAV_ITEM = {
  to: "/admin",
  label: "Admin Panel",
  labelHi: "एडमिन पैनल",
  icon: Shield,
  ocid: "nav.admin_link",
};

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const { clear, loginStatus } = useInternetIdentity();
  const { toggleTheme, isDark } = useTheme();
  const { language, setLanguage, isAdmin } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const { data: pendingRequests } = useOwnerGetPendingPaymentRequests();

  const isHindi = language === "hi";
  const navLabel = (item: (typeof NAV_ITEMS)[0]) =>
    isHindi ? item.labelHi : item.label;

  const allNavItems = isAdmin ? [...NAV_ITEMS, ADMIN_NAV_ITEM] : NAV_ITEMS;

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r md:flex"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.14 0.03 248) 0%, oklch(0.11 0.025 248) 100%)",
          borderColor: "oklch(0.26 0.04 248 / 0.6)",
        }}
      >
        {/* Logo */}
        <div
          className="flex h-16 items-center gap-3 px-5 border-b"
          style={{ borderColor: "oklch(0.26 0.04 248 / 0.5)" }}
        >
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.62 0.22 260), oklch(0.5 0.2 270))",
              boxShadow: "0 0 18px oklch(0.62 0.22 260 / 0.45)",
            }}
          >
            <span className="font-display text-sm font-bold text-white">₹</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span
              className="font-display text-base font-bold tracking-tight"
              style={{
                color: "oklch(0.94 0.01 245)",
                textShadow: "0 0 20px oklch(0.62 0.22 260 / 0.5)",
              }}
            >
              Credit Bridge
            </span>
            <span
              className="text-[10px] font-medium tracking-widest uppercase"
              style={{ color: "oklch(0.62 0.22 260)" }}
            >
              Finance OS
            </span>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 space-y-0.5 px-3 py-4">
          {allNavItems.map(({ to, icon: Icon, ocid }, index) => {
            const isActive = currentPath.startsWith(to);
            const isAdminLink = to === "/admin";
            return (
              <motion.div
                key={to}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06, duration: 0.25 }}
              >
                <Link
                  to={to}
                  data-ocid={ocid}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 relative",
                    isActive ? "text-white" : "hover:text-white",
                  )}
                  style={
                    isActive
                      ? {
                          background: isAdminLink
                            ? "linear-gradient(135deg, oklch(0.65 0.18 85 / 0.25), oklch(0.55 0.15 80 / 0.15))"
                            : "linear-gradient(135deg, oklch(0.62 0.22 260 / 0.2), oklch(0.5 0.2 270 / 0.12))",
                          borderLeft: isAdminLink
                            ? "3px solid oklch(0.7 0.18 85)"
                            : "3px solid oklch(0.62 0.22 260)",
                          boxShadow: isAdminLink
                            ? "inset 0 0 20px oklch(0.65 0.18 85 / 0.1)"
                            : "inset 0 0 20px oklch(0.62 0.22 260 / 0.08)",
                          color: isAdminLink
                            ? "oklch(0.85 0.14 85)"
                            : "oklch(0.88 0.12 260)",
                        }
                      : {
                          color: isAdminLink
                            ? "oklch(0.65 0.12 85)"
                            : "oklch(0.58 0.012 245)",
                          borderLeft: "3px solid transparent",
                        }
                  }
                >
                  <Icon size={17} />
                  {navLabel(
                    allNavItems.find((n) => n.to === to) ?? allNavItems[0],
                  )}
                  {to === "/pending-approvals" &&
                    pendingRequests &&
                    pendingRequests.length > 0 && (
                      <span className="ml-auto bg-amber-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                        {pendingRequests.length}
                      </span>
                    )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div
          className="border-t p-3 space-y-0.5"
          style={{ borderColor: "oklch(0.26 0.04 248 / 0.5)" }}
        >
          {/* Language toggle — two explicit tab buttons */}
          <div
            data-ocid="sidebar.language_toggle"
            className="flex gap-1 rounded-xl p-1"
            style={{ background: "oklch(0.10 0.02 248 / 0.8)" }}
          >
            <button
              type="button"
              onClick={() => setLanguage("en")}
              data-ocid="sidebar.language_en_button"
              className="flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-semibold transition-all duration-200"
              style={
                !isHindi
                  ? {
                      background:
                        "linear-gradient(135deg, oklch(0.62 0.22 260 / 0.25), oklch(0.5 0.2 270 / 0.2))",
                      color: "oklch(0.82 0.16 260)",
                      boxShadow: "0 0 10px oklch(0.62 0.22 260 / 0.2)",
                    }
                  : { color: "oklch(0.48 0.01 245)" }
              }
            >
              🇬🇧 EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("hi")}
              data-ocid="sidebar.language_hi_button"
              className="flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-semibold transition-all duration-200"
              style={
                isHindi
                  ? {
                      background:
                        "linear-gradient(135deg, oklch(0.62 0.22 260 / 0.25), oklch(0.5 0.2 270 / 0.2))",
                      color: "oklch(0.82 0.16 260)",
                      boxShadow: "0 0 10px oklch(0.62 0.22 260 / 0.2)",
                    }
                  : { color: "oklch(0.48 0.01 245)" }
              }
            >
              🇮🇳 HI
            </button>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            data-ocid="sidebar.theme_toggle"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200"
            style={{ color: "oklch(0.45 0.04 245)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "oklch(0.50 0.18 195)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "oklch(0.45 0.04 245)";
            }}
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
            {isDark
              ? isHindi
                ? "लाइट मोड"
                : "Light mode"
              : isHindi
                ? "डार्क मोड"
                : "Dark mode"}
          </button>
          {loginStatus === "success" && (
            <button
              type="button"
              onClick={() => clear()}
              data-ocid="sidebar.logout_button"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-destructive/10 hover:text-destructive"
              style={{ color: "oklch(0.45 0.04 245)" }}
            >
              <LogOut size={17} />
              {isHindi ? "लॉगआउट" : "Logout"}
            </button>
          )}
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex flex-1 flex-col md:pl-64">
        {/* Mobile header */}
        <header
          className="sticky top-0 z-30 flex h-14 items-center justify-between border-b px-4 shadow-sm md:hidden"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.14 0.03 248), oklch(0.12 0.025 248))",
            borderColor: "oklch(0.26 0.04 248 / 0.6)",
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.62 0.22 260), oklch(0.5 0.2 270))",
                boxShadow: "0 0 12px oklch(0.62 0.22 260 / 0.4)",
              }}
            >
              <span className="font-display text-xs font-bold text-white">
                ₹
              </span>
            </div>
            <span
              className="font-display text-base font-bold"
              style={{
                color: "oklch(0.94 0.01 245)",
                textShadow: "0 0 16px oklch(0.62 0.22 260 / 0.45)",
              }}
            >
              {title ?? "Credit Bridge"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {/* Language toggle — mobile header: two explicit tabs */}
            <div
              data-ocid="header.language_toggle"
              className="flex gap-0.5 rounded-lg p-0.5"
              style={{
                background: "oklch(0.10 0.02 248 / 0.9)",
                border: "1px solid oklch(0.62 0.22 260 / 0.2)",
              }}
            >
              <button
                type="button"
                onClick={() => setLanguage("en")}
                data-ocid="header.language_en_button"
                aria-label="Switch to English"
                className="rounded px-2 py-1 text-xs font-bold transition-all duration-200"
                style={
                  !isHindi
                    ? {
                        background: "oklch(0.62 0.22 260 / 0.3)",
                        color: "oklch(0.88 0.14 260)",
                      }
                    : { color: "oklch(0.48 0.01 245)" }
                }
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("hi")}
                data-ocid="header.language_hi_button"
                aria-label="हिंदी में बदलें"
                className="rounded px-2 py-1 text-xs font-bold transition-all duration-200"
                style={
                  isHindi
                    ? {
                        background: "oklch(0.62 0.22 260 / 0.3)",
                        color: "oklch(0.88 0.14 260)",
                      }
                    : { color: "oklch(0.48 0.01 245)" }
                }
              >
                HI
              </button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              data-ocid="header.theme_toggle"
              className="text-muted-foreground"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              data-ocid="header.menu_toggle"
              className="text-muted-foreground"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>
        </header>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-x-0 top-14 z-30 border-b px-4 py-3 shadow-xl md:hidden"
            style={{
              background: "oklch(0.14 0.03 248 / 0.98)",
              borderColor: "oklch(0.26 0.04 248 / 0.6)",
              backdropFilter: "blur(16px)",
            }}
          >
            <nav className="space-y-0.5">
              {allNavItems.map(({ to, icon: Icon, ocid }) => {
                const item =
                  allNavItems.find((n) => n.to === to) ?? allNavItems[0];
                const isActive = currentPath.startsWith(to);
                const isAdminLink = to === "/admin";
                return (
                  <Link
                    key={to}
                    to={to}
                    data-ocid={ocid}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all"
                    style={
                      isActive
                        ? {
                            background: isAdminLink
                              ? "oklch(0.65 0.18 85 / 0.2)"
                              : "oklch(0.62 0.22 260 / 0.15)",
                            color: isAdminLink
                              ? "oklch(0.8 0.14 85)"
                              : "oklch(0.78 0.16 260)",
                          }
                        : {
                            color: isAdminLink
                              ? "oklch(0.65 0.12 85)"
                              : "oklch(0.58 0.012 245)",
                          }
                    }
                  >
                    <Icon size={18} />
                    {navLabel(item)}
                    {to === "/pending-approvals" &&
                      pendingRequests &&
                      pendingRequests.length > 0 && (
                        <span className="ml-auto bg-amber-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                          {pendingRequests.length}
                        </span>
                      )}
                  </Link>
                );
              })}
              {loginStatus === "success" && (
                <button
                  type="button"
                  onClick={() => {
                    clear();
                    setMobileMenuOpen(false);
                  }}
                  data-ocid="mobile_menu.logout_button"
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all hover:bg-destructive/10 hover:text-destructive"
                  style={{ color: "oklch(0.58 0.012 245)" }}
                >
                  <LogOut size={18} />
                  {isHindi ? "लॉगआउट" : "Logout"}
                </button>
              )}
            </nav>
          </motion.div>
        )}

        {/* Page content */}
        <main
          className="flex-1 w-full max-w-full overflow-x-hidden px-4 py-5 md:px-6 md:py-6"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          {children}
        </main>

        {/* Mobile bottom nav */}
        <nav
          className="fixed bottom-0 inset-x-0 z-30 border-t md:hidden"
          style={{
            background:
              "linear-gradient(0deg, oklch(0.13 0.03 248 / 0.98), oklch(0.14 0.025 248 / 0.95))",
            borderColor: "oklch(0.26 0.04 248 / 0.6)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="flex">
            {allNavItems.map(({ to, icon: Icon, ocid }) => {
              const item =
                allNavItems.find((n) => n.to === to) ?? allNavItems[0];
              const isActive = currentPath.startsWith(to);
              const isAdminLink = to === "/admin";
              return (
                <Link
                  key={to}
                  to={to}
                  data-ocid={ocid}
                  className="flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium transition-all duration-200"
                  style={{
                    color: isActive
                      ? isAdminLink
                        ? "oklch(0.75 0.16 85)"
                        : "oklch(0.72 0.2 260)"
                      : isAdminLink
                        ? "oklch(0.55 0.08 85)"
                        : "oklch(0.48 0.01 245)",
                  }}
                >
                  <div
                    className="relative"
                    style={{
                      filter: isActive
                        ? isAdminLink
                          ? "drop-shadow(0 0 6px oklch(0.65 0.18 85 / 0.7))"
                          : "drop-shadow(0 0 6px oklch(0.62 0.22 260 / 0.7))"
                        : undefined,
                    }}
                  >
                    <Icon size={20} />
                    {isActive && (
                      <motion.div
                        layoutId="bottom-nav-indicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full"
                        style={{
                          background: isAdminLink
                            ? "oklch(0.65 0.18 85)"
                            : "oklch(0.62 0.22 260)",
                        }}
                      />
                    )}
                    {to === "/pending-approvals" &&
                      pendingRequests &&
                      pendingRequests.length > 0 && (
                        <span className="absolute -top-1 -right-1.5 bg-amber-500 text-white text-[9px] font-bold rounded-full px-1 py-0.5 min-w-[14px] text-center leading-none">
                          {pendingRequests.length}
                        </span>
                      )}
                  </div>
                  <span>{navLabel(item)}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Install Prompt */}
        <InstallPrompt />

        {/* Footer */}
        <footer className="hidden border-t border-border bg-muted/40 py-3 text-center md:block">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}. Powered by FiFO BRIDGE
          </p>
        </footer>
      </div>
    </div>
  );
}
