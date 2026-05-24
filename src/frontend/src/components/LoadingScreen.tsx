import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onReady?: () => void;
  minimumDuration?: number;
}

export function LoadingScreen({
  onReady,
  minimumDuration = 1800,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const _startTime = Date.now();

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 12 + 3;
      });
    }, 120);

    // Complete and fade out after minimum duration
    const completeTimer = setTimeout(() => {
      setProgress(100);
      clearInterval(progressInterval);

      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setHidden(true);
          onReady?.();
        }, 600);
      }, 300);
    }, minimumDuration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [minimumDuration, onReady]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center transition-opacity duration-600 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background:
          "linear-gradient(160deg, #0f172a 0%, #134e4a 40%, #0d9488 100%)",
      }}
      data-ocid="app.loading_state"
    >
      {/* Glow orb behind logo */}
      <div className="absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />

      {/* Logo container */}
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-teal-400 shadow-lg shadow-primary/30">
          <span className="font-display text-3xl font-bold text-white tracking-tight">
            CB
          </span>
        </div>
        {/* Pulse ring */}
        <div
          className="absolute inset-0 rounded-2xl border-2 border-primary/40 animate-ping"
          style={{ animationDuration: "2s" }}
        />
      </div>

      {/* App name */}
      <h1 className="font-display text-2xl font-bold text-white tracking-tight mb-1">
        Credit Bridge
      </h1>

      {/* Tagline */}
      <p className="text-sm text-white/60 font-body tracking-wide mb-10">
        Smart Credit Management
      </p>

      {/* Progress bar */}
      <div className="w-56 h-1 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-teal-300 transition-all duration-200 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Loading text */}
      <p className="mt-3 text-xs text-white/40 font-mono">
        {progress < 100 ? "Loading assets..." : "Ready"}
      </p>
    </div>
  );
}
