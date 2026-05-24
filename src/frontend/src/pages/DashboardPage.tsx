import { FloatingActionButton } from "@/components/FloatingActionButton";
import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppContext } from "@/context/AppContext";
import {
  useDashboardStats,
  useOwnerGetPendingPaymentRequests,
} from "@/hooks/useBackend";
import { formatCurrency } from "@/lib/formatCurrency";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowDownLeft,
  ArrowUpRight,
  ChevronRight,
  Clock,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

export default function DashboardPage() {
  const { data: stats, isLoading, isError } = useDashboardStats();
  const navigate = useNavigate();
  const { t, selectedCountry } = useAppContext();
  const currency = selectedCountry.currency;
  const { data: pendingRequests } = useOwnerGetPendingPaymentRequests();

  const fmt = (n: bigint | number) => formatCurrency(Number(n), currency.code);
  const hasPendingBalance = stats && Number(stats.pendingBalance) > 0;

  return (
    <Layout title="Dashboard">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Business Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Your credit &amp; collection overview
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              type="button"
              onClick={() => navigate({ to: "/jama/new" })}
              data-ocid="dashboard.collection_button"
              className="gap-1 text-accent border-accent/40 hover:bg-accent/10"
            >
              <ArrowDownLeft size={14} /> Collection
            </Button>
            <Button
              size="sm"
              type="button"
              onClick={() => navigate({ to: "/udhar/new" })}
              data-ocid="dashboard.credit_button"
              className="gap-1"
            >
              <ArrowUpRight size={14} /> Credit
            </Button>
          </div>
        </div>

        {/* Pending approvals alert */}
        {pendingRequests && pendingRequests.length > 0 && (
          <div
            data-ocid="dashboard.pending_approvals_alert"
            className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-amber-500 flex-shrink-0" />
              <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                {pendingRequests.length} payment{" "}
                {pendingRequests.length === 1 ? "request" : "requests"} pending
                your approval
              </span>
            </div>
            <Link
              to="/pending-approvals"
              data-ocid="dashboard.review_pending_link"
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline whitespace-nowrap"
            >
              Review Now →
            </Link>
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div
            data-ocid="dashboard.error_state"
            className="flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3"
          >
            <AlertCircle size={18} className="flex-shrink-0 text-destructive" />
            <p className="text-sm text-destructive">
              Failed to load dashboard data. Please try again.
            </p>
          </div>
        )}

        {/* Stats grid — 2 col mobile, 3 col tablet/desktop */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {isLoading ? (
            <>
              <Skeleton className="h-28 rounded-xl" />
              <Skeleton className="h-28 rounded-xl" />
              <Skeleton className="h-28 rounded-xl" />
              <Skeleton className="h-28 rounded-xl" />
              <Skeleton className="h-28 rounded-xl col-span-2 sm:col-span-1" />
            </>
          ) : (
            <>
              <StatCard
                data-ocid="dashboard.total_credit_card"
                label={t("totalCredit")}
                value={stats ? fmt(stats.totalUdhar) : fmt(0)}
                icon={ArrowUpRight}
                iconClassName="bg-destructive/10 text-destructive"
                className="glass-card border-destructive/20"
              />
              <StatCard
                data-ocid="dashboard.total_collection_card"
                label={t("totalCollection")}
                value={stats ? fmt(stats.totalJama) : fmt(0)}
                icon={ArrowDownLeft}
                iconClassName="bg-accent/10 text-accent"
                valueClassName="text-accent"
                className="glass-card border-accent/20"
              />
              <StatCard
                data-ocid="dashboard.outstanding_balance_card"
                label={t("outstandingBalance")}
                value={stats ? fmt(stats.pendingBalance) : fmt(0)}
                icon={Wallet}
                iconClassName={
                  hasPendingBalance
                    ? "bg-amber-500/10 text-amber-500"
                    : "bg-primary/10 text-primary"
                }
                valueClassName={
                  hasPendingBalance ? "text-amber-500" : undefined
                }
                badge={hasPendingBalance ? "Overdue" : undefined}
                className="glass-card border-amber-500/20"
              />
              <StatCard
                data-ocid="dashboard.overdue_card"
                label="Overdue Customers"
                value={stats ? String(Number(stats.overdueCustomerCount)) : "0"}
                icon={AlertCircle}
                iconClassName={
                  stats && stats.overdueCustomerCount > 0n
                    ? "bg-destructive/10 text-destructive"
                    : "bg-muted text-muted-foreground"
                }
                valueClassName={
                  stats && stats.overdueCustomerCount > 0n
                    ? "text-destructive"
                    : undefined
                }
                className="glass-card"
              />
              <StatCard
                data-ocid="dashboard.today_collection_card"
                label={t("todaysCollection")}
                value={stats ? fmt(stats.todayCollection) : fmt(0)}
                icon={TrendingUp}
                iconClassName="bg-primary/10 text-primary"
                className="col-span-2 sm:col-span-1 glass-card border-primary/20"
              />
            </>
          )}
        </div>

        {/* Top customers */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Top Pending Customers
            </h2>
            <button
              type="button"
              data-ocid="dashboard.view_all_customers_button"
              onClick={() => navigate({ to: "/customers" })}
              className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
            >
              View All →
            </button>
          </div>

          {isLoading ? (
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 border-b border-border px-4 py-3 last:border-0"
                >
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 flex-1 rounded" />
                  <Skeleton className="h-4 w-20 rounded" />
                </div>
              ))}
            </div>
          ) : stats && stats.top5CustomersByBalance.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-border glass-card">
              {stats.top5CustomersByBalance.map((c, i) => (
                <button
                  type="button"
                  key={c.id.toString()}
                  data-ocid={`dashboard.top_customer.item.${i + 1}`}
                  className="flex w-full cursor-pointer items-center gap-3 border-b border-border/50 px-4 py-3 last:border-0 transition-colors hover:bg-primary/5"
                  onClick={() =>
                    navigate({
                      to: "/customers/$customerId",
                      params: { customerId: c.id.toString() },
                    })
                  }
                >
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Users size={15} className="text-primary" />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {c.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      #{i + 1} highest pending
                    </p>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-2">
                    <p className="text-sm font-bold text-amber-500">
                      {fmt(c.outstandingBalance)}
                    </p>
                    <ChevronRight size={14} className="text-muted-foreground" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            !isLoading && (
              <div
                data-ocid="dashboard.top_customers_empty_state"
                className="flex flex-col items-center rounded-xl border border-dashed border-border glass-card py-8 text-center"
              >
                <Users size={32} className="mb-2 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">
                  No customers yet
                </p>
              </div>
            )
          )}
        </section>

        {/* Recent transactions */}
        <section className="pb-24">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Recent Transactions
          </h2>

          {isLoading ? (
            <div className="overflow-hidden rounded-xl border border-border bg-card divide-y divide-border">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-3">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3.5 w-40 rounded" />
                    <Skeleton className="h-3 w-24 rounded" />
                  </div>
                  <Skeleton className="h-4 w-16 rounded" />
                </div>
              ))}
            </div>
          ) : stats && stats.top5CustomersByBalance.length > 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              <p>
                View complete transaction history on each customer&apos;s page.
              </p>
              <button
                type="button"
                onClick={() => navigate({ to: "/customers" })}
                className="text-primary underline mt-1 inline-block"
              >
                Browse Customers
              </button>
            </div>
          ) : (
            <div
              data-ocid="dashboard.transactions_empty_state"
              className="flex flex-col items-center rounded-xl border border-dashed border-border glass-card py-10 text-center"
            >
              <Wallet size={36} className="mb-3 text-muted-foreground/40" />
              <p className="text-sm font-semibold text-foreground">
                No transactions yet
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Start by adding a customer and recording a credit
              </p>
              <Button
                size="sm"
                type="button"
                className="mt-4"
                data-ocid="dashboard.add_customer_button"
                onClick={() => navigate({ to: "/customers" })}
              >
                Add Customer
              </Button>
            </div>
          )}
        </section>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </Layout>
  );
}
