import { useCallback, useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAInstallState {
  canInstall: boolean;
  isIOS: boolean;
  isInstalled: boolean;
  promptInstall: () => Promise<void>;
  dismissInstall: () => void;
  dismissed: boolean;
}

const DISMISS_KEY = "pwa-install-dismissed";

export function usePWAInstall(): PWAInstallState {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem(DISMISS_KEY) === "true";
    } catch {
      return false;
    }
  });

  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

  useEffect(() => {
    const checkInstalled = () => {
      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        // @ts-expect-error iOS standalone property
        navigator.standalone === true;
      setIsInstalled(standalone);
    };

    checkInstalled();
    const mql = window.matchMedia("(display-mode: standalone)");
    mql.addEventListener("change", checkInstalled);
    return () => mql.removeEventListener("change", checkInstalled);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } catch {
      // Prompt failed or was cancelled
    }
  }, [deferredPrompt]);

  const dismissInstall = useCallback(() => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, "true");
    } catch {
      // Storage not available
    }
  }, []);

  const canInstall = !!deferredPrompt && !isInstalled && !dismissed;

  return {
    canInstall,
    isIOS,
    isInstalled,
    promptInstall,
    dismissInstall,
    dismissed,
  };
}
