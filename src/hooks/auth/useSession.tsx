import React, {
  useContext,
  useState,
  createContext,
  useEffect,
  useCallback,
} from "react";

import { Skeleton } from "antd";
// Context Provider component that wraps your app and makes auth object
export interface SessionContext {
  isLoggedIn: boolean;
}

const sessionContext = createContext<SessionContext>(null);

// available to any child component that calls the useSession() hook.
export const ProvideAuth: any = ({ children }) => {
  const auth = { isLoggedIn: !!localStorage.getItem("token") };
  return (
    <sessionContext.Provider value={auth}>{children}</sessionContext.Provider>
  );
};

// Hook that enables any component to subscribe to auth state
export const useSession = (): SessionContext => {
  return useContext<SessionContext>(sessionContext);
};

export const useAuthProtected = (redirectUri = "/sign-in"): SessionContext => {
  const { isLoggedIn } = useSession();

  if (!isLoggedIn) {
    window.location.href = redirectUri;
  }

  return { isLoggedIn };
};

export const ProtectedFragment: React.FC = ({ children }) => {
  const { isLoggedIn } = useAuthProtected();
  if (isLoggedIn) return <>{children}</>;

  return <>Unauthenticated</>;
};
