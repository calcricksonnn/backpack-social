import React from 'react';
import { Slot } from 'expo-router';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '../src/context/AuthContext';

export default function Layout() {
  const colorScheme = useColorScheme();
  const barStyle = colorScheme === 'dark' ? 'light-content' : 'dark-content';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle={barStyle} />
          <Slot />
        </SafeAreaView>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}