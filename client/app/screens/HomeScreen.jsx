import React from "react";
import { View, Text } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import EntryListScreen from "./EntryListScreen";
// import { useToast } from "react-native-toast-notifications";
// import EntryDetailScreen from "./EntryDetailScreen";
import ProfileScreen from "./ProfileScreen";


export default function HomeScreen() {
    const { user } = useAuth();
    const navigation = useNavigation();
    // const toast = useToast();

    return (
        <View className="flex-1 justify-center p-5">
            <Text className="text-lg font-bold">Welcome, {user.username}!</Text>
            <Text className="text-lg">Your email is: {user.email}</Text>
            <Button
                title="View Entries"
                onPress={() => navigation.navigate("Entries")}
            />
            <Button
                title="View Profile"
                onPress={() => navigation.navigate("Profile")}
            />
        </View>
    );
}