import { NavigationContainer } from '@react-navigation/native';
import { SheetProvider } from "react-native-actions-sheet";
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LandingScreen } from './screens/Landing/Landing';
import { HomeScreen } from './screens/Home/Home';
import { AuthProvider } from './providers/AuthProvider/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const Stack = createNativeStackNavigator();
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { AddTransactionScreen } from './screens/AddTransaction/AddTransaction';
import "./sheets";
import { RootNavigator } from './screens/RootNavigator/RootNavigator';

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isAppIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    'WorkSans-Bold': require('./assets/fonts/WorkSans-Bold.ttf'),
    'WorkSans-Medium': require('./assets/fonts/WorkSans-Medium.ttf'),
    'WorkSans-Regular': require('./assets/fonts/WorkSans-Regular.ttf'),
    'WorkSans-Light': require('./assets/fonts/WorkSans-Light.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      setAppIsReady(true);
      await SplashScreen.hideAsync();
    }
    prepare();
  }, []);

  if (!isAppIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <SheetProvider>
            <Stack.Navigator>
              <Stack.Screen
                name="Landing"
                component={LandingScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                  title: "root",
                }}
                name="root"
                component={RootNavigator}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                }}
                name="Home"
                component={HomeScreen}
              />
            </Stack.Navigator>
            <StatusBar/>
          </SheetProvider>
        </QueryClientProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

