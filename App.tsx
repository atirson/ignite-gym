import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';
import { Loading } from '@components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider>
      <StatusBar translucent style="light" backgroundColor='transparent' />
      { !fontsLoaded ? <Text>Hello World</Text> : <Loading /> }
    </NativeBaseProvider>
  );
}

