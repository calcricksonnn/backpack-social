import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function WelcomeCard() {
  return (
    <ImageBackground
      source={require('@assets/splash.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>🌍 Welcome to Backpack Social</Text>
        <Text style={styles.subtitle}>
          Find fellow travelers, discover events, and trace your journey.
        </Text>
        <Button mode="contained" style={styles.btn}>
          Get Started
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { height: 300, justifyContent: 'center' },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 16,
    borderRadius: 12,
    margin: 16
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#eee',
    marginBottom: 12
  },
  btn: {
    alignSelf: 'flex-start',
    backgroundColor: '#3ddc84'
  }
});