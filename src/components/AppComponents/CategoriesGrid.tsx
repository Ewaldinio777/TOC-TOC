import React from "react";
import { View } from "react-native";
import { Text } from "@/src/components/ui/text";
import { VStack } from "@/src/components/ui/vstack";
import { HStack } from "@/src/components/ui/hstack";
import { Pressable } from "@/src/components/ui/pressable";
import { Icon } from "@/src/components/ui/icon";
import {
  Zap,
  Droplet,
  Sparkles,
  Wrench,
  Brush,
  Plus,
} from "lucide-react-native";
import { ServiceCategory } from "@/src/types/services.types";

interface CategoriesGridProps {
  categories: ServiceCategory[];
  selectedCategoryId?: number;
  onSelectCategory: (id?: number) => void;
  onMorePress: () => void;
}

interface StaticCategory {
  keyword: string;
  label: string;
  emoji: string;
  icon: any;
  color: string;
}

const MAIN_CATEGORIES: StaticCategory[] = [
  { keyword: "eléctrico", label: "Eléctrico", emoji: "⚡", icon: Zap, color: "#F59E0B" },
  { keyword: "plomer", label: "Plomería", emoji: "🚰", icon: Droplet, color: "#3B82F6" },
  { keyword: "belleza", label: "Belleza", emoji: "💄", icon: Sparkles, color: "#EC4899" },
  { keyword: "mecánic", label: "Mecánica", emoji: "🔧", icon: Wrench, color: "#6B7280" },
  { keyword: "limpieza", label: "Limpieza", emoji: "🧼", icon: Brush, color: "#10B981" },
];

export function CategoriesGrid({
  categories,
  selectedCategoryId,
  onSelectCategory,
  onMorePress,
}: CategoriesGridProps) {
  // Asociar las categorías reales de la BD con nuestros items estáticos de UI
  const findDbCategoryId = (keyword: string): number | undefined => {
    const match = categories.find((c) =>
      c.service_type.toLowerCase().includes(keyword.toLowerCase())
    );
    return match ? match.id : undefined;
  };

  return (
    <VStack space="sm" className="my-2">
      <HStack className="items-center justify-between">
        <Text className="text-xs font-bold tracking-wider text-typography-500 uppercase">
          Categorías Principales
        </Text>
        {selectedCategoryId && (
          <Pressable onPress={() => onSelectCategory(undefined)}>
            <Text className="text-xs font-semibold text-brand">Ver todas</Text>
          </Pressable>
        )}
      </HStack>

      <View className="flex-row flex-wrap justify-between gap-y-3">
        {MAIN_CATEGORIES.map((item) => {
          const dbId = findDbCategoryId(item.keyword);
          const isSelected = selectedCategoryId !== undefined && selectedCategoryId === dbId;

          return (
            <Pressable
              key={item.keyword}
              onPress={() => {
                if (dbId) {
                  onSelectCategory(isSelected ? undefined : dbId);
                } else {
                  // Si aún no está en la BD, pasa el índice simulado para filtrar
                  onSelectCategory(isSelected ? undefined : 9999);
                }
              }}
              className={`w-[31%] h-24 rounded-2xl items-center justify-center p-2 border transition-all ${
                isSelected
                  ? "bg-brand/10 border-brand shadow-sm scale-[1.02]"
                  : "bg-white border-outline-100 shadow-soft-1 active:bg-background-50"
              }`}
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center mb-1.5"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <Text className="text-lg">{item.emoji}</Text>
              </View>
              <Text
                className={`text-xs text-center font-bold ${
                  isSelected ? "text-brand" : "text-typography-800"
                }`}
                numberOfLines={1}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}

        {/* Botón [ + ] Ver Más */}
        <Pressable
          onPress={onMorePress}
          className="w-[31%] h-24 rounded-2xl items-center justify-center p-2 border border-dashed border-typography-300 bg-background-50 active:bg-outline-100"
        >
          <View className="w-10 h-10 rounded-full bg-typography-200 items-center justify-center mb-1.5">
            <Icon as={Plus} size="sm" className="text-typography-700" />
          </View>
          <Text className="text-xs font-bold text-typography-700 text-center" numberOfLines={1}>
            Ver Más
          </Text>
        </Pressable>
      </View>
    </VStack>
  );
}
