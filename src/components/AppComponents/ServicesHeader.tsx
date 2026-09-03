import React from "react";
import { View } from "react-native";
import { HStack } from "@/src/components/ui/hstack";
import { VStack } from "@/src/components/ui/vstack";
import { Text } from "@/src/components/ui/text";
import { Heading } from "@/src/components/ui/heading";
import { Pressable } from "@/src/components/ui/pressable";
import { Icon } from "@/src/components/ui/icon";
import { Briefcase, Search, Sparkles } from "lucide-react-native";
import { router } from "expo-router";

interface ServicesHeaderProps {
  onSearchPress?: () => void;
}

export function ServicesHeader({ onSearchPress }: ServicesHeaderProps) {
  return (
    <VStack space="md" className="pt-2 pb-4">
      {/* Barra superior: Título de la app + Botón de Búsqueda rápida */}
      <HStack className="items-center justify-between">
        <HStack className="items-center" space="xs">
          <Heading size="xl" className="text-typography-900 font-extrabold tracking-tight">
            Toc Toc
          </Heading>
          <Text className="text-brand font-bold text-lg">· Servicios</Text>
        </HStack>

        {onSearchPress && (
          <Pressable
            onPress={onSearchPress}
            className="w-10 h-10 rounded-full bg-brand-light items-center justify-center active:opacity-70"
            accessibilityLabel="Buscar servicios"
          >
            <Icon as={Search} size="md" className="text-typography-800" />
          </Pressable>
        )}
      </HStack>

      {/* Botón Destacado: Convertirse en proveedor de servicio */}
      <Pressable
        onPress={() => router.push("/(tabs)/services/become-provider")}
        className="bg-gradient-to-r bg-white border-2 border-brand rounded-2xl p-3 shadow-soft-1 flex-row items-center justify-between active:scale-[0.99]"
      >
        <HStack className="items-center flex-1 mr-2" space="sm">
          <View className="w-10 h-10 rounded-xl bg-brand items-center justify-center">
            <Icon as={Briefcase} size="md" className="text-white" />
          </View>
          <VStack className="flex-1">
            <HStack className="items-center" space="xs">
              <Text className="text-typography-900 font-bold text-sm">
                ¿Ofreces algún oficio?
              </Text>
              <Icon as={Sparkles} size="xs" className="text-brand" />
            </HStack>
            <Text className="text-typography-500 text-xs">
              Conviértete en proveedor y consigue clientes
            </Text>
          </VStack>
        </HStack>

        <View className="bg-brand px-3 py-1.5 rounded-xl">
          <Text className="text-white font-bold text-xs">Unirme</Text>
        </View>
      </Pressable>

      {/* Mensaje de bienvenida claro */}
      <VStack space="xs" className="mt-1">
        <Heading size="2xl" className="text-typography-900 font-bold leading-tight">
          ¿Qué tipo de servicio necesitas?
        </Heading>
        <Text className="text-typography-500 text-sm">
          Encuentra a los mejores especialistas verificados cerca de ti.
        </Text>
      </VStack>
    </VStack>
  );
}
