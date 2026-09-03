import React from "react";
import { View } from "react-native";
import { HStack } from "@/src/components/ui/hstack";
import { VStack } from "@/src/components/ui/vstack";
import { Text } from "@/src/components/ui/text";
import { Pressable } from "@/src/components/ui/pressable";
import { Icon } from "@/src/components/ui/icon";
import { Star, ShieldCheck, MessageSquare } from "lucide-react-native";
import { ProviderItem } from "@/src/types/services.types";

interface VipProviderCardProps {
  provider: ProviderItem;
  onContact: (provider: ProviderItem) => void;
}

export function VipProviderCard({ provider, onContact }: VipProviderCardProps) {
  const fullName = `${provider.user?.name || "Especialista"} ${provider.user?.last_name || ""}`.trim();
  const serviceName = provider.service?.service_type || "Profesional";
  const initials = `${provider.user?.name?.[0] || "P"}${provider.user?.last_name?.[0] || ""}`.toUpperCase();

  return (
    <Pressable
      onPress={() => onContact(provider)}
      className="w-56 mr-4 bg-white rounded-2xl p-4 border-2 border-brand shadow-soft-2 active:scale-[0.98] transition-transform"
    >
      {/* Fila superior: Rating + Badge Verificado */}
      <HStack className="items-center justify-between mb-3">
        <HStack className="items-center bg-amber-50 px-2 py-0.5 rounded-full" space="xs">
          <Icon as={Star} size="xs" className="text-amber-500 fill-amber-500" />
          <Text className="text-xs font-bold text-amber-700">
            {Number(provider.rating || 5.0).toFixed(2)}
          </Text>
        </HStack>

        <HStack className="items-center bg-emerald-50 px-2 py-0.5 rounded-full" space="xs">
          <Icon as={ShieldCheck} size="xs" className="text-emerald-600" />
          <Text className="text-[10px] font-bold text-emerald-700 uppercase">
            Verificado
          </Text>
        </HStack>
      </HStack>

      {/* Avatar y Datos del Proveedor */}
      <VStack className="items-center text-center my-1" space="xs">
        <View className="w-14 h-14 rounded-full bg-brand/15 items-center justify-center border-2 border-brand/30 mb-1">
          <Text className="text-brand font-extrabold text-base tracking-wider">
            {initials}
          </Text>
        </View>

        <Text
          className="text-sm font-bold text-typography-900 text-center"
          numberOfLines={1}
        >
          {fullName}
        </Text>

        <Text
          className="text-xs font-semibold text-brand text-center capitalize"
          numberOfLines={1}
        >
          {serviceName}
        </Text>

        {provider.professional_experience && (
          <Text
            className="text-[11px] text-typography-400 text-center mt-0.5"
            numberOfLines={1}
          >
            {provider.professional_experience}
          </Text>
        )}
      </VStack>

      {/* Botón Contactar */}
      <Pressable
        onPress={() => onContact(provider)}
        className="mt-3 bg-brand/10 hover:bg-brand py-2 px-3 rounded-xl flex-row items-center justify-center space-x-1 border border-brand/20 active:bg-brand"
      >
        <Icon as={MessageSquare} size="xs" className="text-brand mr-1.5" />
        <Text className="text-xs font-bold text-brand">Contactar</Text>
      </Pressable>
    </Pressable>
  );
}
