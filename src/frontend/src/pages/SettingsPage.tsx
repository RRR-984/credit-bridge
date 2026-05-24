import type { UserProfile } from "@/backend";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/context/AppContext";
import { useGetProfile, useUpdateProfile } from "@/hooks/useBackend";
import { useTheme } from "@/hooks/useTheme";
import { COUNTRIES } from "@/lib/countries";
import {
  Building2,
  CheckCircle2,
  Cloud,
  Download,
  Globe,
  Languages,
  Loader2,
  Moon,
  Smartphone,
  Sun,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { usePWAInstall } from "../hooks/usePWAInstall";

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-center gap-2.5">
        <span className="text-primary">{icon}</span>
        <h2 className="font-display text-base font-semibold text-foreground">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function AppInstallSection() {
  const { canInstall, isIOS, isInstalled, promptInstall } = usePWAInstall();

  return (
    <SectionCard icon={<Smartphone size={18} />} title="App Installation">
      <div className="space-y-3">
        {isInstalled ? (
          <div
            data-ocid="settings.app_installed_badge"
            className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600"
          >
            <CheckCircle2 size={16} />
            <span className="font-medium">Installed as App</span>
          </div>
        ) : (
          <>
            {(canInstall || isIOS) && (
              <div className="space-y-3">
                {isIOS ? (
                  <div
                    data-ocid="settings.ios_install_instructions"
                    className="rounded-lg bg-muted/40 px-4 py-3 text-sm text-muted-foreground"
                  >
                    <p className="font-medium text-foreground mb-1">
                      Install on iPhone / iPad
                    </p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Tap the Share button ⬆ in Safari</li>
                      <li>Scroll down and tap "Add to Home Screen"</li>
                      <li>Tap "Add" in the top right</li>
                    </ol>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={promptInstall}
                    data-ocid="settings.install_app_button"
                    className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all duration-200"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.68 0.18 195), oklch(0.58 0.22 200))",
                    }}
                  >
                    <Download size={15} />
                    Install Credit Bridge
                  </button>
                )}
              </div>
            )}
            {!canInstall && !isIOS && (
              <p className="text-xs text-muted-foreground">
                Your browser supports installing this app. Look for the install
                icon in the address bar or browser menu.
              </p>
            )}
          </>
        )}
      </div>
    </SectionCard>
  );
}

export default function SettingsPage() {
  const { data: profile, isLoading } = useGetProfile();
  const updateProfile = useUpdateProfile();
  const { theme, setTheme } = useTheme();
  const { selectedCountry, language, setCountry, setLanguage, t } =
    useAppContext();

  const [businessName, setBusinessName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState(selectedCountry.code);

  // Sync form with loaded profile
  useEffect(() => {
    if (profile) {
      setBusinessName(profile.businessName ?? "");
      setMobileNumber(profile.mobileNumber ?? "");
      if (profile.country) setCountryCode(profile.country);
    }
  }, [profile]);

  const resolvedCountry =
    COUNTRIES.find((c) => c.code === countryCode) ?? selectedCountry;

  async function handleSave() {
    const updatedProfile: UserProfile = {
      businessName,
      mobileNumber,
      country: resolvedCountry.code,
      currency: resolvedCountry.currency.code,
      timezone: resolvedCountry.timezone,
      dateFormat: resolvedCountry.dateFormat,
      language,
    };

    try {
      await updateProfile.mutateAsync(updatedProfile);
      setCountry(resolvedCountry);
      toast.success(`${t("saveSettings")} ✓`, {
        description: "Your profile and preferences have been updated.",
      });
    } catch {
      toast.error("Failed to save settings", {
        description: "Please try again.",
      });
    }
  }

  if (isLoading) {
    return (
      <Layout title={t("settings")}>
        <div
          className="flex min-h-[40vh] items-center justify-center"
          data-ocid="settings.loading_state"
        >
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={t("settings")}>
      <div className="mx-auto max-w-xl space-y-6 pb-24 md:pb-6">
        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="font-display text-2xl font-bold text-foreground">
            {t("settings")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your business profile and preferences.
          </p>
        </motion.div>

        {/* Business Profile */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <SectionCard
            icon={<Building2 size={18} />}
            title={t("businessProfile")}
          >
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="businessName">{t("businessName")}</Label>
                <Input
                  id="businessName"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Sharma General Store"
                  data-ocid="settings.business_name_input"
                  className="bg-input/60"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="mobileNumber">{t("mobileNumber")}</Label>
                <Input
                  id="mobileNumber"
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter mobile number"
                  data-ocid="settings.mobile_number_input"
                  className="bg-input/60"
                />
              </div>
            </div>
          </SectionCard>
        </motion.div>

        {/* Regional Settings */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <SectionCard icon={<Globe size={18} />} title={t("regionalSettings")}>
            <div className="space-y-3">
              {/* Country selector */}
              <div className="space-y-1.5">
                <Label htmlFor="country">{t("country")}</Label>
                <div className="relative">
                  <select
                    id="country"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    data-ocid="settings.country_select"
                    className="w-full appearance-none rounded-md border border-input bg-input/60 px-3 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.name} ({c.dialCode})
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-muted-foreground">
                    ▾
                  </span>
                </div>
              </div>

              {/* Currency — read-only, driven by country */}
              <div className="space-y-1.5">
                <Label>{t("currency")}</Label>
                <div
                  data-ocid="settings.currency_display"
                  className="flex items-center gap-2 rounded-md border border-border/60 bg-muted/40 px-3 py-2 text-sm text-muted-foreground"
                >
                  <span className="font-semibold text-foreground">
                    {resolvedCountry.currency.symbol}
                  </span>
                  <span>{resolvedCountry.currency.code}</span>
                  <span className="ml-auto text-xs opacity-60">
                    {language === "en" ? "Auto-set by country" : "देश के अनुसार"}
                  </span>
                </div>
              </div>

              {/* Language toggle */}
              <div className="space-y-1.5">
                <Label>{t("language")}</Label>
                <div
                  className="flex gap-2"
                  data-ocid="settings.language_toggle"
                  aria-label="Language selection"
                >
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    data-ocid="settings.language_en_button"
                    className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium transition-smooth ${
                      language === "en"
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border bg-input/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    🇬🇧 English
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("hi")}
                    data-ocid="settings.language_hi_button"
                    className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium transition-smooth ${
                      language === "hi"
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border bg-input/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    🇮🇳 हिंदी
                  </button>
                </div>
              </div>
            </div>
          </SectionCard>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <SectionCard
            icon={theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
            title={t("preferences")}
          >
            <div className="space-y-1.5">
              <Label>{t("theme")}</Label>
              <div
                className="flex gap-2"
                data-ocid="settings.theme_toggle"
                aria-label="Theme selection"
              >
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  data-ocid="settings.theme_light_button"
                  className={`flex flex-1 items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-smooth ${
                    theme === "light"
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border bg-input/60 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Sun size={15} /> {t("lightMode")}
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  data-ocid="settings.theme_dark_button"
                  className={`flex flex-1 items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-smooth ${
                    theme === "dark"
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border bg-input/60 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Moon size={15} /> {t("darkMode")}
                </button>
              </div>
            </div>
          </SectionCard>
        </motion.div>

        {/* App Installation */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.18 }}
        >
          <AppInstallSection />
        </motion.div>

        {/* Information */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.22 }}
        >
          <SectionCard icon={<Cloud size={18} />} title={t("backupSync")}>
            <div
              data-ocid="settings.backup_section"
              className="flex items-start gap-3 rounded-lg bg-muted/40 px-4 py-3"
            >
              <Cloud
                size={18}
                className="mt-0.5 shrink-0 text-muted-foreground"
              />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {t("cloudSync")}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {t("cloudSyncSoon")}
                </p>
              </div>
            </div>
          </SectionCard>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          <Button
            type="button"
            onClick={handleSave}
            disabled={updateProfile.isPending}
            data-ocid="settings.save_button"
            className="w-full gap-2 font-semibold"
            size="lg"
          >
            {updateProfile.isPending ? (
              <Loader2 size={17} className="animate-spin" />
            ) : updateProfile.isSuccess ? (
              <CheckCircle2 size={17} />
            ) : null}
            {updateProfile.isPending
              ? t("loading").replace("...", "…")
              : t("saveSettings")}
          </Button>
        </motion.div>
      </div>
      <FloatingActionButton />
    </Layout>
  );
}
