// app/_layout.tsx
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from '../src/context/AuthContext';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <PaperProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }} />
          </SafeAreaView>
        </PaperProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}