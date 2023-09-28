import { ReactNode } from "react";
import {  View } from "react-native";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { theme } from "../../theme";

interface ActionSheetProps {
  children: ReactNode;
  title?: string;
  closeLabel?: string;
}

export function ActionSheetComponent(props: SheetProps<ActionSheetProps>) {
  return (
    <ActionSheet
      id={props.sheetId} 
      headerAlwaysVisible={true} 
      useBottomSafeAreaPadding
      containerStyle={{backgroundColor: theme.colors.background.primary}}
      >
      <View style={{
          paddingHorizontal: theme.padding.container,
          paddingVertical: theme.padding.container, 
          paddingBottom: 20,
        }}
      >
        {props.payload.children} 
      </View>
    </ActionSheet>
  )
}
