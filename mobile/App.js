import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { 
  useFonts,
  Montserrat_400Regular, 
  Montserrat_500Medium,
  Montserrat_700Bold 
} from '@expo-google-fonts/montserrat';

import Routes from './src/router';

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold
  });

  if(!fontsLoaded){
    return <AppLoading/>;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" translucent={false} />
      <Routes/>
    </>
  );
}

