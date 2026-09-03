import React, { useState, useRef } from "react";
import {
  ScrollView,
  View,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HStack } from "@/src/components/ui/hstack";
import { VStack } from "@/src/components/ui/vstack";
import { Text } from "@/src/components/ui/text";
import { Heading } from "@/src/components/ui/heading";
import { Pressable } from "@/src/components/ui/pressable";
import { Icon } from "@/src/components/ui/icon";
import { Input, InputField, InputSlot, InputIcon } from "@/src/components/ui/input";
import { Search, X, Sparkles, Star, ChevronRight } from "lucide-react-native";

import { useServices } from "@/src/hooks/servicios/useServices";
import { useProviders } from "@/src/hooks/servicios/useProviders";
import { useVipProviders } from "@/src/hooks/servicios/useVipProviders";

import { ServicesHeader } from "@/src/components/AppComponents/ServicesHeader";
import { CategoriesGrid } from "@/src/components/AppComponents/CategoriesGrid";
import { AllCategoriesModal } from "@/src/components/AppComponents/AllCategoriesModal";
import { VipProviderCard } from "@/src/components/AppComponents/VipProviderCard";
import { ProviderCard } from "@/src/components/AppComponents/ProviderCard";
import { ContactProviderModal } from "@/src/components/AppComponents/ContactProviderModal";
import { ProviderItem } from "@/src/types/services.types";

// Proveedores de muestra basados exactamente en el mockup wireframe del usuario
const FALLBACK_VIP_PROVIDERS: ProviderItem[] = [
  {
    id: "vip-1",
    user_id: "u-vip-1",
    services_id: 1,
    rating: 4.95,
    professional_description: "Técnico especialista en refrigeración industrial y doméstica.",
    professional_experience: "Téc. Refrigeración",
    created_at: new Date().toISOString(),
    is_verified: true,
    distance: "A 0.8 km",
    user: {
      id: "u-vip-1",
      name: "Carlos",
      last_name: "Sosa",
      prefixes_number: "0412",
    },
    service: {
      id: 1,
      service_type: "Refrigeración",
    },
  },
  {
    id: "vip-2",
    user_id: "u-vip-2",
    services_id: 2,
    rating: 5.0,
    professional_description: "Estilista profesional en cortes modernos, colorimetría y tratamientos capilares.",
    professional_experience: "Estilista Profesional",
    created_at: new Date().toISOString(),
    is_verified: true,
    distance: "A 1.5 km",
    user: {
      id: "u-vip-2",
      name: "Ana",
      last_name: "Bermúdez",
      prefixes_number: "0414",
    },
    service: {
      id: 2,
      service_type: "Belleza",
    },
  },
];

const FALLBACK_ORGANIC_PROVIDERS: ProviderItem[] = [
  {
    id: "org-1",
    user_id: "u-org-1",
    services_id: 3,
    rating: 4.88,
    professional_description: "Especialista en frenos y motores.",
    professional_experience: "10 años en talleres certificados",
    created_at: new Date().toISOString(),
    is_verified: true,
    distance: "A 1.2 km",
    user: {
      id: "u-org-1",
      name: "Pedro",
      last_name: "Martínez",
      prefixes_number: "0416",
    },
    service: {
      id: 3,
      service_type: "Mecánica Automotriz",
    },
  },
  {
    id: "org-2",
    user_id: "u-org-2",
    services_id: 4,
    rating: 4.75,
    professional_description: "Diseño de uñas permanentes y gel.",
    professional_experience: "Manicurista certificada a domicilio",
    created_at: new Date().toISOString(),
    is_verified: true,
    distance: "A 3.0 km",
    user: {
      id: "u-org-2",
      name: "Lucía",
      last_name: "Gómez",
      prefixes_number: "0424",
    },
    service: {
      id: 4,
      service_type: "Manicurista a domicilio",
    },
  },
];

export default function ServicesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>();
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const [selectedProviderForContact, setSelectedProviderForContact] = useState<ProviderItem | null>(null);

  const searchInputRef = useRef<TextInput>(null);

  // Queries TanStack
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    refetch: refetchCategories,
  } = useServices();

  const {
    data: dbProviders = [],
    isLoading: isLoadingProviders,
    isRefetching: isRefetchingProviders,
    refetch: refetchProviders,
  } = useProviders(selectedCategoryId, searchQuery);

  const {
    data: dbVipProviders = [],
    isLoading: isLoadingVip,
    refetch: refetchVip,
  } = useVipProviders();

  // Si la BD aún no tiene suficientes datos, complementamos con los datos del wireframe
  const vipList = dbVipProviders.length > 0 ? dbVipProviders : FALLBACK_VIP_PROVIDERS;
  const organicList = dbProviders.length > 0 ? dbProviders : FALLBACK_ORGANIC_PROVIDERS;

  const onRefresh = () => {
    refetchCategories();
    refetchProviders();
    refetchVip();
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    searchInputRef.current?.blur();
  };

  const activeCategoryObj = categories.find((c) => c.id === selectedCategoryId);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingProviders}
            onRefresh={onRefresh}
            colors={["#F67262"]}
            tintColor="#F67262"
          />
        }
      >
        <View className="px-5">
          {/* Encabezado con Toc Toc · Servicios y Botón Convertirse en Proveedor */}
          <ServicesHeader
            onSearchPress={() => searchInputRef.current?.focus()}
          />

          {/* Barra de Búsqueda Gigante */}
          <View className="my-2">
            <Input
              className="bg-brand-light border-0 rounded-2xl h-14 px-4 items-center shadow-soft-1"
            >
              <InputSlot className="mr-2.5">
                <InputIcon as={Search} className="text-typography-400" size="md" />
              </InputSlot>
              <InputField
                ref={searchInputRef as any}
                placeholder="Buscar electricista, maquillaje, repuestos..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="text-typography-900 placeholder:text-typography-400 text-sm font-medium"
                returnKeyType="search"
              />
              {searchQuery.length > 0 && (
                <InputSlot onPress={handleClearSearch} className="p-1">
                  <InputIcon as={X} className="text-typography-500" size="sm" />
                </InputSlot>
              )}
            </Input>
          </View>

          {/* Categorías Principales (Grid 3x2 con Ver Más) */}
          <CategoriesGrid
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
            onMorePress={() => setIsCategoriesModalOpen(true)}
          />

          {/* Filtro activo aviso si existe */}
          {selectedCategoryId && (
            <HStack className="items-center justify-between bg-brand/10 px-3.5 py-2 rounded-xl mb-4">
              <Text className="text-xs font-semibold text-brand">
                Filtrando por:{" "}
                <Text className="font-bold capitalize">
                  {activeCategoryObj?.service_type || "Categoría seleccionada"}
                </Text>
              </Text>
              <Pressable onPress={() => setSelectedCategoryId(undefined)}>
                <Text className="text-xs font-bold text-typography-700 underline">
                  Quitar
                </Text>
              </Pressable>
            </HStack>
          )}

          {/* PROVEEDORES RELEVANTES 🌟 (Carrusel Horizontal VIP) */}
          <VStack space="xs" className="mt-4 mb-2">
            <HStack className="items-center justify-between">
              <HStack className="items-center" space="xs">
                <Text className="text-xs font-bold tracking-wider text-typography-500 uppercase">
                  Proveedores Relevantes
                </Text>
                <Icon as={Sparkles} size="xs" className="text-amber-500" />
              </HStack>
              <HStack className="items-center" space="xs">
                <Text className="text-[11px] text-typography-400 font-medium">
                  Desliza hacia los lados
                </Text>
                <Icon as={ChevronRight} size="xs" className="text-typography-400" />
              </HStack>
            </HStack>

            {isLoadingVip ? (
              <View className="h-44 items-center justify-center">
                <ActivityIndicator color="#F67262" />
              </View>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 8, paddingRight: 8 }}
                className="overflow-visible"
              >
                {vipList.map((provider) => (
                  <VipProviderCard
                    key={provider.id}
                    provider={provider}
                    onContact={(p) => setSelectedProviderForContact(p)}
                  />
                ))}
              </ScrollView>
            )}
          </VStack>

          {/* MÁS VALORADOS EN TU ZONA ⭐ (Lista Vertical Orgánica) */}
          <VStack space="xs" className="mt-5">
            <HStack className="items-center justify-between mb-1">
              <HStack className="items-center" space="xs">
                <Text className="text-xs font-bold tracking-wider text-typography-500 uppercase">
                  Más Valorados en tu Zona
                </Text>
                <Icon as={Star} size="xs" className="text-amber-500 fill-amber-500" />
              </HStack>
              <Text className="text-xs text-typography-400 font-medium">
                {organicList.length} disponibles
              </Text>
            </HStack>

            {isLoadingProviders ? (
              <View className="py-12 items-center justify-center">
                <ActivityIndicator color="#F67262" />
                <Text className="text-xs text-typography-400 mt-2">
                  Buscando especialistas cerca de ti...
                </Text>
              </View>
            ) : organicList.length === 0 ? (
              <View className="py-10 items-center justify-center bg-background-50 rounded-2xl p-6 border border-dashed border-outline-200">
                <Text className="text-sm font-bold text-typography-700 mb-1 text-center">
                  No se encontraron proveedores
                </Text>
                <Text className="text-xs text-typography-400 text-center mb-3">
                  Prueba cambiando la búsqueda o seleccionando otra categoría.
                </Text>
                <Pressable
                  onPress={() => {
                    setSearchQuery("");
                    setSelectedCategoryId(undefined);
                  }}
                  className="bg-brand px-4 py-2 rounded-xl"
                >
                  <Text className="text-white text-xs font-bold">Ver todos</Text>
                </Pressable>
              </View>
            ) : (
              <VStack space="xs">
                {organicList.map((provider) => (
                  <ProviderCard
                    key={provider.id}
                    provider={provider}
                    onContact={(p) => setSelectedProviderForContact(p)}
                  />
                ))}
              </VStack>
            )}
          </VStack>
        </View>
      </ScrollView>

      {/* Modal de Todas las Categorías */}
      <AllCategoriesModal
        isOpen={isCategoriesModalOpen}
        onClose={() => setIsCategoriesModalOpen(false)}
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={(id) => {
          setSelectedCategoryId(id);
          setIsCategoriesModalOpen(false);
        }}
      />

      {/* Modal de Contacto y Comunicación con el Proveedor */}
      <ContactProviderModal
        isOpen={!!selectedProviderForContact}
        onClose={() => setSelectedProviderForContact(null)}
        provider={selectedProviderForContact}
      />
    </SafeAreaView>
  );
}
