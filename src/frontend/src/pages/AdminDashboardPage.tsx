import { StatCard } from "@/components/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import {
  useAdminGetAdminPrincipal,
  useAdminGetAllJama,
  useAdminGetAllUdhar,
  useAdminGetStats,
} from "@/hooks/useBackend";
import { formatCurrency } from "@/lib/formatCurrency";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRightLeft,
  Banknote,
  ChevronRight,
  CreditCard,
  Settings,
  ShieldAlert,
  Users,
  Wallet,
} from "lucide-react";
import { useMemo } from "react";

interface UnifiedTx {
  id: string;
  type: "credit" | "collection";
  amount: number;
  createdAt: number;
}

export default function AdminDashboardPage() {
  const { t, selectedCountry } = useAppContext();
  const navigate = useNavigate();

  const { data: adminPrincipal, isLoading: principalLoading } =
    useAdminGetAdminPrincipal();
  const { data: stats, isLoading: statsLoading } = useAdminGetStats();
  const { data: allUdhar = [], isLoading: udharLoading } =
    useAdminGetAllUdhar();
  const { data: allJama = [], isLoading: jamaLoading } = useAdminGetAllJama();

  const isLoading =
    principalLoading || statsLoading || udharLoading || jamaLoading;

  const outstanding = stats
    ? Number(stats.totalUdharAmount) - Number(stats.totalJamaAmount)
    : 0;

  const recentTransactions = useMemo<UnifiedTx[]>(() => {
    const udharTxs: UnifiedTx[] = allUdhar.map((u) => ({
      id: `u-${u.id.toString()}`,
      type: "credit",
      amount: Number(u.amount),
      createdAt: Number(u.createdAt),
    }));
    const jamaTxs: UnifiedTx[] = allJama.map((j) => ({
      id: `j-${j.id.toString()}`,
      type: "collection",
      amount: Number(j.amount),
      createdAt: Number(j.createdAt),
    }));
    return [...udharTxs, ...jamaTxs]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 10);
  }, [allUdhar, allJama]);

  if (adminPrincipal === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="glass-card w-full max-w-md p-8 text-center">
          <h2 className="text-lg font-semibold text-foreground font-display">
            {t("adminAccess")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("adminSetupDesc")}
          </p>
          <Button
            data-ocid="admin.dashboard.goto_setup_button"
            type="button"
            className="mt-5 w-full"
            onClick={() => navigate({ to: "/admin/setup" })}
          >
            {t("setAsAdmin")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-foreground font-display sm:text-2xl">
            {t("adminDashboard")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("fullSystemControl")}
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex min-h-[40vh] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}

        {!isLoading && stats && (
          <>
            {/* Stats Grid */}
            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatCard
                data-ocid="admin.dashboard.total_customers_card"
                label={t("totalCustomers")}
                value={String(stats.totalCustomers)}
                icon={Users}
                iconClassName="bg-primary/10 text-primary"
              />
              <StatCard
                data-ocid="admin.dashboard.total_transactions_card"
                label={t("totalTransactions")}
                value={String(
                  Number(stats.totalUdhar) + Number(stats.totalJama),
                )}
                icon={ArrowRightLeft}
                iconClassName="bg-accent/10 text-accent"
              />
              <StatCard
                data-ocid="admin.dashboard.blocked_count_card"
                label={t("blockedCount")}
                value={String(stats.blockedCount)}
                icon={ShieldAlert}
                iconClassName="bg-destructive/10 text-destructive"
              />
              <StatCard
                data-ocid="admin.dashboard.outstanding_credit_card"
                label={t("outstandingCredit")}
                value={formatCurrency(
                  outstanding,
                  selectedCountry.currency.code,
                )}
                icon={Wallet}
                iconClassName="bg-amber-500/10 text-amber-500"
              />
            </div>

            {/* Second Stats Row */}
            <div className="mb-6 grid grid-cols-2 gap-3">
              <StatCard
                data-ocid="admin.dashboard.credit_total_card"
                label={t("totalCreditIssued")}
                value={formatCurrency(
                  Number(stats.totalUdharAmount),
                  selectedCountry.currency.code,
                )}
                icon={CreditCard}
                iconClassName="bg-primary/10 text-primary"
              />
              <StatCard
                data-ocid="admin.dashboard.collection_total_card"
                label={t("totalCollections")}
                value={formatCurrency(
                  Number(stats.totalJamaAmount),
                  selectedCountry.currency.code,
                )}
                icon={Banknote}
                iconClassName="bg-green-500/10 text-green-500"
              />
            </div>

            {/* Quick Actions */}
            <div className="mb-6">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {t("quickActions")}
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <button
                  data-ocid="admin.dashboard.manage_customers_button"
                  type="button"
                  onClick={() => navigate({ to: "/admin/customers" })}
                  className="glass-card flex items-center justify-between p-4 text-left transition-shadow hover:shadow-md"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t("manageCustomers")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("allCustomers")}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
                <button
                  data-ocid="admin.dashboard.all_transactions_button"
                  type="button"
                  onClick={() => navigate({ to: "/admin/transactions" })}
                  className="glass-card flex items-center justify-between p-4 text-left transition-shadow hover:shadow-md"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t("allTransactions")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("recentTransactions")}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
                <button
                  data-ocid="admin.dashboard.settings_button"
                  type="button"
                  onClick={() => navigate({ to: "/settings" })}
                  className="glass-card flex items-center justify-between p-4 text-left transition-shadow hover:shadow-md"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t("settings")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("preferences")}
                    </p>
                  </div>
                  <Settings className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="glass-card overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {t("recentTransactions")}
                </h2>
                <Button
                  data-ocid="admin.dashboard.view_all_transactions_button"
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate({ to: "/admin/transactions" })}
                >
                  {t("viewAll")}
                </Button>
              </div>
              {recentTransactions.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                  {t("noTransactionsYet")}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-2 font-medium text-muted-foreground">
                          {t("date")}
                        </th>
                        <th className="px-4 py-2 font-medium text-muted-foreground">
                          {t("transactionType")}
                        </th>
                        <th className="px-4 py-2 font-medium text-muted-foreground">
                          {t("amount")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {recentTransactions.map((tx, idx) => (
                        <tr
                          key={tx.id}
                          data-ocid={`admin.dashboard.tx.item.${idx + 1}`}
                          className="transition-colors hover:bg-muted/30"
                        >
                          <td className="px-4 py-2.5 text-muted-foreground">
                            {new Date(tx.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-2.5">
                            <Badge
                              variant={
                                tx.type === "credit" ? "default" : "secondary"
                              }
                              className="text-xs"
                            >
                              {tx.type === "credit"
                                ? t("credit")
                                : t("collection")}
                            </Badge>
                          </td>
                          <td className="px-4 py-2.5 font-semibold text-foreground">
                            {formatCurrency(
                              tx.amount,
                              selectedCountry.currency.code,
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
