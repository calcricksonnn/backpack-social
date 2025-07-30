import React from 'react';
import { Slot } from 'expo-router';
import { useColorScheme, StatusBar } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '../src/context/AuthContext';

export default function Layout() {
  const colorScheme = useColorScheme();
  const barStyle = colorScheme === 'dark' 
    ? 'light-content' 
    : 'dark-content';

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle={barStyle} />
            <Slot />
          </SafeAreaView>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}