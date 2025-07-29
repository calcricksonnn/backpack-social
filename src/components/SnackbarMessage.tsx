import React from 'react';
import { Text, View } from 'react-native';

export const SnackbarMessage = ({ message, visible }) => {
  if (!visible) return null;

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 40,
        backgroundColor: '#333',
        padding: 12,
        borderRadius: 8,
        alignSelf: 'center',
      }}
    >
      <Text style={{ color: 'white' }}>{message}</Text>
    </View>
  );
};