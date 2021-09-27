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