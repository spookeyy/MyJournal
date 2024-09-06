import React, { createContext, useContext, useEffect, useState } from "react";
import { server_url } from "../../config.json";
import { ToastAndroid } from "react-native-toast-message";
import { Platform, Alert } from "react-native";

export const AuthContext = createContext();

const showMessage = (message) => {
  if (Platform.OS === "android") {
    // ToastAndroid.show(message, ToastAndroid.SHORT);
    Alert.alert("Message", message);
  } else {
    Alert.alert("Message", message);
  }
};


export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      if (accessToken) {
        try {
          const response = await fetch(`${server_url}/auth/verify`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const data = await response.json();
          if (data.error) {
            showMessage(data.error);
            return;
          }
          setCurrentUser(data.user);
        } catch (error) {
          console.error("Error verifying user:", error);
          showMessage("Error verifying user");
        }
      }
    };
    getCurrentUser();
  }, [accessToken]);

  const register = async (username, email, password) => {
    try {
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
        showMessage(data.error);
        return;
      }
      showMessage("Registered successfully");
    } catch (error) {
      console.error("Error registering:", error);
      showMessage("Error registering");
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
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
        showMessage(data.error);
        return;
      }
      setCurrentUser(data.user);
      setAccessToken(data.token);
      showMessage("Logged in successfully");
    } catch (error) {
      console.error("Error logging in:", error);
      showMessage("Error logging in");
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch(`${server_url}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCurrentUser(null);
      setAccessToken(null);
      showMessage("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      showMessage("Error logging out");
    }
  };

  const contextData = {
    currentUser,
    accessToken,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => { // useAuth hook
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
