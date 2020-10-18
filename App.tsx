import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import * as Updates from 'expo-updates';
import { 
  NativeModules,
  Button,
  StyleSheet, 
  Text, 
  View 
} from 'react-native';

import ToastExample from './ToastExample';

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
    //updateApp();
    //console.log({ NativeModules });
  }, []);

  function letsRoll() {
    ToastExample.show("Sofia");
  }

  return (
    <View style={styles.container}>
      <Text>TOP!!!</Text>
      <Button
        title="Não me Pressione!"
        onPress={ letsRoll }
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
