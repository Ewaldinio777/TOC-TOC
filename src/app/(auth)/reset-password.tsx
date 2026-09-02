import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  ResetPasswordFormData,
} from "@/src/schemas/auth.schema";
import { useResetPassword } from "@/src/hooks/auth/useResetPassword";
import { useAuth } from "@/src/context/AuthContext";

import { VStack } from "@/src/components/ui/vstack";
import { Text } from "@/src/components/ui/text";
import { Button, ButtonText } from "@/src/components/ui/button";
import { Icon } from "@/src/components/ui/icon";
import { AppInput } from "@/src/components/AppComponents/AppInput";
import { AppButton } from "@/src/components/AppComponents/AppButton";
import {
  LockIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
} from "lucide-react-native";

export default function ResetPasswordScreen() {
  const resetMutation = useResetPassword();
  const { clearPasswordRecovery } = useAuth();
  const [passwordChanged, setPasswordChanged] = React.useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    resetMutation.mutate(data.password, {
      onSuccess: () => {
        setPasswordChanged(true);
        clearPasswordRecovery();
      },
      onError: (error) => {
        const msg = error.message.toLowerCase();
        if (msg.includes("weak") || msg.includes("short")) {
          setError("password", {
            message: "Usa una contraseña más segura (mínimo 8 caracteres).",
          });
        } else if (msg.includes("same password") || msg.includes("different")) {
          setError("password", {
            message: "La nueva contraseña debe ser diferente a la anterior.",
          });
        } else {
          setError("root", {
            message: "Ocurrió un error. Intenta solicitar un nuevo enlace.",
          });
        }
      },
    });
  };

  // ─── Estado: Contraseña cambiada con éxito ─────────────────────────────────
  if (passwordChanged) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 px-8 items-center justify-center">
          {/* Ícono de éxito */}
          <View className="w-28 h-28 bg-brand-light rounded-full items-center justify-center mb-8">
            <Icon as={CheckCircleIcon} size="xl" className="text-brand" />
          </View>

          <VStack space="md" className="items-center mb-10">
            <Text className="text-2xl font-bold text-typography-900 text-center">
              ¡Contraseña actualizada!
            </Text>
            <Text className="text-typography-500 text-center text-base leading-6">
              Tu contraseña ha sido cambiada con éxito. Ya puedes iniciar sesión
              con tu nueva contraseña.
            </Text>
          </VStack>

          <AppButton
            title="Ir al inicio de sesión"
            onPress={() => router.replace("/(auth)/login")}
          />
        </View>
      </SafeAreaView>
    );
  }

  // ─── Estado: Formulario de nueva contraseña ────────────────────────────────
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
          <View className="flex-1 px-8 pt-12 pb-6">
            {/* Ícono decorativo */}
            <View className="w-20 h-20 bg-brand-light rounded-full items-center justify-center mb-8">
              <Icon as={LockIcon} size="xl" className="text-brand" />
            </View>

            <VStack space="sm" className="mb-8">
              <Text className="text-3xl font-bold text-typography-900">
                Nueva{"\n"}contraseña
              </Text>
              <Text className="text-typography-500 text-base leading-6">
                Elige una contraseña segura para proteger tu cuenta.
              </Text>
            </VStack>

            {/* Indicador de seguridad */}
            <View className="bg-brand-light rounded-xl px-4 py-3 mb-6">
              <View className="flex-row items-center gap-2">
                <Icon
                  as={ShieldCheckIcon}
                  size="sm"
                  className="text-brand"
                />
                <Text className="text-brand text-sm font-medium">
                  Mínimo 8 caracteres · Mayúsculas y números recomendados
                </Text>
              </View>
            </View>

            <AppInput
              control={control}
              name="password"
              label="Nueva contraseña"
              placeholder="••••••••"
              isPassword
              error={errors.password?.message}
            />

            <AppInput
              control={control}
              name="confirmPassword"
              label="Confirmar contraseña"
              placeholder="••••••••"
              isPassword
              error={errors.confirmPassword?.message}
            />

            {/* Error global */}
            {errors.root && (
              <View className="bg-error-50 border border-error-200 rounded-xl px-4 py-3 mb-4">
                <Text className="text-error-600 text-sm text-center">
                  {errors.root.message}
                </Text>
              </View>
            )}

            <AppButton
              title="Cambiar contraseña"
              onPress={handleSubmit(onSubmit)}
              isLoading={resetMutation.isPending}
              className="mt-4"
            />

            <Button
              variant="link"
              className="self-center mt-6"
              onPress={() => router.replace("/(auth)/login")}
            >
              <ButtonText className="text-typography-500 font-medium">
                Cancelar y volver al inicio
              </ButtonText>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
