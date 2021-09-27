import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View, Alert, Image} from 'react-native';
import {Bounceable} from 'rn-bounceable';

export default function App() {
  return (
    <View style={S.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />

      <View style={S.bounceables}>
        <View style={S.bounceable}>
          <Bounceable onPress={() => Alert.alert('Text')}>
            <Text style={S.text}>Bounceable Text</Text>
          </Bounceable>
        </View>

        <View style={S.bounceable}>
          <Bounceable onPress={() => Alert.alert('Image')}>
            <Image
              style={S.image}
              source={{uri: 'https://static.expo.dev/static/brand/square-512x512.png'}}
            />
          </Bounceable>
        </View>
      </View>
    </View>
  );
}

const S = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bounceables: {
    marginTop: 60,
    alignItems: 'center',
  },
  bounceable: {
    marginVertical: 20,
  },
  text: {
    fontSize: 22,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 20,
  },
});
