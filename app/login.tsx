import { View } from 'react-native';
import { AuthInput } from '../src/components/AuthInput';
import { GradientButton } from '../src/components/GradientButton';
import { SnackbarMessage } from '../src/components/SnackbarMessage';
import { useAuth } from '../src/context/AuthContext';
import { isValidEmail } from '../src/utils/validators';

export default function LoginScreen() {
  const { login } = useAuth();
  // State + handlers here...

  return (
    <View style={{ padding: 20 }}>
      <AuthInput label="Email" value={email} onChangeText={setEmail} />
      <AuthInput label="Password" value={password} onChangeText={setPassword} />
      <GradientButton text="Login" onPress={handleLogin} />
      <SnackbarMessage visible={errorVisible} message={errorMessage} />
    </View>
  );
}