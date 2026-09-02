import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import { useLogin } from "@/src/hooks/auth/useLogin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/src/schemas/auth.schema";

import { HStack } from "@/src/components/ui/hstack";
import { Text } from "@/src/components/ui/text";
import { Button, ButtonText } from "@/src/components/ui/button";
import { AppInput } from "@/src/components/AppComponents/AppInput";
import { AppButton } from "@/src/components/AppComponents/AppButton";
import { AppHeader } from "@/src/components/AppComponents/AppHeader";
import { AppSocial } from "@/src/components/AppComponents/AppSocial";
import { VStack } from "@/src/components/ui/vstack";

export default function LoginScreen() {
  const loginMutation = useLogin();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onError: (error) => {
        const msg = error.message.toLowerCase();
        if (
          msg.includes("invalid login credentials") ||
          msg.includes("invalid") ||
          msg.includes("credentials")
        ) {
          setError("password", {
            message: "Correo o contraseña incorrectos.",
          });
        } else if (msg.includes("email not confirmed")) {
          setError("root", {
            message:
              "Debes verificar tu correo antes de iniciar sesión. Revisa tu bandeja de entrada.",
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
              title="¡Bienvenido de vuelta!"
              subtitle="Inicia sesión para continuar."
            />

            <VStack space="sm">
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
                placeholder="••••••••"
                isPassword
                error={errors.password?.message}
              />
            </VStack>

            {/* Enlace de Olvidé mi contraseña */}
            <Button
              variant="link"
              className="self-end mt-1 mb-2 p-0"
              onPress={() => router.push("/(auth)/forgot-password")}
            >
              <ButtonText className="text-brand text-sm font-semibold">
                ¿Olvidaste tu contraseña?
              </ButtonText>
            </Button>

            {/* Error global */}
            {errors.root && (
              <View className="bg-error-50 border border-error-200 rounded-xl px-4 py-3 mb-4">
                <Text className="text-error-600 text-sm text-center">
                  {errors.root.message}
                </Text>
              </View>
            )}

            <AppButton
              title="Iniciar Sesión"
              onPress={handleSubmit(onSubmit)}
              isLoading={loginMutation.isPending}
              className="mt-2"
            />

            <AppSocial />

            <View className="flex-1 justify-end mt-6">
              <HStack className="justify-center items-center">
                <Text className="text-typography-500 font-medium">
                  ¿No tienes cuenta?{" "}
                </Text>
                <Button
                  variant="link"
                  className="p-0"
                  onPress={() => router.replace("/(auth)/register")}
                >
                  <ButtonText className="text-brand font-bold text-base">
                    Regístrate
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
