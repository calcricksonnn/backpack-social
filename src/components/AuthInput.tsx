import React from 'react';
import { TextInput, View, Text } from 'react-native';

export const AuthInput = ({ label, value, onChangeText, placeholder }) => (
  <View style={{ marginVertical: 10 }}>
    <Text style={{ fontWeight: '500', marginBottom: 4 }}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={{
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
      }}
    />
  </View>
);