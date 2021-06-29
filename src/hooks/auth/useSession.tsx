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
  user: any;
  authenticating: boolean;
  isLoggedIn: boolean;
}

const sessionContext = createContext<SessionContext>(null);

// available to any child component that calls the useSession() hook.
export const ProvideAuth: any = ({ children }) => {
  const auth = { user: "test", authenticating: false, isLoggedIn: false };
  return (
    <sessionContext.Provider value={auth}>{children}</sessionContext.Provider>
  );
};

// Hook that enables any component to subscribe to auth state
export const useSession = (): SessionContext => {
  return useContext<SessionContext>(sessionContext);
};

export const useAuthProtected = (redirectUri = "/sign-in"): SessionContext => {
  const { user, authenticating, isLoggedIn } = useSession();

  if (!authenticating && !user) {
    window.location.href = redirectUri;
  }

  return { user, authenticating, isLoggedIn };
};

export const ProtectedFragment: React.FC = ({ children }) => {
  const { authenticating, isLoggedIn } = useAuthProtected();
  if (authenticating) return <Skeleton></Skeleton>;

  if (isLoggedIn) return <>{children}</>;

  return <>Unauthenticated</>;
};
