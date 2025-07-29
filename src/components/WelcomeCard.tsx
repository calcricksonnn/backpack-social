import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  ImageBackground,
} from 'react-native';
import { Text } from 'react-native-paper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function WelcomeCard({ onPress }: { onPress?: () => void }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePress = () => {
    if (onPress) return onPress();
    router.push('/journey/Tracker'); // 🚀 Launch tracker directly
  };

  return (
    <ImageBackground
      source={require('../assets/splash.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.6)']}
        style={[styles.gradient, { paddingBottom: insets.bottom + 24 }]}
      >
        <BlurView intensity={30} tint="dark" style={styles.overlay}>
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY }],
            }}
          >
            <Text style={styles.title}>Explore With Confidence</Text>
            <Text style={styles.subtitle}>
              Connect. Discover. Stay safe. Your journey starts here.
            </Text>
          </Animated.View>
        </BlurView>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY }],
          }}
        >
          <TouchableOpacity
            style={styles.btn}
            onPress={handlePress}
            activeOpacity={0.85}
          >
            <Text style={styles.btnText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
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
    padding: 20,
    marginHorizontal: width * 0.05,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    overflow: 'hidden',
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0,0,0,0.7)',
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
    paddingHorizontal: 36,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 40,
    shadowColor: '#3ddc84',
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});