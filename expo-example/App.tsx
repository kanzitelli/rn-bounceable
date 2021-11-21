import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, Linking} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import {Bounceable} from 'rn-bounceable';

export default function App() {
  const [text, setText] = useState('Press any component below');
  const imageSource = {uri: 'https://static.expo.dev/static/brand/square-512x512.png'};

  const changeText = (text: string) => () => setText(text);

  return (
    <ScrollView contentContainerStyle={S.container}>
      <StatusBar style="auto" />

      <View style={{paddingBottom: 24}}>
        <Bounceable onPress={() => Linking.openURL('https://github.com/kanzitelli/rn-bounceable')}>
          <Text style={{fontSize: 32, textDecorationLine: 'underline', color: 'blue'}}>
            RN Bounceable ⎆
          </Text>
        </Bounceable>
      </View>

      <View style={S.bounceables}>
        <Text>{text}</Text>

        <View style={S.bounceable}>
          <Bounceable
            onPress={changeText('text:onPress')}
            onLongPress={changeText('text:onLongPress')}
          >
            <Text style={S.text}>Bounceable Text</Text>
          </Bounceable>
        </View>

        <View style={S.bounceable}>
          <Bounceable
            onPress={changeText('image:onPress')}
            onLongPress={changeText('image:onLongPress')}
          >
            <Image style={S.image} source={imageSource} />
          </Bounceable>
        </View>

        <View style={S.bounceable}>
          <Bounceable
            onPress={changeText('image+text:onPress')}
            onLongPress={changeText('image+text:onLongPress')}
          >
            <View style={{alignItems: 'center'}}>
              <Image style={S.image} source={imageSource} />
              <Text style={S.text}>Bounceable image and text</Text>
            </View>
          </Bounceable>
        </View>

        <View style={S.bounceable}>
          <Bounceable
            onPress={changeText('image+text:onPress & delayActiveScale')}
            onLongPress={changeText('image+text:onLongPress & delayActiveScale')}
            delayActiveScale={500}
          >
            <View style={{alignItems: 'center'}}>
              <Image style={S.image} source={imageSource} />
              <Text style={S.text}>Bounceable image and text with active scale delay 500ms</Text>
            </View>
          </Bounceable>
        </View>
      </View>
    </ScrollView>
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
