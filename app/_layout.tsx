import React from 'react';
import Slot from 'expo-router/slot'; // ✅ Direct import to avoid undefined
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '../src/context/AuthContext';

export default function Layout() {
  console.log('🔍 useColorScheme():', useColorScheme);

  const colorScheme = useColorScheme();
  console.log('🎨 Resolved color scheme:', colorScheme);

  const barStyle = colorScheme === 'dark' ? 'light-content' : 'dark-content';
  console.log('📱 StatusBar barStyle:', barStyle);

  console.log('🧩 Slot:', Slot); // sanity check

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