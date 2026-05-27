import { createActor } from "@/backend";
import {
  type CountryConfig,
  DEFAULT_COUNTRY,
  getCountryByCode,
} from "@/lib/countries";
import { createActorWithHost } from "@/lib/createActorWithHost";
import { type Language, type TranslationKey, translate } from "@/lib/i18n";
import { useActor } from "@caffeineai/core-infrastructure";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const STORAGE_COUNTRY = "cs_country";
const STORAGE_LANGUAGE = "cs_language";

interface AppContextValue {
  selectedCountry: CountryConfig;
  language: Language;
  isAdmin: boolean;
  setCountry: (country: CountryConfig) => void;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const AppContext = createContext<AppContextValue | null>(null);

function loadInitialCountry(): CountryConfig {
  try {
    const stored = localStorage.getItem(STORAGE_COUNTRY);
    if (stored) return getCountryByCode(stored);
  } catch {
    // ignore
  }
  return DEFAULT_COUNTRY;
}

function loadInitialLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_LANGUAGE);
    if (stored === "en" || stored === "hi") return stored;
  } catch {
    // ignore
  }
  return "en";
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedCountry, setSelectedCountry] =
    useState<CountryConfig>(loadInitialCountry);
  const [language, setLanguageState] = useState<Language>(loadInitialLanguage);
  const [isAdmin, setIsAdmin] = useState(false);

  const { actor, isFetching } = useActor(createActorWithHost);
  const { identity, loginStatus } = useInternetIdentity();

  useEffect(() => {
    if (actor && identity && loginStatus === "success" && !isFetching) {
      actor
        .isAdmin(identity.getPrincipal())
        .then(setIsAdmin)
        .catch(() => setIsAdmin(false));
    } else {
      setIsAdmin(false);
    }
  }, [actor, identity, loginStatus, isFetching]);

  const setCountry = useCallback((country: CountryConfig) => {
    setSelectedCountry(country);
    try {
      localStorage.setItem(STORAGE_COUNTRY, country.code);
    } catch {
      /* ignore */
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_LANGUAGE, lang);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (key: TranslationKey) => translate(language, key),
    [language],
  );

  return (
    <AppContext.Provider
      value={{ selectedCountry, language, isAdmin, setCountry, setLanguage, t }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
