import React from "react";
import { View, Text, Button } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const { currentUser } = useAuth();
  const navigation = useNavigation();

  return (
    <View className="flex-1 justify-center p-5">
      <Text className="text-lg font-bold">
        Welcome, {currentUser.username}!
      </Text>
      <Text className="text-lg">Your email is: {currentUser.email}</Text>
      <Button
        title="View Entries"
        onPress={() => navigation.navigate("JournalTab", { screen: "Entries" })}
      />
      <Button
        title="View Profile"
        onPress={() => navigation.navigate("ProfileTab")}
      />
    </View>
  );
}
