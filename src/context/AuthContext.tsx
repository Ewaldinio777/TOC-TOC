import React, { createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import * as Linking from "expo-linking";
import { router } from "expo-router";

type AuthContextType = {
  session: Session | null;
  isLoggedIn: boolean;
  isPasswordRecovery: boolean;
  logout: () => Promise<void>;
  clearPasswordRecovery: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);

  // isLoggedIn es false si estamos en flujo de recuperación
  // para que el RootNavigator mantenga el stack (auth) visible
  const isLoggedIn = !!session && !isPasswordRecovery;

  // ─── Manejo de deep links para recuperación de contraseña ───────────────────
  // Cuando el usuario toca el link del email (toctoc://reset-password#access_token=...),
  // parseamos el hash y establecemos la sesión manualmente.
  useEffect(() => {
    const handleDeepLink = async (url: string) => {
      if (!url.includes("reset-password")) return;

      const hashFragment = url.split("#")[1];
      if (!hashFragment) return;

      const params = new URLSearchParams(hashFragment);
      const type = params.get("type");
      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");

      if (type === "recovery" && access_token && refresh_token) {
        setIsPasswordRecovery(true);
        await supabase.auth.setSession({ access_token, refresh_token });
        // onAuthStateChange disparará PASSWORD_RECOVERY que navegará a la pantalla
      }
    };

    // Caso 1: App abierta desde un deep link (estaba cerrada)
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink(url);
    });

    // Caso 2: App ya abierta cuando llega el deep link
    const subscription = Linking.addEventListener("url", ({ url }) => {
      handleDeepLink(url);
    });

    return () => subscription.remove();
  }, []);

  // ─── Listener de eventos de Supabase Auth ───────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("AuthContext: onAuthStateChange", event);

      if (event === "PASSWORD_RECOVERY") {
        // El usuario llegó desde el email de recuperación
        setIsPasswordRecovery(true);
        setSession(session);
        // Pequeño delay para que el router esté listo
        setTimeout(() => {
          router.replace("/(auth)/reset-password");
        }, 100);
        return;
      }

      if (event === "USER_UPDATED" && isPasswordRecovery) {
        // El usuario actualizó su contraseña exitosamente
        setIsPasswordRecovery(false);
        setSession(null);
        return;
      }

      if (event === "SIGNED_OUT") {
        setIsPasswordRecovery(false);
        setSession(null);
        return;
      }

      setSession(session ?? null);
    });

    return () => {
      if (subscription && typeof subscription.unsubscribe === "function") {
        subscription.unsubscribe();
      }
    };
  }, [isPasswordRecovery]);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      if (error.message === "Auth session missing!") {
        setSession(null);
        setIsPasswordRecovery(false);
      } else {
        console.error("Logout error:", error);
      }
    }
  };

  const clearPasswordRecovery = () => {
    setIsPasswordRecovery(false);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoggedIn,
        isPasswordRecovery,
        logout,
        clearPasswordRecovery,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export default AuthContext;
