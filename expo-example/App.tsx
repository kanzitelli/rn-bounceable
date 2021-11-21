import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View, Alert, Image, Linking} from 'react-native';
import {Bounceable} from 'rn-bounceable';

export default function App() {
  const imageSource = {uri: 'https://static.expo.dev/static/brand/square-512x512.png'};

  return (
    <View style={S.container}>
      <StatusBar style="auto" />

      <View style={{paddingBottom: 24}}>
        <Bounceable onPress={() => Linking.openURL('https://github.com/kanzitelli/rn-bounceable')}>
          <Text style={{fontSize: 32, textDecorationLine: 'underline', color: 'blue'}}>
            RN Bounceable ⎆
          </Text>
        </Bounceable>
      </View>

      <View style={S.bounceables}>
        <View style={S.bounceable}>
          <Bounceable
            onPress={() => Alert.alert('text:onPress')}
            onLongPress={() => Alert.alert('text:onLongPress')}
          >
            <Text style={S.text}>Bounceable Text</Text>
          </Bounceable>
        </View>

        <View style={S.bounceable}>
          <Bounceable
            onPress={() => Alert.alert('image:onPress')}
            onLongPress={() => Alert.alert('image:onLongPress')}
          >
            <Image style={S.image} source={imageSource} />
          </Bounceable>
        </View>

        <View style={S.bounceable}>
          <Bounceable
            onPress={() => Alert.alert('image+text:onPress')}
            onLongPress={() => Alert.alert('image+text:onLongPress')}
          >
            <View style={{alignItems: 'center'}}>
              <Image style={S.image} source={imageSource} />
              <Text style={S.text}>Bounceable image and text</Text>
            </View>
          </Bounceable>
        </View>

        <View style={S.bounceable}>
          <Bounceable
            onPress={() => Alert.alert('image+text:onPress & delayActiveScale')}
            onLongPress={() => Alert.alert('image+text:onLongPress & delayActiveScale')}
            delayActiveScale={500}
          >
            <View style={{alignItems: 'center'}}>
              <Image style={S.image} source={imageSource} />
              <Text style={S.text}>Bounceable image and text with active scale delay</Text>
            </View>
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
    alignItems: 'center',
  },
  bounceable: {
    marginVertical: 20,
  },
  text: {
    fontSize: 22,
    marginTop: 8,
    textAlign: 'center',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 20,
  },
});
