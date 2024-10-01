import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();

  const handleRegister = async () => {
    try {
      await register(username, email, password);
      Alert.alert(
        "Registration Successful",
        "You can now login with your new account."
      );
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Registration Failed", "Please try again.");
    }
  };

  return (
    <View className="flex-1 justify-center p-5">
      <Text className="text-2xl font-bold text-center mb-5">
        Create an Account
      </Text>
      <TextInput
        className="h-12 border border-gray-300 rounded-md mb-4 px-4 bg-white"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        className="h-12 border border-gray-300 rounded-md mb-4 px-4 bg-white"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="h-12 border border-gray-300 rounded-md mb-4 px-4 bg-white"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
