import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  backgroundColor?: string;
  scrollable?: boolean;
};

export default function LayoutShell({
  children,
  backgroundColor = '#fff',
  scrollable = false,
}: LayoutProps) {
  const theme = useColorScheme();
  const bg = theme === 'dark' ? '#121212' : backgroundColor;

  const Wrapper = scrollable ? ScrollView : SafeAreaView;

  return (
    <Wrapper
      style={{
        flex: 1,
        backgroundColor: bg,
      }}
      contentContainerStyle={scrollable ? { flexGrow: 1 } : undefined}
    >
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      {children}
    </Wrapper>
  );
}