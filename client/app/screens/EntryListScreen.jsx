import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";
import EntryListItem from "../components/EntryListItem";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import {fetchEntries} from "../services/entryService";

const EntryListScreen = ({ navigation }) => {
    const [entries, setEntries] = useState([]);
    const { accessToken } = useAuth();
    const toast = useToast();

    useEffect (() => {
        const getEntries = async () => {
            try {
                const fetchedEntries = await fetchEntries(accessToken);
                setEntries(fetchedEntries);
            } catch (error) {
                console.error("Error fetching entries:", error);
            }
        };
        getEntries();
    }, [accessToken]);

    const renderItem = ({ item }) => (
        <TouchableOpacity
        className="p-4 border-b border-gray-300"
        onPress={() => navigation.navigate("EntryDetail", { entryId: item.id })}
        >
            <Text className="text-lg font-bold">{item.title}</Text>
            <Text className="text-sm text-gray-500">{new Date(item.created_at).toLocaleDateString()}</Text>
        </TouchableOpacity>
    );


    return (
        <View className="flex-1 justify-center p-5">
            <Text className="text-2xl font-bold text-center mb-5">Entries</Text>
            <FlatList
                data={entries}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}

export default EntryListScreen;

