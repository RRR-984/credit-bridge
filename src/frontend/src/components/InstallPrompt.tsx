import { usePWAInstall } from "@/hooks/usePWAInstall";
import { Download, Share2, Smartphone, X } from "lucide-react";
import { useEffect, useState } from "react";

export function InstallPrompt() {
  const {
    canInstall,
    isIOS,
    isInstalled,
    promptInstall,
    dismissInstall,
    dismissed,
  } = usePWAInstall();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (canInstall && !isInstalled && !dismissed) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
    setVisible(false);
  }, [canInstall, isInstalled, dismissed]);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(dismissInstall, 350);
  };

  const handleInstall = async () => {
    await promptInstall();
    setVisible(false);
  };

  if (!mounted) return null;
  if (!canInstall && !isIOS) return null;
  if (isInstalled || dismissed) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[100] flex justify-center px-4 pb-6 transition-all duration-500 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
      data-ocid="install.prompt.dialog"
    >
      <div className="glass-md w-full max-w-md overflow-hidden">
        {/* Header with close */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Smartphone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Install Credit Bridge App
              </h3>
              <p className="text-xs text-muted-foreground">
                Access your dashboard instantly
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDismiss}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Dismiss install prompt"
            data-ocid="install.dismiss_button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 pb-2 pt-1">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Access your financial dashboard instantly — no browser needed. Works
            offline and feels like a native app.
          </p>
        </div>

        {/* iOS Instructions */}
        {isIOS && (
          <div className="mx-5 mb-3 rounded-lg bg-primary/5 px-4 py-3">
            <p className="mb-2 text-xs font-medium text-foreground">
              To install on iPhone/iPad:
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                1
              </span>
              <span>
                Tap the <Share2 className="inline h-3 w-3 mx-0.5" /> Share
                button in Safari
              </span>
            </div>
            <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                2
              </span>
              <span>
                Scroll down and tap{" "}
                <strong className="text-foreground">Add to Home Screen</strong>
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 px-5 pb-5 pt-2">
          {!isIOS && (
            <button
              type="button"
              onClick={handleInstall}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98]"
              data-ocid="install.confirm_button"
            >
              <Download className="h-4 w-4" />
              Install App
            </button>
          )}
          <button
            type="button"
            onClick={handleDismiss}
            className="flex flex-1 items-center justify-center rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            data-ocid="install.cancel_button"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
