import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import LayoutShell from '../src/components/LayoutShell';
import { useAuth } from '../src/context/AuthContext';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signIn(email, pass);
      router.replace('/'); // redirect after login
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <LayoutShell backgroundColor="#fff" scrollable={false}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Welcome Back</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={pass}
          onChangeText={setPass}
          style={styles.input}
          secureTextEntry
        />
        <Button mode="contained" onPress={handleLogin} style={styles.btn}>
          Log In
        </Button>
        <Button
          onPress={() => router.replace('/signup')}
          style={styles.link}
          compact
        >
          Don’t have an account? Sign up
        </Button>
      </View>
    </LayoutShell>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 24,
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16