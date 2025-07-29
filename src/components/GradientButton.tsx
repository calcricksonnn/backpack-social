import React from 'react';
import { Pressable, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const GradientButton = ({ text, onPress }) => (
  <Pressable onPress={onPress}>
    <LinearGradient
      colors={['#5EA3F6', '#007AFF']}
      style={{
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 8,
      }}
    >
      <Text style={{ color: 'white', fontWeight: '600' }}>{text}</Text>
    </LinearGradient>
  </Pressable>
);