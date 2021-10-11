import * as React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';

export type BouncableProps = {
  disabled?: boolean;
  onPress?: () => void;
  activeScale?: number;
  springConfig?: Animated.WithSpringConfig;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export const Bounceable: React.FC<BouncableProps> = ({
  children,
  disabled = false,
  onPress,
  activeScale = 0.95,
  springConfig = {
    damping: 10,
    mass: 1,
    stiffness: 300,
  },
  contentContainerStyle,
}) => {
  const scale = useSharedValue(1);
  const sz = useAnimatedStyle(() => {
    'worklet';

    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });

  return (
    <TapGestureHandler
      shouldCancelWhenOutside={true}
      onHandlerStateChange={({nativeEvent}) => {
        if (disabled) {
          return;
        }
        const {state} = nativeEvent;

        if (state === State.BEGAN) {
          scale.value = withSpring(activeScale, springConfig);
          return;
        }

        if (state === State.END) {
          if (onPress) {
            runOnJS(onPress)();
          }
          scale.value = withSpring(1, springConfig);
          return;
        }

        if (state === State.UNDETERMINED || state === State.FAILED || state === State.CANCELLED) {
          scale.value = withSpring(1, springConfig);
          return;
        }
      }}
    >
      <Animated.View style={[contentContainerStyle, sz]}>{children}</Animated.View>
    </TapGestureHandler>
  );
};
