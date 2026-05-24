import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  changePositive?: boolean;
  icon?: LucideIcon;
  iconClassName?: string;
  className?: string;
  subLabel?: string;
  valueClassName?: string;
  badge?: string;
  "data-ocid"?: string;
}

export function StatCard({
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
  "data-ocid": dataOcid,
}: StatCardProps) {
  return (
    <div
      data-ocid={dataOcid}
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <p
              className={cn(
                "truncate text-2xl font-bold text-foreground font-display",
                valueClassName,
              )}
            >
              {value}
            </p>
            {badge && (
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                {badge}
              </span>
            )}
          </div>
          {subLabel && (
            <p className="text-xs text-muted-foreground mt-0.5">{subLabel}</p>
          )}
          {change && (
            <p
              className={cn(
                "mt-1 text-xs font-medium",
                changePositive ? "text-green-500" : "text-destructive",
              )}
            >
              {change}
            </p>
          )}
        </div>
        {Icon && (
          <div
            className={cn(
              "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg",
              iconClassName ?? "bg-primary/10 text-primary",
            )}
          >
            <Icon size={20} />
          </div>
        )}
      </div>
    </div>
  );
}
