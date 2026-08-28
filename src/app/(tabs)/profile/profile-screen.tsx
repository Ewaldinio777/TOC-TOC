import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/utils/supabase";

import { Button, ButtonText } from "@/src/components/ui/button";

export default function ProfileScreen() {
  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  return (
    <SafeAreaView>
      <View>
        <Text>Perfil</Text>
        <Button onPress={signOut}>
          <ButtonText>Logout</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
}
