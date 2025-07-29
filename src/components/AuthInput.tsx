import React from 'react';
import { View } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';

export const AuthInput = ({ label, value, onChange, error, secure, toggleSecure }) => (
  <View style={{ marginBottom: 16 }}>
    <TextInput
      label={label}
      value={value}
      onChangeText={onChange}
      secureTextEntry={secure}
      error={!!error}
      right={toggleSecure && (
        <TextInput.Icon icon={secure ? 'eye-off' : 'eye'} onPress={toggleSecure} />
      )}
    />
  </View>
);