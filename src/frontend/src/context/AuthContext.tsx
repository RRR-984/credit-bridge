import { createActor } from "@/backend";
import type { AuthResult, SignupArgs, UserView } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const TOKEN_KEY = "cb_auth_token";

interface AuthContextValue {
  user: UserView | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (
    displayName: string,
    email: string,
    password: string,
  ) => Promise<string | null>;
  logout: () => Promise<void>;
  setUser: (user: UserView | null) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function saveToken(token: string | null) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<UserView | null>(null);
  const [token, setTokenState] = useState<string | null>(loadStoredToken);
  const [isLoading, setIsLoading] = useState(true);
  const { actor, isFetching } = useActor(createActor);

  // Restore session from stored token
  useEffect(() => {
    if (!actor || isFetching) return;
    const stored = loadStoredToken();
    if (!stored) {
      setIsLoading(false);
      return;
    }
    actor
      .getMe(stored)
      .then((maybeUser) => {
        if (maybeUser) {
          setUserState(maybeUser);
          setTokenState(stored);
        } else {
          saveToken(null);
          setTokenState(null);
        }
      })
      .catch(() => {
        saveToken(null);
        setTokenState(null);
      })
      .finally(() => setIsLoading(false));
  }, [actor, isFetching]);

  const login = useCallback(
    async (email: string, password: string): Promise<string | null> => {
      if (!actor) return "Service unavailable. Please try again.";
      const result: AuthResult = await actor.login({ email, password });
      if (result.__kind__ === "ok") {
        const { token: newToken, user: newUser } = result.ok;
        saveToken(newToken);
        setTokenState(newToken);
        setUserState(newUser);
        return null;
      }
      return result.err;
    },
    [actor],
  );

  const signup = useCallback(
    async (
      displayName: string,
      email: string,
      password: string,
    ): Promise<string | null> => {
      if (!actor) return "Service unavailable. Please try again.";
      const args: SignupArgs = { displayName, email, password };
      const result: AuthResult = await actor.signup(args);
      if (result.__kind__ === "ok") {
        const { token: newToken, user: newUser } = result.ok;
        saveToken(newToken);
        setTokenState(newToken);
        setUserState(newUser);
        return null;
      }
      return result.err;
    },
    [actor],
  );

  const logout = useCallback(async () => {
    if (actor && token) {
      await actor.logout(token).catch(() => {});
    }
    saveToken(null);
    setTokenState(null);
    setUserState(null);
  }, [actor, token]);

  const setUser = useCallback((u: UserView | null) => setUserState(u), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
