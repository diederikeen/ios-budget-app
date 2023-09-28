import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { TextComponent } from "../TextComponent/TextComponent";
import { theme } from "../../theme";

interface Props {
  isFocused: boolean;
  type: TabType;
  label: string;
}
export enum TabType {
  Home = 'Home',
  AddTransaction = 'AddTransaction',
}

export function Tab({ label, type, isFocused }: Props) {
  return (
    <View style={styles.container}>
      {type === TabType.Home ? <TabContent label={label} icon="home" isFocused={isFocused}/> : null}
      {type === TabType.AddTransaction ? <TabContent label={label} icon="user" isFocused={isFocused}/> : null}
    </View>
  )
}

interface TabProps {
  isFocused: boolean;
  icon: string;
  label: string;
}

const TabContent = ({isFocused, icon, label}:TabProps ) => {
  const textColor = isFocused ? theme.colors.button.primary.text : theme.colors.button.primary.background;
  return (
    <View style={[styles.tab]}>
      <Icon name={icon} style={{fontSize: 20, color: textColor}}/>
      <TextComponent content={label} style={{fontSize: 12, color: textColor}} fontWeight="500"/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.padding[4],
  },
  tab: {
    gap: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  isFocused: {
  }
})
