import * as React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import {useMemo} from 'react';

type PureFunc = () => void;
export type BounceableProps = {
  disabled?: boolean;
  noBounce?: boolean;
  onPress?: PureFunc;
  immediatePress?: boolean; // indicates if press action should be fired right after or w/ small delay (when end animation will be finished)
  onLongPress?: PureFunc;
  delayLongPress?: number;
  activeScale?: number;
  delayActiveScale?: number;
  springConfig?: Animated.WithSpringConfig;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export const Bounceable: React.FC<BounceableProps> = ({
  children,
  disabled = false,
  noBounce = false,
  onPress,
  activeScale = 0.95,
  springConfig = {
    damping: 10,
    mass: 1,
    stiffness: 300,
  },
  contentContainerStyle,

  delayLongPress = 800,
  delayActiveScale = 0,
  onLongPress,
  immediatePress = true,
}) => {
  const onLongPressTimeoutId = useSharedValue<null | ReturnType<typeof setTimeout>>(null);
  const scale = useSharedValue(1);
  const isActive = useSharedValue(0);

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

  const beginScale = () => {
    scale.value = withSpring(activeScale, springConfig);
  };
  const endScale = () => {
    // clearing up
    isActive.value = 0;
    if (onLongPressTimeoutId.value !== null) {
      clearTimeout(Number(onLongPressTimeoutId.value));
      onLongPressTimeoutId.value = null;
    }

    scale.value = withSpring(1, springConfig);
  };

  const Children = useMemo(
    () => <Animated.View style={[contentContainerStyle, sz]}>{children}</Animated.View>,
    [contentContainerStyle, sz, children],
  );

  if (noBounce) {
    return Children;
  }

  return (
    <TapGestureHandler
      maxDurationMs={99999999}
      shouldCancelWhenOutside={true}
      onHandlerStateChange={({nativeEvent}) => {
        if (disabled) {
          return;
        }

        const {state} = nativeEvent;

        if (state === State.BEGAN) {
          isActive.value = 1;

          // delaying scale beginning
          if (delayActiveScale <= 0) {
            beginScale();
          } else {
            setTimeout(() => {
              if (isActive.value === 1) {
                beginScale();
              }
            }, delayActiveScale);
          }

          // onLongPress
          if (onLongPress) {
            onLongPressTimeoutId.value = setTimeout(() => {
              if (isActive.value === 1) {
                endScale();
                runOnJS(onLongPress)();
              }
            }, delayLongPress);
          }

          return;
        }

        if (state === State.END) {
          if (onPress && isActive.value === 1) {
            // mimicing bounce effect if delay active scale is set
            if (delayActiveScale > 0) {
              beginScale();
            }

            setTimeout(() => {
              endScale();
              if (!immediatePress) {
                runOnJS(onPress)();
              }
            }, 50);

            if (immediatePress) {
              runOnJS(onPress)();
            }

            return;
          }

          endScale(); // ending scaling here just in case
          return;
        }

        if (state === State.UNDETERMINED || state === State.FAILED || state === State.CANCELLED) {
          endScale();
          return;
        }
      }}
    >
      {Children}
    </TapGestureHandler>
  );
};
