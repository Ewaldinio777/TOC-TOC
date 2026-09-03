import React, { useState } from "react";
import { View, Linking, Alert } from "react-native";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@/src/components/ui/modal";
import { Heading } from "@/src/components/ui/heading";
import { Text } from "@/src/components/ui/text";
import { HStack } from "@/src/components/ui/hstack";
import { VStack } from "@/src/components/ui/vstack";
import { Pressable } from "@/src/components/ui/pressable";
import { Icon } from "@/src/components/ui/icon";
import {
  X,
  MessageCircle,
  Phone,
  MessageSquareShare,
  Star,
  ShieldCheck,
} from "lucide-react-native";
import { ProviderItem } from "@/src/types/services.types";
import { useAuth } from "@/src/context/AuthContext";
import { useContactProvider } from "@/src/hooks/servicios/useContactProvider";
import { useRouter } from "expo-router";

interface ContactProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: ProviderItem | null;
}

export function ContactProviderModal({
  isOpen,
  onClose,
  provider,
}: ContactProviderModalProps) {
  const { session } = useAuth();
  const router = useRouter();
  const contactMutation = useContactProvider();
  const [loadingChat, setLoadingChat] = useState(false);

  if (!provider) return null;

  const fullName = `${provider.user?.name || "Especialista"} ${provider.user?.last_name || ""}`.trim();
  const serviceName = provider.service?.service_type || "Servicio General";
  const initials = `${provider.user?.name?.[0] || "P"}${provider.user?.last_name?.[0] || ""}`.toUpperCase();
  const prefix = provider.user?.prefixes_number || "";
  const phone = (provider as any).user?.phone || "";
  const rawPhone = `${prefix}${phone}`.replace(/\D/g, "");

  // Iniciar chat dentro de TOC-TOC
  const handleStartChat = async () => {
    if (!session?.user?.id) {
      Alert.alert(
        "Inicia sesión",
        "Debes iniciar sesión para comunicarte con los proveedores.",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Iniciar sesión", onPress: () => router.push("/(auth)/login") },
        ]
      );
      return;
    }

    try {
      setLoadingChat(true);
      await contactMutation.mutateAsync({
        clientId: session.user.id,
        providerId: provider.id,
        serviceId: provider.services_id,
      });

      onClose();
      // Navegar a la pestaña de chats
      router.push("/(tabs)/chats/chats-screen");
    } catch (err: any) {
      Alert.alert("Error", err.message || "No se pudo iniciar el chat.");
    } finally {
      setLoadingChat(false);
    }
  };

  // Realizar llamada telefónica
  const handleCall = () => {
    if (!rawPhone) {
      Alert.alert("Número no disponible", "El proveedor no tiene un teléfono público registrado.");
      return;
    }
    Linking.openURL(`tel:${rawPhone}`);
  };

  // Contactar por WhatsApp
  const handleWhatsApp = () => {
    if (!rawPhone) {
      Alert.alert("WhatsApp no disponible", "El proveedor no tiene un número registrado.");
      return;
    }
    const cleanNumber = rawPhone.startsWith("0") ? `58${rawPhone.slice(1)}` : rawPhone;
    const msg = encodeURIComponent(
      `Hola ${fullName}, te contacto desde la aplicación TOC-TOC para consultar sobre tu servicio de ${serviceName}.`
    );
    Linking.openURL(`https://wa.me/${cleanNumber}?text=${msg}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalBackdrop />
      <ModalContent className="rounded-3xl p-5 bg-white">
        <ModalHeader className="border-b border-outline-100 pb-3 justify-between items-center">
          <Heading size="md" className="text-typography-900 font-bold">
            Contactar Proveedor
          </Heading>
          <ModalCloseButton className="p-1 rounded-full active:bg-background-100">
            <Icon as={X} size="sm" className="text-typography-500" />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody className="pt-4">
          <VStack space="md">
            {/* Cabecera del proveedor */}
            <HStack space="md" className="items-center bg-background-50 p-3 rounded-2xl border border-outline-100">
              <View className="w-14 h-14 rounded-full bg-brand/15 items-center justify-center border-2 border-brand/30">
                <Text className="text-brand font-extrabold text-lg">{initials}</Text>
              </View>

              <VStack className="flex-1" space="xs">
                <HStack className="items-center justify-between">
                  <Text className="text-base font-bold text-typography-900 flex-1 mr-1" numberOfLines={1}>
                    {fullName}
                  </Text>
                  <HStack className="items-center bg-amber-50 px-2 py-0.5 rounded-full" space="xs">
                    <Icon as={Star} size="xs" className="text-amber-500 fill-amber-500" />
                    <Text className="text-xs font-bold text-amber-700">
                      {Number(provider.rating || 5.0).toFixed(2)}
                    </Text>
                  </HStack>
                </HStack>

                <HStack className="items-center" space="xs">
                  <Text className="text-xs font-semibold text-brand capitalize">
                    {serviceName}
                  </Text>
                  <Text className="text-typography-300">•</Text>
                  <HStack className="items-center" space="xs">
                    <Icon as={ShieldCheck} size="xs" className="text-emerald-600" />
                    <Text className="text-[10px] font-bold text-emerald-700 uppercase">
                      Verificado
                    </Text>
                  </HStack>
                </HStack>
              </VStack>
            </HStack>

            {/* Descripción profesional */}
            {provider.professional_description && (
              <VStack space="xs" className="bg-background-50 p-3 rounded-xl">
                <Text className="text-xs font-bold text-typography-700 uppercase">
                  Sobre el servicio
                </Text>
                <Text className="text-xs text-typography-600 leading-relaxed">
                  {provider.professional_description}
                </Text>
              </VStack>
            )}

            {/* Canales de Comunicación */}
            <VStack space="xs" className="mt-1">
              <Text className="text-xs font-bold text-typography-500 uppercase tracking-wider mb-1">
                Elige cómo comunicarte:
              </Text>

              {/* Botón 1: Chat interno TOC-TOC */}
              <Pressable
                onPress={handleStartChat}
                disabled={loadingChat}
                className="flex-row items-center justify-between p-3.5 rounded-2xl bg-brand active:opacity-90 shadow-soft-1"
              >
                <HStack className="items-center" space="sm">
                  <View className="w-9 h-9 rounded-xl bg-white/20 items-center justify-center">
                    <Icon as={MessageCircle} size="sm" className="text-white" />
                  </View>
                  <VStack>
                    <Text className="text-white font-bold text-sm">
                      {loadingChat ? "Conectando..." : "Mensaje por Chat Toc Toc"}
                    </Text>
                    <Text className="text-white/80 text-[11px]">
                      Conversación directa en la app
                    </Text>
                  </VStack>
                </HStack>
              </Pressable>

              {/* Botón 2: WhatsApp */}
              <Pressable
                onPress={handleWhatsApp}
                className="flex-row items-center justify-between p-3.5 rounded-2xl bg-emerald-600 active:opacity-90 shadow-soft-1"
              >
                <HStack className="items-center" space="sm">
                  <View className="w-9 h-9 rounded-xl bg-white/20 items-center justify-center">
                    <Icon as={MessageSquareShare} size="sm" className="text-white" />
                  </View>
                  <VStack>
                    <Text className="text-white font-bold text-sm">Escribir por WhatsApp</Text>
                    <Text className="text-white/80 text-[11px]">Respuesta rápida en WhatsApp</Text>
                  </VStack>
                </HStack>
              </Pressable>

              {/* Botón 3: Llamar */}
              <Pressable
                onPress={handleCall}
                className="flex-row items-center justify-between p-3.5 rounded-2xl bg-white border border-outline-200 active:bg-background-50"
              >
                <HStack className="items-center" space="sm">
                  <View className="w-9 h-9 rounded-xl bg-typography-100 items-center justify-center">
                    <Icon as={Phone} size="sm" className="text-typography-800" />
                  </View>
                  <VStack>
                    <Text className="text-typography-900 font-bold text-sm">Llamar por Teléfono</Text>
                    <Text className="text-typography-500 text-[11px]">Contacto telefónico directo</Text>
                  </VStack>
                </HStack>
              </Pressable>
            </VStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
