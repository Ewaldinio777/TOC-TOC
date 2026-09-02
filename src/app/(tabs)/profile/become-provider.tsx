import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";
import { useServices } from "@/src/hooks/servicios/useServices";

import { Heading } from "@/src/components/ui/heading";
import { Text } from "@/src/components/ui/text";
import { Button, ButtonText } from "@/src/components/ui/button";
import { VStack } from "@/src/components/ui/vstack";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from "@/src/components/ui/form-control";
import { Input, InputField } from "@/src/components/ui/input";
import { Textarea, TextareaInput } from "@/src/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@/src/components/ui/select";
import { ChevronDownIcon } from "lucide-react-native";

export default function BecomeProviderScreen() {
  const { session } = useAuth();
  const user = session?.user;
  const router = useRouter();
  const { data: services } = useServices();

  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    if (!description || !experience || !selectedServiceId) {
      setErrorMsg("Todos los campos son obligatorios.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const { error } = await supabase.from("service_provider").insert({
        user_id: user?.id,
        services_id: parseInt(selectedServiceId),
        professional_description: description,
        professional_experience: experience,
        rating: 5.0, // Initial rating
      });

      if (error) {
        throw error;
      }

      router.back();
    } catch (err: any) {
      setErrorMsg(err.message || "Error al crear el perfil profesional");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <ScrollView>
        <VStack className="p-6" space="xl">
          <Heading size="2xl">Conviértete en Profesional</Heading>
          <Text size="md" className="text-typography-500 mb-4">
            Ofrece tus servicios en nuestra plataforma y conecta con miles de
            clientes.
          </Text>

          <FormControl isInvalid={!!errorMsg && !selectedServiceId}>
            <FormControlLabel>
              <FormControlLabelText>
                Categoría del Servicio
              </FormControlLabelText>
            </FormControlLabel>
            <Select onValueChange={(val) => setSelectedServiceId(val)}>
              <SelectTrigger variant="outline" size="md">
                <SelectInput placeholder="Selecciona una categoría" />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {services?.map((svc) => (
                    <SelectItem
                      key={svc.id}
                      label={svc.service_type}
                      value={svc.id.toString()}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          </FormControl>

          <FormControl isInvalid={!!errorMsg && !description}>
            <FormControlLabel>
              <FormControlLabelText>
                Descripción Profesional
              </FormControlLabelText>
            </FormControlLabel>
            <Textarea size="md">
              <TextareaInput
                placeholder="Describe tus habilidades y servicios que ofreces..."
                value={description}
                onChangeText={setDescription}
              />
            </Textarea>
          </FormControl>

          <FormControl isInvalid={!!errorMsg && !experience}>
            <FormControlLabel>
              <FormControlLabelText>Experiencia Previa</FormControlLabelText>
            </FormControlLabel>
            <Textarea size="md">
              <TextareaInput
                placeholder="Ej: 5 años trabajando como electricista..."
                value={experience}
                onChangeText={setExperience}
              />
            </Textarea>
          </FormControl>

          {!!errorMsg && (
            <Text className="text-error-500 mt-2 text-sm">{errorMsg}</Text>
          )}

          <Button
            className="mt-4"
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <ButtonText>
              {isSubmitting ? "Registrando..." : "Registrarme"}
            </ButtonText>
          </Button>

          <Button variant="outline" onPress={() => router.back()}>
            <ButtonText>Cancelar</ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
