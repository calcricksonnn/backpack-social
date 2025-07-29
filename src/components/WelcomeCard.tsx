import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function WelcomeCard({ onPress }: { onPress: () => void }) {
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={require('../assets/splash.png')}
      resizeMode="cover"
      style={styles.bg}
    >
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.6)']}
        style={[styles.gradient, { paddingBottom: insets.bottom + 24 }]}
      >
        <BlurView intensity={40} tint="light" style={styles.overlay}>
          <Text style={styles.title}>Explore With Confidence</Text>
          <Text style={styles.subtitle}>
            Connect. Discover. Stay safe. Your journey starts here.
          </Text>
        </BlurView>

        <TouchableOpacity style={styles.btn} onPress={onPress} activeOpacity={0.8}>
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  gradient: {
    width: '100%',
    paddingHorizontal: 24,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#eee',
    textAlign: 'center',
    lineHeight: 22,
  },
  btn: {
    alignSelf: 'center',
    backgroundColor: '#3ddc84',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 32,
    shadowColor: '#3ddc84',
    shadowOpacity: 0.7,
    shadowRadius: 12,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});