import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/src/schemas/auth.schema";
import { useRegister } from "@/src/hooks/auth/useRegister";
import { router } from "expo-router";

import { HStack } from "@/src/components/ui/hstack";
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
  const { data: documentTypes = [], isLoading: isLoadingDocs } =
    useDocumentTypes();

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
        router.replace("/(auth)/login");
      },
      onError: (error) => {
        if (error.message.includes("already registered")) {
          setError("email", { message: "Este correo ya está registrado." });
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
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-8 pt-10 pb-6">
          <AppHeader
            title="Everything You Need!"
            subtitle="Create account and start exploring."
          />

          <AppInput
            control={control}
            name="name"
            label="First Name"
            placeholder="Enter first name"
          />
          <AppInput
            control={control}
            name="last_name"
            label="Last Name"
            placeholder="Enter last name"
          />

          <HStack className="items-start gap-3">
            <View className="flex-1">
              <AppSelect
                control={control}
                options={documentTypes}
                name="tipo_de_documento"
                label="Document"
                placeholder="Enter document type"
                containerClassName="mb-3"
                selectClassName="h-12"
              />
            </View>

            <View className="flex-1">
              <AppInput
                control={control}
                name="documento"
                label="Document ID"
                placeholder="Enter document ID"
                keyboardType="number-pad"
                containerClassName="mb-0"
                inputClassName="h-12"
              />
            </View>
          </HStack>

          <HStack className="items-start gap-3">
            <View className="flex-1">
              <AppSelect
                control={control}
                options={prefixesNumber}
                name="prefixes_number"
                label="Prefijo"
                placeholder="Enter prefix"
                containerClassName="mb-3"
                selectClassName="h-12"
              />
            </View>

            <View className="flex-1">
              <AppInput
                control={control}
                name="phone"
                label="Phone"
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                containerClassName="mb-0"
                inputClassName="h-12"
              />
            </View>
          </HStack>

          <AppInput
            control={control}
            name="state"
            label="State/Region"
            placeholder="Enter state or region"
          />

          <AppInput
            control={control}
            name="email"
            label="Email"
            placeholder="Enter mail"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email?.message}
          />

          <AppInput
            control={control}
            name="password"
            label="Password"
            placeholder="Enter password"
            isPassword
            error={errors.password?.message}
          />

          {errors.root && (
            <Text className="text-error-500 text-sm text-center mb-4">
              {errors.root.message}
            </Text>
          )}

          <AppButton
            title="Register"
            onPress={handleSubmit(onSubmit)}
            isLoading={registerMutation.isPending}
            className="mt-6"
          />

          <AppSocial />

          <View className="flex-1 justify-end mt-8">
            <HStack className="justify-center items-center">
              <Text className="text-typography-900 font-medium">
                Already have an account?{" "}
              </Text>
              <Button
                variant="link"
                className="p-0"
                onPress={() => router.replace("/(auth)/login")}
              >
                <ButtonText className="text-brand font-bold text-base">
                  Log In
                </ButtonText>
              </Button>
            </HStack>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
