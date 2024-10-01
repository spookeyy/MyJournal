import React from "react";
import "./global.css";
import { AuthProvider } from "./app/context/AuthContext";
import AppNavigator from "./app/navigations/AppNavigator";

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
