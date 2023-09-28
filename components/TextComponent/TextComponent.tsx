import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

import { theme } from '../../theme';

interface Props {
  content: string | React.ReactNode;
  style?: StyleProp<TextStyle>,
  fontWeight?: '400' | '500' | '600'; 
}

function getFontFamily(fontWeight: Props['fontWeight']) {
  let family = '';
  switch(fontWeight) {
    case '500':
      family = 'WorkSans-Medium';
      break;
    case '600':
      family = 'WorkSans-Bold';
      break;
    default:
      family = 'WorkSans-Regular';
    break;
  }

  return family;
};

export function TextComponent({ content, fontWeight, style }: Props) {
  const fontFamily = getFontFamily(fontWeight);
  return (
    <Text style={[{...styles.text, fontFamily}, style]}>{content}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 16,
    fontWeight: "400",
    color: theme.colors.text.primary
  }
});
