import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/src/schemas/auth.schema";
import { useRegister } from "@/src/hooks/useRegister";

// Componentes Gluestack UI
import { Box } from "@/src/components/ui/box";
import { VStack } from "@/src/components/ui/vstack";
import { Text } from "@/src/components/ui/text";
import { Input, InputField } from "@/src/components/ui/input";
import { Button, ButtonText, ButtonSpinner } from "@/src/components/ui/button";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from "@/src/components/ui/form-control";
import { router } from "expo-router";

export default function RegisterScreen() {
  const registerMutation = useRegister();

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
    <SafeAreaView style={{ flex: 1 }}>
      <Box className="flex-1 p-6 justify-center">
        <VStack space="md">
          {/* Campo Nombre */}
          <FormControl isInvalid={!!errors.name}>
            <FormControlLabel>
              <FormControlLabelText>Nombre</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input>
                  <InputField
                    placeholder="Tu nombre"
                    value={value}
                    onChangeText={onChange}
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorText>
                {errors.name?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Campo Apellido */}
          <FormControl isInvalid={!!errors.last_name}>
            <FormControlLabel>
              <FormControlLabelText>Apellido</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name="last_name"
              render={({ field: { onChange, value } }) => (
                <Input>
                  <InputField
                    placeholder="Apellido"
                    value={value}
                    onChangeText={onChange}
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorText>
                {errors.last_name?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Campo Documento 1*/}
          <FormControl isInvalisd={!!errors.documento || !!errors.}>
            <FormControlLabel>
              <FormControlLabelText>N°</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name="documento"
              render={({ field: { onChange, value } }) => (
                <Input>
                  <InputField
                    placeholder="Nº Documento"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="number-pad"
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorText>
                {errors.email?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Campo Documento 2*/}
          <FormControl isInvalid={!!errors.documento}>
            <FormControlLabel>
              <FormControlLabelText>Documento</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name="documento"
              render={({ field: { onChange, value } }) => (
                <Input>
                  <InputField
                    placeholder="Nº Documento"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="number-pad"
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorText>
                {errors.email?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Campo Teléfono */}
          <FormControl isInvalid={!!errors.email}>
            <FormControlLabel>
              <FormControlLabelText>Teléfono</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input>
                  <InputField
                    placeholder="ejemplo@correo.com"
                    value={value}
                    onChangeText={onChange}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorText>
                {errors.email?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Campo Estado */}
          <FormControl isInvalid={!!errors.email}>
            <FormControlLabel>
              <FormControlLabelText>Estado</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input>
                  <InputField
                    placeholder="ejemplo@correo.com"
                    value={value}
                    onChangeText={onChange}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorText>
                {errors.email?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Campo Email */}
          <FormControl isInvalid={!!errors.email}>
            <FormControlLabel>
              <FormControlLabelText>Correo electrónico</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input>
                  <InputField
                    placeholder="ejemplo@correo.com"
                    value={value}
                    onChangeText={onChange}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorText>
                {errors.email?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Campo Email */}
          <FormControl isInvalid={!!errors.email}>
            <FormControlLabel>
              <FormControlLabelText>Correo electrónico</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input>
                  <InputField
                    placeholder="ejemplo@correo.com"
                    value={value}
                    onChangeText={onChange}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorText>
                {errors.email?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Error general del servidor */}
          {errors.root && (
            <Text className="text-red-500 text-sm text-center">
              {errors.root.message}
            </Text>
          )}

          {/* Botón con Spinner integrado */}
          <Button
            onPress={handleSubmit(onSubmit)}
            isDisabled={registerMutation.isPending}
            className="mt-4"
          >
            {registerMutation.isPending ? (
              <ButtonSpinner />
            ) : (
              <ButtonText>Registrarse</ButtonText>
            )}
          </Button>

          <Button onPress={() => router.replace("/login")}>
            <ButtonText>Ya estoy registrado</ButtonText>
          </Button>
        </VStack>
      </Box>
    </SafeAreaView>
  );
}
