### Quick start

Make sure you have [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) and [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler) installed in your project.

```bash
> yarn add rn-bounceable
```

### Usage

```tsx
import {Bounceable} from 'rn-bounceable';

class OrdersScreen = () => {
  return (
    <Bounceable onPress={() => alert('onPress')}>
      <Image source={imageSource} />
    </Bounceable>
  )
}
```

### Example

Example could be found under `expo-example` folder.

See it in Expo Go - https://expo.io/@kanzitelli/rn-bounceable-example.

This library was bootstrapped from [kanzitelli/if-component](https://github.com/kanzitelli/if-component).
