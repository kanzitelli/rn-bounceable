<p align="center">
  <img src="https://xxx-files.ggc.team/oss/rn-bounceable/logo.png" width="80%" title="Logo">
</p>

## Quick start

```bash
> yarn add rn-bounceable
```

Make sure you have [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) and [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler) installed in your project.

## Usage

```tsx
import {Image} from 'react-native';
import {Bounceable} from 'rn-bounceable';

class Screen = () => {
  return (
    <Bounceable>
      <Image source={{uri: 'https://static.expo.dev/static/brand/square-512x512.png'}} />
    </Bounceable>
  )
}
```

### Expo Web

Since `rn-bounceable` uses Reanimated 2, we need its Babel plugin to be applied. Expo Web doesn't transpile modules by default, so we'll need to tell it to transpile the library.

1. Install `@expo/webpack-config`:

```
yarn add -D @expo/webpack-config
```

2. Create `webpack.config.js` in the root of your project:

```
const createExpoWebpackConfigAsync = require('@expo/webpack-config')

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: { dangerouslyAddModulePathsToTranspile: ['rn-bounceable'] },
    },
    argv
  )

  return config
}
```

Don't forget to add `webpack.config.js` into `tsconfig.json` under `exclude` section, if needed.

##### Available props

```tsx
type BounceableProps = {
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean; // default: false
  noBounce?: boolean; // default: false
  immediatePress?: boolean; // default: true
  delayLongPress?: number; // default: 800
  activeScale?: number; // default: 0.95
  delayActiveScale?: number; // default: 0
  springConfig?: Animated.WithSpringConfig; // default: { damping: 10, mass: 1, stiffness: 300 }
  contentContainerStyle?: StyleProp<ViewStyle>;
};
```

## Example

Examples could be found in `expo-example` folder or in [expo-starter](https://github.com/kanzitelli/expo-starter), [rn-starter](https://github.com/kanzitelli/rn-starter) and [rnn-starter](https://github.com/kanzitelli/rnn-starter).

See it in Expo Go - https://expo.io/@kanzitelli/rn-bounceable-example.

This library was bootstrapped from [kanzitelli/if-component](https://github.com/kanzitelli/if-component).

https://user-images.githubusercontent.com/4402166/142771470-a1210a92-9a74-4205-b023-b8ac2403dd84.MP4

## License

This project is [MIT licensed](https://github.com/kanzitelli/rn-bounceable/blob/master/LICENSE.md)
