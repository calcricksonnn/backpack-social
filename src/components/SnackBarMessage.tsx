import React from 'react';
import { Snackbar } from 'react-native-paper';

export const SnackbarMessage = ({ visible, onDismiss, message }) => (
  <Snackbar visible={visible} onDismiss={onDismiss} duration={3000}>
    {message}
  </Snackbar>
);