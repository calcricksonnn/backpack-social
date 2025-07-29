import React, { useEffect } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { useAuth } from '../src/context/AuthContext';
import { useRouter } from 'expo-router';
import WelcomeCard from '../src/components/WelcomeCard';

export default function HomeScreen() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/signup');
    }
  }, [user, loading]);

  if (loading || !user) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <WelcomeCard onPress={() => router.push('/journey/Tracker')} />
        {/* Next: Add MapPreview, Journey Button, Reflection Teaser, etc. */}
      </ScrollView>
    </SafeAreaView>
  );
}