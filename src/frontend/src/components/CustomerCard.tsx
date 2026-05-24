import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/formatCurrency";
import { cn } from "@/lib/utils";
import { CustomerStatus } from "@/types";
import { AlertCircle, ChevronRight, User } from "lucide-react";

interface CustomerCardProps {
  id: bigint;
  name: string;
  mobileNumber: string;
  outstandingBalance: bigint;
  status: CustomerStatus;
  currency?: string;
  onClick?: () => void;
  className?: string;
  "data-ocid"?: string;
}

export function CustomerCard({
  name,
  mobileNumber,
  outstandingBalance,
  status,
  currency = "INR",
  onClick,
  className,
  "data-ocid": dataOcid,
}: CustomerCardProps) {
  const isOverdue = status === CustomerStatus.overdue;
  const hasPending = outstandingBalance > 0n;

  return (
    <button
      type="button"
      data-ocid={dataOcid}
      onClick={onClick}
      className={cn(
        "glass-card flex w-full cursor-pointer items-center gap-3 rounded-xl border border-border/60 p-4 transition-all hover:border-primary/40 hover:shadow-lg active:scale-[0.99]",
        className,
      )}
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <User size={18} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold text-foreground">
            {name}
          </p>
          {isOverdue && (
            <AlertCircle size={14} className="flex-shrink-0 text-destructive" />
          )}
        </div>
        <p className="truncate text-xs text-muted-foreground">{mobileNumber}</p>
      </div>
      <div className="flex flex-shrink-0 flex-col items-end gap-1">
        <p
          className={cn(
            "text-sm font-bold",
            hasPending ? "text-destructive" : "text-green-500",
          )}
        >
          {hasPending
            ? formatCurrency(Math.abs(Number(outstandingBalance)), currency)
            : "Settled"}
        </p>
        <Badge
          variant={isOverdue ? "destructive" : "secondary"}
          className="text-xs"
        >
          {isOverdue ? "Overdue" : "Active"}
        </Badge>
      </div>
      <ChevronRight size={16} className="flex-shrink-0 text-muted-foreground" />
    </button>
  );
}
