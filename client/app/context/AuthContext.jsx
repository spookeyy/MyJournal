import React, { createContext, useContext, useEffect, useState } from "react";

import { server_url } from "../../config.json";
import { useCookies } from "react-cookie";
import { ToastAndroid } from "react-native-toast-message/lib/src/Toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["token", "user"]);
  const [accessToken, setAccessToken] = useState(cookies.token);
  const [refreshToken, setRefreshToken] = useState(cookies.user);

  useEffect(() => {
    const getCurrentUser = async () => {
      if (accessToken) {
        const response = await fetch(`${server_url}/auth/verify`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        if (data.error) {
          ToastAndroid.show(data.error, ToastAndroid.SHORT);
          return;
        }
        setCurrentUser(data.user);
      }
    };
    getCurrentUser();
  }, [cookies]);

  const register = async (username, email, password) => {
    const response = await fetch(`${server_url}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.error) {
      ToastAndroid.show(data.error, ToastAndroid.SHORT);
      return;
    }
    ToastAndroid.show("Registered successfully", ToastAndroid.SHORT);
  };

  const login = async (email, password) => {
    const response = await fetch(`${server_url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    if (data.error) {
      ToastAndroid.show(data.error, ToastAndroid.SHORT);
      return;
    }
    setCurrentUser(data.user);
    setCookie("token", data.token, { path: "/" });
    setCookie("user", data.user, { path: "/" });
    ToastAndroid.show("Logged in successfully", ToastAndroid.SHORT);
  };

  const logout = () => {
    const response = fetch(`${server_url}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setCookie("token", "", { path: "/" });
    setCookie("user", "", { path: "/" });
    removeCookie("token");
    removeCookie("user");
    setCurrentUser(null);
    ToastAndroid.show("Logged out successfully", ToastAndroid.SHORT);
  };

  const contextData = {
    currentUser,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider
      value={{
        ...contextData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
