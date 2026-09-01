import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "expo-router";

import { Heading } from "@/src/components/ui/heading";
import { Text } from "@/src/components/ui/text";
import { VStack } from "@/src/components/ui/vstack";
import { HStack } from "@/src/components/ui/hstack";
import { Card } from "@/src/components/ui/card";
import { Icon } from "@/src/components/ui/icon";
import { SearchIcon, CalendarIcon } from "lucide-react-native";

export default function ServicesScreen() {
  const { session } = useAuth();
  const user = session?.user;
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [activeOrdersCount, setActiveOrdersCount] = useState(0);

  useEffect(() => {
    async function fetchDashboardData() {
      if (!user?.id) return;

      const { data } = await supabase
        .from("user")
        .select("*")
        .eq("id", user.id)
        .single();
      setProfile(data);

      const { count } = await supabase
        .from("order")
        .select("*", { count: "exact", head: true })
        .eq("client_id", user.id)
        .in("order_status", ["Pendiente", "Aceptado", "En Progreso"]);

      if (count !== null) setActiveOrdersCount(count);
    }
    fetchDashboardData();
  }, [user]);

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <ScrollView>
        <VStack className="p-6" space="xl">
          <VStack space="xs">
            <Heading size="2xl">Hola, {profile?.name || "Usuario"}</Heading>
            <Text size="md" className="text-typography-500">
              ¿Qué necesitas hoy?
            </Text>
          </VStack>

          <Card
            className="bg-primary-50 p-4 border border-primary-200"
            onTouchEnd={() => router.push("/(tabs)/explorer/explorer-screen")}
          >
            <HStack space="md" className="align-center">
              <View className="p-3 bg-primary-100 rounded-full">
                <Icon as={SearchIcon} className="text-primary-600" />
              </View>
              <VStack>
                <Heading size="sm">Explorar Profesionales</Heading>
                <Text size="xs" className="text-typography-500">
                  Encuentra al experto ideal para tu proyecto
                </Text>
              </VStack>
            </HStack>
          </Card>

          <Card
            className="bg-secondary-50 p-4 border border-secondary-200"
            onTouchEnd={() => router.push("/(tabs)/orders/orders-screen")}
          >
            <HStack space="md" className="align-center">
              <View className="p-3 bg-secondary-100 rounded-full">
                <Icon as={CalendarIcon} className="text-secondary-600" />
              </View>
              <VStack>
                <Heading size="sm">Tus Órdenes ({activeOrdersCount})</Heading>
                <Text size="xs" className="text-typography-500">
                  Revisa el estado de tus solicitudes activas
                </Text>
              </VStack>
            </HStack>
          </Card>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
