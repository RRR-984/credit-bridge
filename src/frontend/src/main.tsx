import { InternetIdentityProvider } from "@caffeineai/core-infrastructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./context/AppContext";
import "./index.css";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

const queryClient = new QueryClient();

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <InternetIdentityProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </InternetIdentityProvider>
    </QueryClientProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);

// Register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        // Handle updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                // New version available — notify user
                if (
                  typeof window !== "undefined" &&
                  (window as unknown as Record<string, unknown>).showUpdateToast
                ) {
                  (
                    window as unknown as Record<string, unknown>
                  ).showUpdateToast = true;
                }
              }
            });
          }
        });
      })
      .catch(() => {
        // SW registration failed — app still works
      });
  });
}
