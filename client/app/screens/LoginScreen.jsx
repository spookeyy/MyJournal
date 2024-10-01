import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
      console.log('Login successful');
      navigation.navigate('Home');
    } catch (error) {
      console.log('Login failed:', error);
      Alert.alert('Login Failed', 'Please check your credentials and try again.');
    }
  };

  return (
    <View className="flex-1 justify-center p-5">
      <Text className="text-2xl font-bold text-center mb-5">Welcome to MyJournal</Text>
      <Text className="text-lg text-center mb-5">Please sign in to continue</Text>
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
      <Button title="Login" onPress={handleLogin} className="bg-blue-500 text-white rounded-lg py-2 px-4 mb-4" />
    </View>
  );
};

export default LoginScreen;

// import React, { useState } from "react";
// import { StyleSheet, View, TextInput, Button, Text, Alert } from "react-native";
// import { useAuth } from "../context/AuthContext";

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();

//   const handleLogin = async () => {
//     try {
//       await login(email, password);
//       console.log("Login successful");
//       // navigation.navigate("Home");
//     } catch (error) {
//       console.log("Login failed:", error);
//       Alert.alert(
//         "Login Failed",
//         "Please check your credentials and try again."
//       );
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to MyJournal</Text>
//       <Text className="text-lg">Please sign in to continue</Text>
//       <Text style={styles.subtitle}>Login to your account</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button title="Login" onPress={handleLogin} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//   },
//   input: {
//     height: 30,
//     borderColor: "gray",
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 10,
//     paddingHorizontal: 70,
//     backgroundColor: "#fff",
//     fontSize: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   subtitle: {
//     fontSize: 18,
//     textAlign: "center",
//     marginBottom: 20,
//   },
// });
