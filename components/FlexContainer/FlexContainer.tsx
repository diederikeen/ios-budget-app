import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface Props {
  children: ReactNode;
  flexDirection?: 'column' | 'row';
  rowGap?: number;
  columnGap?: number;
  gap?: number;
  style?: StyleProp<ViewStyle>;
  flex?: number;
}

export function FlexContainer({ flexDirection = 'column', gap, rowGap, columnGap, children, style, flex = 0 }: Props) {
  return (
    <View style={[{gap, rowGap, columnGap, flexDirection, flex, display: 'flex'}, style]}>
      {children}
    </View>
  )
}
