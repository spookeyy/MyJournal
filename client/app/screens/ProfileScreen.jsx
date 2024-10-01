import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { useAuth } from "../context/AuthContext";

const ProfileScreen = () => {
  const { currentUser, getProfile, logout } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      await getProfile();
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className="flex-1 justify-center p-5">
      <Text className="text-2xl font-bold text-center mb-5">Profile</Text>
      <Text className="text-lg mb-2">Username: {currentUser.username}</Text>
      <Text className="text-lg mb-2">Email: {currentUser.email}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default ProfileScreen;
