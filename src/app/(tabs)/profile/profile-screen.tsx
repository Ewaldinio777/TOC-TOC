import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";

import { Button, ButtonText } from "@/src/components/ui/button";
import { VStack } from "@/src/components/ui/vstack";
import { Heading } from "@/src/components/ui/heading";
import { Text } from "@/src/components/ui/text";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { useAuth } from "@/src/context/AuthContext";

export default function ProfileScreen() {
  const { session, logout } = useAuth();
  const user = session?.user;
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (user?.id) {
        const { data } = await supabase
          .from("user")
          .select("*")
          .eq("id", user.id)
          .single();
        setProfile(data);
      }
    }
    fetchProfile();
  }, [user]);

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <VStack className="flex-1 p-6 align-center" space="xl">
        <Avatar size="2xl" className="mt-4 bg-primary-200">
          {profile?.avatar_url ? (
            <AvatarImage source={{ uri: profile.avatar_url }} />
          ) : (
            <AvatarFallbackText>
              {profile?.name || user?.email || "U"}
            </AvatarFallbackText>
          )}
        </Avatar>

        <VStack className="align-center" space="xs">
          <Heading size="2xl">
            {profile?.name} {profile?.last_name}
          </Heading>
          <Text size="md" className="text-typography-500">
            {user?.email}
          </Text>
          {profile?.phone && (
            <Text size="sm" className="text-typography-400">
              {profile.phone}
            </Text>
          )}
        </VStack>

        <VStack space="md" className="w-full mt-8">
          <Button
            variant="outline"
            onPress={() => router.push("/(tabs)/profile/become-provider")}
            className="w-full border-primary-500"
          >
            <ButtonText className="text-primary-600">
              Convertirme en Profesional
            </ButtonText>
          </Button>

          <Button
            onPress={logout}
            variant="solid"
            action="negative"
            className="w-full"
          >
            <ButtonText>Cerrar Sesión</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
