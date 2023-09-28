import { StyleSheet, View } from 'react-native';
import { Input } from '@rneui/themed';
import { theme } from '../../theme';
import { TextComponent } from '../TextComponent/TextComponent';
import { useState } from 'react';

interface Props {
  onChangeText: any;
  value: string;
  style?: Record<string, string>;
  placeholder?: string;
  label?: string;
  labelInset?: boolean;
  inputMode?: 'text' | 'numeric' | 'decimal' | 'tel' | 'search' | 'email' | 'url';
  multiLine?: boolean;
}

export default function InputComponent({
  onChangeText,
  value,
  style,
  placeholder,
  label,
  labelInset = false,
  inputMode = 'text',
  multiLine = false,
}: Props) {
  const [isFocussed, setIsFocussed] = useState(false);

  const focussedStyles = isFocussed ? styles.focussedInput : null;
  const insetLabelInputStyles = labelInset ? styles.insetLabelInput : null;
  const multiLineStyles = multiLine ? styles.multiLine : null;

  return (
    <View style={{position: 'relative'}}>
      {label ? <TextComponent 
        content={label} 
        style={labelInset ? styles.insetLabel : styles.label} 
        fontWeight="600"
        /> 
        : null
      }
      <Input
        multiline={multiLine}
        containerStyle={styles.container}
        inputStyle={[styles.input, focussedStyles, insetLabelInputStyles, multiLineStyles, style]}
        inputContainerStyle={styles.inputContainer}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        renderErrorMessage={false}
        inputMode={inputMode}
        onFocus={() => setIsFocussed(true)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  multiLine: {
    height: 75,
    paddingTop: theme.padding[3],
  },
  input: {
    margin: 0,
    backgroundColor: theme.colors.input.background,
    padding: theme.padding[4],
    height: 46,
    width: '100%',
    paddingHorizontal: theme.padding[4],
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#eee',
    paddingVertical: 0,
    fontSize: 15,
  },
  focussedInput: {
    borderColor: theme.colors.background.secondary,
  },
  inputContainer: {
    borderBottomWidth: 0,
    margin: 0,
    position: 'relative',
  },
  insetLabelInput: {
    textAlign: 'right'
  },
  label: {
    fontSize: 12,
    marginBottom: theme.padding[2]
  },
  insetLabel: {
    position: 'absolute',
    left: theme.padding[3],
    top: 15,
    fontSize: 12,
    zIndex: 1,
    color: theme.colors.input.insetLabel.color,
  },
  container: {
    paddingHorizontal: 0,
  }
});
