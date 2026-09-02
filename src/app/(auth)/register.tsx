import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, KeyboardAvoidingView, Platform } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/src/schemas/auth.schema";
import { useRegister } from "@/src/hooks/auth/useRegister";
import { router } from "expo-router";

import { HStack } from "@/src/components/ui/hstack";
import { VStack } from "@/src/components/ui/vstack";
import { Text } from "@/src/components/ui/text";
import { Button, ButtonText } from "@/src/components/ui/button";

import { AppInput } from "@/src/components/AppComponents/AppInput";
import { AppButton } from "@/src/components/AppComponents/AppButton";
import { AppHeader } from "@/src/components/AppComponents/AppHeader";
import { AppSocial } from "@/src/components/AppComponents/AppSocial";
import { AppSelect } from "@/src/components/AppComponents/AppSelect";
import { useDocumentTypes } from "@/src/hooks/auth/useDocumentTypes";
import { usePrefixesNumber } from "@/src/hooks/auth/usePrefixesNumber";

export default function RegisterScreen() {
  const registerMutation = useRegister();
  const { data: documentTypes = [] } = useDocumentTypes();
  const { data: prefixesNumber = [] } = usePrefixesNumber();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        // Tras el registro exitoso, llevar al login con mensaje de verificación
        router.replace("/(auth)/login");
      },
      onError: (error) => {
        const msg = error.message.toLowerCase();
        if (msg.includes("already registered") || msg.includes("already been registered")) {
          setError("email", {
            message: "Este correo ya está registrado.",
          });
        } else if (msg.includes("weak password") || msg.includes("password")) {
          setError("password", {
            message: "La contraseña no es lo suficientemente segura.",
          });
        } else {
          setError("root", {
            message: "Ocurrió un error inesperado. Inténtalo de nuevo.",
          });
        }
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-8 pt-10 pb-6">
            <AppHeader
              title="¡Crea tu cuenta!"
              subtitle="Regístrate y comienza a explorar."
            />

            <VStack space="xs">
              {/* Nombre y Apellido */}
              <HStack className="items-start gap-3">
                <View style={{ flex: 1 }}>
                  <AppInput
                    control={control}
                    name="name"
                    label="Nombre"
                    placeholder="Tu nombre"
                    error={errors.name?.message}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <AppInput
                    control={control}
                    name="last_name"
                    label="Apellido"
                    placeholder="Tu apellido"
                    error={errors.last_name?.message}
                  />
                </View>
              </HStack>

              {/* Documento */}
              <HStack className="items-start gap-3">
                <View style={{ flex: 1 }}>
                  <AppSelect
                    control={control}
                    options={documentTypes}
                    name="tipo_de_documento"
                    label="Tipo de doc."
                    placeholder="Seleccionar"
                    containerClassName="mb-3"
                    selectClassName="h-12"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <AppInput
                    control={control}
                    name="documento"
                    label="N° de documento"
                    placeholder="12345678"
                    keyboardType="number-pad"
                    containerClassName="mb-0"
                    inputClassName="h-12"
                    error={errors.documento?.message}
                  />
                </View>
              </HStack>

              {/* Teléfono */}
              <HStack className="items-start gap-3">
                <View style={{ flex: 1 }}>
                  <AppSelect
                    control={control}
                    options={prefixesNumber}
                    name="prefixes_number"
                    label="Prefijo"
                    placeholder="0414"
                    containerClassName="mb-3"
                    selectClassName="h-12"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <AppInput
                    control={control}
                    name="phone"
                    label="Teléfono"
                    placeholder="1234567"
                    keyboardType="phone-pad"
                    containerClassName="mb-0"
                    inputClassName="h-12"
                    error={errors.phone?.message}
                  />
                </View>
              </HStack>

              <AppInput
                control={control}
                name="state"
                label="Estado / Región"
                placeholder="Ej. Miranda, Caracas..."
                error={errors.state?.message}
              />

              <AppInput
                control={control}
                name="email"
                label="Correo electrónico"
                placeholder="tucorreo@ejemplo.com"
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email?.message}
              />

              <AppInput
                control={control}
                name="password"
                label="Contraseña"
                placeholder="Mínimo 8 caracteres"
                isPassword
                error={errors.password?.message}
              />
            </VStack>

            {/* Error global */}
            {errors.root && (
              <View className="bg-error-50 border border-error-200 rounded-xl px-4 py-3 mt-2">
                <Text className="text-error-600 text-sm text-center">
                  {errors.root.message}
                </Text>
              </View>
            )}

            <AppButton
              title="Crear cuenta"
              onPress={handleSubmit(onSubmit)}
              isLoading={registerMutation.isPending}
              className="mt-6"
            />

            <AppSocial />

            <View className="flex-1 justify-end mt-4">
              <HStack className="justify-center items-center">
                <Text className="text-typography-500 font-medium">
                  ¿Ya tienes cuenta?{" "}
                </Text>
                <Button
                  variant="link"
                  className="p-0"
                  onPress={() => router.replace("/(auth)/login")}
                >
                  <ButtonText className="text-brand font-bold text-base">
                    Inicia sesión
                  </ButtonText>
                </Button>
              </HStack>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
