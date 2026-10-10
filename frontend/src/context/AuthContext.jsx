
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import api, { setApiAccessToken } from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Keep Axios synchronized whenever the token changes.
  useEffect(() => {
    setApiAccessToken(accessToken);
  }, [accessToken]);

  // Login
  const login = async (email, password) => {
    const response = await fetch(
      "http://localhost:3000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    setAccessToken(data.accessToken);
    setUser(data.user ?? null);

    return data;
  };

  // Signup
  const signup = async (name, email, password) => {
    const response = await fetch(
      "http://localhost:3000/api/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }

    return data;
  };

  // Obtain a fresh access token using the refresh cookie.
  const refreshAccessToken = useCallback(async () => {
    const response = await api.post("/auth/refresh");
    const { newAccessToken : newAccessToken, user : refreshedUser } = response.data;

    if (!newAccessToken) {
      throw new Error("Refresh response did not contain an access token");
    }

    setApiAccessToken(newAccessToken);
    setAccessToken(newAccessToken);

    if(refreshedUser){
      setUser(refreshedUser);
    }

    return newAccessToken;
  }, []);

  // Restore the session when the app first loads.
  useEffect(() => {
    let cancelled = false;

    const restoreSession = async () => {
      try {
        await refreshAccessToken();
      } catch (error) {
        if (!cancelled) {
          setApiAccessToken(null);
          setAccessToken(null);
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setIsAuthLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, [refreshAccessToken]);

  // Logout
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setApiAccessToken(null);
      setAccessToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthLoading,
        login,
        signup,
        logout,
        refreshAccessToken,
        setUser,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};