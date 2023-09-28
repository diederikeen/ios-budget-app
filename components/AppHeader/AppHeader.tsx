import { Pressable, StyleSheet, View } from "react-native";
import { TextComponent } from "../TextComponent/TextComponent";
import { FlexContainer } from "../FlexContainer/FlexContainer";
import { theme } from "../../theme";
import { HeaderOptions } from "../../layouts/DefaultLayout/DefaultLayout";
import Icon from "react-native-vector-icons/FontAwesome";

const titleMap = {
  'Home': 'Transaction overview',
}

export function AppHeader({ title, leftSlot, rightSlot }: HeaderOptions) {
  return (
    <View style={styles.wrapper}>
      <FlexContainer flexDirection="row" style={styles.content}>
        {leftSlot ? renderSlot(leftSlot, 'left') : null}
        <TextComponent content={titleMap[title] ?? title} fontWeight="600" style={{fontSize: 16}} />
        {rightSlot ? renderSlot(rightSlot, 'right') : null}
      </FlexContainer>
    </View>
  )
}

function renderSlot(props: HeaderOptions['leftSlot'], direction: 'left' | 'right') {
  return (
    <Pressable onPress={props.action} style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
      {direction === 'left' ? <Icon name={props.icon} style={{fontSize: 14}} /> : null}
      <TextComponent content={props.label} />
      {direction === 'right' ? <Icon name={props.icon} style={{fontSize: 14}} /> : null}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  content: {
    paddingTop: theme.padding[3],
    paddingHorizontal: theme.padding.container,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    height: 80,
  }
});
