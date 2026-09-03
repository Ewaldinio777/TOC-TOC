import React from "react";
import { View } from "react-native";
import { HStack } from "@/src/components/ui/hstack";
import { VStack } from "@/src/components/ui/vstack";
import { Text } from "@/src/components/ui/text";
import { Pressable } from "@/src/components/ui/pressable";
import { Icon } from "@/src/components/ui/icon";
import { Star, MapPin, MessageCircle } from "lucide-react-native";
import { ProviderItem } from "@/src/types/services.types";

interface ProviderCardProps {
  provider: ProviderItem;
  onContact: (provider: ProviderItem) => void;
}

export function ProviderCard({ provider, onContact }: ProviderCardProps) {
  const fullName = `${provider.user?.name || "Especialista"} ${provider.user?.last_name || ""}`.trim();
  const serviceName = provider.service?.service_type || "Servicio General";
  const initials = `${provider.user?.name?.[0] || "P"}${provider.user?.last_name?.[0] || ""}`.toUpperCase();
  const distance = provider.distance || "A 1.2 km";
  const quote = provider.professional_description || "Servicio profesional garantizado y de alta calidad.";

  return (
    <Pressable
      onPress={() => onContact(provider)}
      className="bg-white rounded-2xl p-4 mb-3 border border-outline-100 shadow-soft-1 active:bg-background-50 transition-colors"
    >
      <HStack space="md" className="items-start">
        {/* Foto o Iniciales del Perfil */}
        <View className="w-14 h-14 rounded-2xl bg-brand/10 items-center justify-center border border-brand/20">
          <Text className="text-brand font-extrabold text-lg">{initials}</Text>
        </View>

        {/* Información del Proveedor */}
        <VStack className="flex-1" space="xs">
          {/* Nombre y Calificación */}
          <HStack className="items-center justify-between">
            <Text className="text-base font-bold text-typography-900 flex-1 mr-2" numberOfLines={1}>
              {fullName}
            </Text>
            <HStack className="items-center bg-amber-50 px-2 py-0.5 rounded-full" space="xs">
              <Icon as={Star} size="xs" className="text-amber-500 fill-amber-500" />
              <Text className="text-xs font-bold text-amber-700">
                {Number(provider.rating || 5.0).toFixed(2)}
              </Text>
            </HStack>
          </HStack>

          {/* Especialidad y Distancia */}
          <HStack className="items-center" space="xs">
            <Text className="text-xs font-medium text-brand capitalize">
              {serviceName}
            </Text>
            <Text className="text-typography-300">•</Text>
            <HStack className="items-center" space="xs">
              <Icon as={MapPin} size="xs" className="text-typography-400" />
              <Text className="text-xs text-typography-500">{distance}</Text>
            </HStack>
          </HStack>

          {/* Cita Descriptiva: > "Especialista en..." */}
          <View className="mt-1 bg-background-50 rounded-xl px-2.5 py-1.5 border-l-2 border-brand">
            <Text className="text-xs text-typography-600 italic" numberOfLines={2}>
              &gt; &ldquo;{quote}&rdquo;
            </Text>
          </View>

          {/* Botón rápido para contactar */}
          <HStack className="justify-end mt-2">
            <Pressable
              onPress={() => onContact(provider)}
              className="flex-row items-center px-3 py-1.5 rounded-xl bg-brand/10 active:bg-brand/20 border border-brand/20"
            >
              <Icon as={MessageCircle} size="xs" className="text-brand mr-1.5" />
              <Text className="text-xs font-bold text-brand">Contactar</Text>
            </Pressable>
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  );
}
