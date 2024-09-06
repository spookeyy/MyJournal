import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AuthProvider } from './app/context/AuthContext';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './app/screens/LoginScreen';

export default function App() {
  return (
    <AuthProvider>
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <LoginScreen />
      <StatusBar style="auto" />
    </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
