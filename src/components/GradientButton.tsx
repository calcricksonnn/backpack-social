import React from 'react';
import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';

export const GradientButton = ({ text, onPress }) => (
  <Button
    mode="contained"
    onPress={onPress}
    contentStyle={{ backgroundColor: 'transparent' }}
    style={{ overflow: 'hidden', borderRadius: 8 }}
  >
    <LinearGradient
      colors={['#3ddc84', '#00c2b2']}
      style={{ flex: 1, paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}
    >
      <Text style={{ color: '#fff', fontWeight: 'bold' }}>{text}</Text>
    </LinearGradient>
  </Button>
);