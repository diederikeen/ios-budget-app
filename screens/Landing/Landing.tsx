import { View, Button, Alert } from "react-native";
import { supabase } from "../../utils/supabase/supabase";
import * as WebBrowser from 'expo-web-browser';
import { useAuth } from "../../providers/AuthProvider/AuthProvider";
import { DefaultLayout } from "../../layouts/DefaultLayout/DefaultLayout";


export function LandingScreen({ navigation }) {
  async function SignInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (data.url) {
      const res = await WebBrowser.openAuthSessionAsync(data.url);

      if (error) {
        Alert.alert(error.message);
      }
      const accessTokenRegex = /access_token=([^&]+)/;
      const refreshTokenRegex = /refresh_token=([^&]+)/;

      if (res.type === 'success') {
        const access_token = res?.url.match(accessTokenRegex)[1];
        const refresh_token = res?.url.match(refreshTokenRegex)[1];

        await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        navigation.navigate('root');
      }
    }
  };

  const { user } = useAuth();


  if (user) {
    navigation.navigate('root')
  }

  return (
    <DefaultLayout>
      <View>
        <Button onPress={() => SignInWithGoogle()} title="Google"/>
      </View>
    </DefaultLayout>
  )
}
