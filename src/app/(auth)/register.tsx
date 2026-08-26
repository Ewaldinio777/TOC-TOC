import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { VStack } from "@/src/components/ui/vstack";
import { Heading } from "@/src/components/ui/heading";
import { Text } from "@/src/components/ui/text";
import { Alert } from "react-native";
import { supabase } from "@/utils/supabase";
import { Button, ButtonText } from "@/src/components/ui/button";
import {
  Input,
  InputField,
  InputIcon,
  InputSlot,
} from "@/src/components/ui/input";
import { EyeIcon, EyeOffIcon } from "@/src/components/ui/icon";
import { FormControl } from "@/src/components/ui/form-control";
import { useRouter } from "expo-router";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 1. Estado para almacenar el mensaje de éxito
  const [successMessage, setSuccessMessage] = useState("");

  const handleState = () => {
    setShowPassword((showState) => !showState);
  };

  async function signUpWithEmail() {
    setLoading(true);
    setSuccessMessage(""); // Limpia mensajes previos

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      // 2. Asigna el mensaje de éxito en pantalla
      setSuccessMessage("¡Te has registrado con éxito!");
    }

    // Desactiva el estado de carga al finalizar
    setLoading(false);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FormControl className="p-4 border border-border/80 rounded-lg w-full">
        <VStack className="gap-4 justify-center">
          <Heading className="text-foreground">Registrate</Heading>

          {successMessage ? (
            <Text className="text-green-600 font-semibold text-center">
              {successMessage}
            </Text>
          ) : null}

          <VStack space="xs">
            <Text className="text-foreground/60">Email</Text>
            <Input>
              <InputField
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                type="text"
              />
            </Input>
          </VStack>

          <VStack space="xs">
            <Text className="text-foreground/60">Contraseña</Text>
            <Input>
              <InputField
                value={password}
                onChangeText={setPassword}
                type={showPassword ? "text" : "password"}
              />
              <InputSlot className="pr-3" onPress={handleState}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
          </VStack>

          <Button
            className="ml-auto"
            onPress={signUpWithEmail}
            isDisabled={loading}
          >
            <ButtonText>{loading ? "Cargando..." : "Registrarse"}</ButtonText>
          </Button>

          <Button onPress={() => router.replace("/login")}>
            <ButtonText>¿Ya tienes una cuenta?</ButtonText>
          </Button>
        </VStack>
      </FormControl>
    </SafeAreaView>
  );
}
