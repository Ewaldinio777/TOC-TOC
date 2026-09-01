import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Alert } from "react-native";
import { supabase } from "@/utils/supabase";
import { router } from "expo-router";
import { HStack } from "@/src/components/ui/hstack";
import { Text } from "@/src/components/ui/text";
import { Button, ButtonText } from "@/src/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/src/schemas/auth.schema";

import { AppInput } from "@/src/components/AppComponents/AppInput";
import { AppButton } from "@/src/components/AppComponents/AppButton";
import { AppHeader } from "@/src/components/AppComponents/AppHeader";
import { AppSocial } from "@/src/components/AppComponents/AppSocial";

export default function LoginScreen() {
  const [loading, setLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        setError("password", { message: "Correo o contraseña incorrectos." });
      } else {
        setError("root", { message: error.message });
      }
    } else {
      // RootNavigator will handle the redirect, or we can force it:
      // router.replace("/(tabs)/Services/services-screen");
    }
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-8 pt-10 pb-6">
          <AppHeader
            title="Welcome Back!"
            subtitle="Login to continue using the app."
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
            title="Log In"
            onPress={handleSubmit(onSubmit)}
            isLoading={loading}
            className="mt-4"
          />

          <Button
            variant="link"
            className="self-center mt-4"
            onPress={() => {}}
          >
            <ButtonText className="text-typography-900 font-medium">
              Forgot Password?
            </ButtonText>
          </Button>

          <AppSocial />

          <View className="flex-1 justify-end mt-8">
            <HStack className="justify-center items-center">
              <Text className="text-typography-900 font-medium">
                Didn't have account?{" "}
              </Text>
              <Button
                variant="link"
                className="p-0"
                onPress={() => router.replace("/(auth)/register")}
              >
                <ButtonText className="text-brand font-bold text-base">
                  Register
                </ButtonText>
              </Button>
            </HStack>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
