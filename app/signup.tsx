import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import LayoutShell from '../src/components/LayoutShell';
import { useAuth } from '../src/context/AuthContext';

export default function SignUp() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      await signUp(email, pass);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <LayoutShell backgroundColor="#fff" scrollable={false}>
      <Text style={styles.title}>Create Account</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={pass}
        onChangeText={setPass}
        style={styles.input}
        secureTextEntry
      />
      <Button mode="contained" onPress={handleSignUp} style={styles.btn}>
        Sign Up
      </Button>
      <Button
        onPress={() => router.replace('/login')}
        style={styles.link}
      >
        Already have an account? Log in
      </Button>
    </LayoutShell>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
  error: { color: 'red', marginBottom: 8 },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12
  },
  btn: { width: '100%', padding: 6, borderRadius: 8, marginTop: 8 },
  link: { marginTop: 12 }
});