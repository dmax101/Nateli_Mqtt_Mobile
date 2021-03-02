import React, { useEffect } from 'react';

import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import {
  ImageBackground, 
  View 
} from 'react-native';

import Landing from './src/pages/Landing';
import img from './assets/bkgnd.png';
import splashImg from './assets/splash.png';

// Import das Fontes
import {
  useFonts,
  OpenSansCondensed_300Light,
  OpenSansCondensed_700Bold
} from '@expo-google-fonts/open-sans-condensed';

import { NotoSansJP_400Regular, NotoSansJP_700Bold } from '@expo-google-fonts/noto-sans-jp';

import styles from './styles';

import MQTTService from './src/services/mqttConnector';

export default function App() {

  useEffect(() => {
    async function updateApp() {
      const { isAvailable } = await Updates.checkForUpdateAsync();
      alert(isAvailable);

      if (isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    }
    function MQTTConnectionTest() {
      MQTTService(`${Date.now()}: Teste de Conexão`,"Status");
    }

    //MQTTConnectionTest()
    //updateApp();
  }, []);

  let [fontsLoaded] = useFonts ({
    OpenSansCondensed_300Light,
    OpenSansCondensed_700Bold,
    NotoSansJP_400Regular,
    NotoSansJP_700Bold
  })

  if (!fontsLoaded) {
    return (
      <AppLoading>
        <ImageBackground source={img} style={styles.image}/>
        <ImageBackground source={splashImg} style={styles.image}/>
      </AppLoading>
    ) 
  } else {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <ImageBackground source={img} style={styles.image}/>
        <View style={styles.main}>
          <Landing />
        </View>
      </View>
    );
  }
}
