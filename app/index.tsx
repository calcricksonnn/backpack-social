import { SafeAreaView, ScrollView } from 'react-native';
import WelcomeCard from '@components/WelcomeCard';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <WelcomeCard />
        {/* We’ll layer more: Map preview, Journey button, etc. */}
      </ScrollView>
    </SafeAreaView>
  );
}