import React, { useEffect, useRef } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Animated,
  Dimensions
} from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function WelcomeCard() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  return (
    <ImageBackground
      source={require('@assets/splash.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <Text style={styles.title}>🌍 Backpack Social</Text>
        <Text style={styles.subtitle}>
          Meet fellow travelers. Find events. Trace your journey.
        </Text>
        <Button
          mode="contained"
          onPress={() => router.push('/signup')}
          style={styles.btn}
          labelStyle={styles.btnText}
        >
          Get Started
        </Button>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: 'center'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    marginHorizontal: 24,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 12,
    letterSpacing: 1.2
  },
  subtitle: {
    fontSize: 16,
    color: '#eee',
    marginBottom: 18,
    lineHeight: 22
  },
  btn: {
    alignSelf: 'flex-start',
    backgroundColor: '#3ddc84',
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 8
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});