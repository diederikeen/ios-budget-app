import { ReactNode } from "react";
import { Pressable, StyleProp, StyleSheet, ViewProps, ViewStyle } from "react-native";
import { theme } from "../../theme";
import { Text } from "react-native-elements";

interface Props {
  onPress: () => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Button({onPress, children, style}: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.primaryButton, style]}>
      <Text style={{
        color: theme.colors.button.primary.text,
        fontFamily: 'WorkSans-Bold',
      }}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: theme.colors.button.primary.background,
    width: '100%',
    height: 50,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
