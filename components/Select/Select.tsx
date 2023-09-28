import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../../theme';

interface Option {
  label: string;
  value: string | number; 
}

interface Props {
  options: Option[],
  onValueChange: (val: string | number) => void;
}

function CustomIcon() {
  return (
    <Icon 
      color="#eee"
      name="chevron-down"
    />
  )
}

export function Select({ options, onValueChange }: Props) {
  return (
    <RNPickerSelect
      style={{
        iconContainer:styles.chevron,
        inputIOS: styles.select,
      }}
      items={options}
      onValueChange={onValueChange}
      Icon={CustomIcon}
    />
  )
}

const styles = StyleSheet.create({
  chevron: {
    right: 12,
    top: 15
  },
  select: {
    borderColor: "#eee",
    color: '#333',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 4,
    height: 46,
    paddingHorizontal: theme.padding[4],
    fontFamily: 'WorkSans-Medium',
    letterSpacing: -0.5,
  }
})
