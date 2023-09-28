import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../theme";
import { AppHeader } from "../../components/AppHeader/AppHeader";

interface SlotProps {
  label: string;
  icon: string;
  action: () => void;
}

export interface HeaderOptions {
  title: string;
  leftSlot?: SlotProps;
  rightSlot?: SlotProps;
}

interface Props  {
  hasHeader?: boolean;
  children: ReactNode;
  headerOptions?: HeaderOptions;
}


export function DefaultLayout({ children, hasHeader = false, headerOptions }: Props) {
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['left', 'right']} style={{flex: 1,}}>
        <View style={[styles.wrapper, { paddingTop: hasHeader ? 0 : 80 }]}>
          {hasHeader ? <AppHeader {...headerOptions} /> : null }
          {children}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    display: 'flex',
    flexDirection: 'column',
  }
});
