import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import EntryListScreen from "../screens/EntryListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useAuth } from "../context/AuthContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);

const JournalStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Entries" component={EntryListScreen} />
    <Stack.Screen name="EntryDetail" component={EntryDetailScreen} />
  </Stack.Navigator>
);

const EntryDetailScreen = () => {
  return <Text>EntryDetailScreen</Text>;
};

const AppNavigator = () => {
  const { currentUser } = useAuth();

  return (
    <NavigationContainer>
      {currentUser ? (
        <Tab.Navigator>
          <Tab.Screen
            name="HomeTab"
            component={HomeStack}
            options={{ title: "Hom" }}
          />
          <Tab.Screen
            name="JournalTab"
            component={JournalStack}
            options={{ title: "Journal" }}
          />
          <Tab.Screen
            name="ProfileTab"
            component={ProfileScreen}
            options={{ title: "Profile" }}
          />
        </Tab.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
