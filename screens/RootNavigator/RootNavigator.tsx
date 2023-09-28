import { View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from "../Home/Home";
import * as Haptics from 'expo-haptics';
import { TextComponent } from "../../components/TextComponent/TextComponent";
import { Tab, TabType } from "../../components/Tab/Tab";
import { AddTransactionScreen } from "../AddTransaction/AddTransaction";
import { theme } from "../../theme";


const NavigationTab = createBottomTabNavigator()

const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }

const screenOptions = {
  headerShown: false,
  tabBarShowLabel: false,
}

export function RootNavigator(props) {
  return (
      <NavigationTab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          tabBarStyle: {
            backgroundColor: theme.colors.background.primary,
            borderTopWidth: 2,
            borderTopColor: '#2A2552',
          },
          tabBarIcon: ({focused}) => {
            if (route.name === 'Home') {
              return (
                <Tab 
                  label="Home"
                  isFocused={focused}
                  type={TabType.Home}
                />
              )
            }
            if (route.name === 'AddTransaction') {
              return (
                <Tab 
                  label="Account"
                  isFocused={focused}
                  type={TabType.AddTransaction}
                />
              )
            }
          }
        })}
      >
        <NavigationTab.Screen
          name="Home"
          options={screenOptions}
          component={HomeScreen}
          listeners={{
            tabPress: e => {
              handlePress();
            },
          }}
        />
        <NavigationTab.Screen
          name="AddTransaction"
          options={screenOptions}
          component={AddTransactionScreen}
          listeners={{
            tabPress: e => {
              handlePress();
            },
          }}
        />
      </NavigationTab.Navigator>
  )
}
