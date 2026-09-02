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
  forgotPasswordSchema,
  ForgotPasswordFormData,
} from "@/src/schemas/auth.schema";
import { useForgotPassword } from "@/src/hooks/auth/useForgotPassword";

import { VStack } from "@/src/components/ui/vstack";
import { Text } from "@/src/components/ui/text";
import { Button, ButtonText } from "@/src/components/ui/button";
import { Icon } from "@/src/components/ui/icon";
import { AppInput } from "@/src/components/AppComponents/AppInput";
import { AppButton } from "@/src/components/AppComponents/AppButton";
import { ArrowLeftIcon, MailIcon, CheckCircleIcon } from "lucide-react-native";

export default function ForgotPasswordScreen() {
  const forgotPasswordMutation = useForgotPassword();
  const [emailSent, setEmailSent] = React.useState(false);
  const [sentToEmail, setSentToEmail] = React.useState("");

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPasswordMutation.mutate(data.email, {
      onSuccess: () => {
        setSentToEmail(data.email);
        setEmailSent(true);
      },
      onError: (error) => {
        const msg = error.message.toLowerCase();
        if (msg.includes("rate limit") || msg.includes("too many")) {
          setError("root", {
            message:
              "Demasiados intentos. Espera unos minutos antes de intentarlo nuevamente.",
          });
        } else {
          setError("root", {
            message: "Ocurrió un error. Verifica tu correo e intenta de nuevo.",
          });
        }
      },
    });
  };

  // ─── Estado: Email enviado con éxito ───────────────────────────────────────
  if (emailSent) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 px-8 items-center justify-center">
          {/* Ícono de éxito */}
          <View className="w-24 h-24 bg-brand-light rounded-full items-center justify-center mb-6">
            <Icon
              as={CheckCircleIcon}
              size="xl"
              className="text-brand"
            />
          </View>

          <VStack space="md" className="items-center">
            <Text className="text-2xl font-bold text-typography-900 text-center">
              ¡Revisa tu correo!
            </Text>
            <Text className="text-typography-500 text-center text-base leading-6">
              Enviamos un enlace para restablecer tu contraseña a{"\n"}
              <Text className="font-semibold text-brand">{sentToEmail}</Text>
            </Text>
            <Text className="text-typography-400 text-center text-sm mt-2">
              Si no lo encuentras, revisa tu carpeta de spam.
            </Text>
          </VStack>

          <View className="w-full mt-10">
            <AppButton
              title="Volver al inicio de sesión"
              onPress={() => router.replace("/(auth)/login")}
            />

            <Button
              variant="link"
              className="self-center mt-4"
              onPress={() => {
                setEmailSent(false);
                setSentToEmail("");
              }}
            >
              <ButtonText className="text-typography-500 text-sm">
                ¿No recibiste el correo? Reenviar
              </ButtonText>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // ─── Estado: Formulario ────────────────────────────────────────────────────
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
          <View className="flex-1 px-8 pt-6 pb-6">
            {/* Botón volver */}
            <Button
              variant="link"
              className="self-start p-0 mb-8"
              onPress={() => router.back()}
            >
              <Icon
                as={ArrowLeftIcon}
                size="lg"
                className="text-typography-800"
              />
            </Button>

            {/* Ícono decorativo */}
            <View className="w-20 h-20 bg-brand-light rounded-full items-center justify-center mb-8 self-start">
              <Icon as={MailIcon} size="xl" className="text-brand" />
            </View>

            <VStack space="sm" className="mb-8">
              <Text className="text-3xl font-bold text-typography-900">
                ¿Olvidaste tu{"\n"}contraseña?
              </Text>
              <Text className="text-typography-500 text-base leading-6">
                Ingresa tu correo y te enviaremos un enlace para restablecerla.
              </Text>
            </VStack>

            <AppInput
              control={control}
              name="email"
              label="Correo electrónico"
              placeholder="tucorreo@ejemplo.com"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email?.message}
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
              title="Enviar enlace"
              onPress={handleSubmit(onSubmit)}
              isLoading={forgotPasswordMutation.isPending}
              className="mt-4"
            />

            <Button
              variant="link"
              className="self-center mt-6"
              onPress={() => router.back()}
            >
              <ButtonText className="text-typography-500 font-medium">
                Volver al inicio de sesión
              </ButtonText>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
