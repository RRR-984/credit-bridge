import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { useSetAdminPrincipal } from "@/hooks/useBackend";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function AdminSetupPage() {
  const { t } = useAppContext();
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const mutation = useSetAdminPrincipal();

  const handleSetAdmin = async () => {
    if (!identity) {
      toast.error(t("failedToLoad"));
      return;
    }
    try {
      await mutation.mutateAsync(identity.getPrincipal());
      toast.success("Admin set successfully");
      navigate({ to: "/admin" });
    } catch {
      toast.error(t("failedToLoad"));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div
        data-ocid="admin.setup.card"
        className="glass-card w-full max-w-md p-8 text-center"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Lock className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-xl font-bold text-foreground font-display sm:text-2xl">
          {t("adminSetupTitle")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("adminSetupDesc")}
        </p>
        <Button
          data-ocid="admin.setup.set_button"
          type="button"
          className="mt-6 w-full glow-blue"
          size="lg"
          onClick={handleSetAdmin}
          disabled={mutation.isPending || !identity}
        >
          {mutation.isPending ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              {t("loading")}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <ShieldCheck size={18} />
              {t("setAsAdmin")}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
