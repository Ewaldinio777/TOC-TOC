import React from "react";
import { View } from "react-native";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@/src/components/ui/modal";
import { Heading } from "@/src/components/ui/heading";
import { Text } from "@/src/components/ui/text";
import { HStack } from "@/src/components/ui/hstack";
import { Pressable } from "@/src/components/ui/pressable";
import { Icon } from "@/src/components/ui/icon";
import { X, Check, Layers } from "lucide-react-native";
import { ServiceCategory } from "@/src/types/services.types";

interface AllCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: ServiceCategory[];
  selectedCategoryId?: number;
  onSelectCategory: (id?: number) => void;
}

export function AllCategoriesModal({
  isOpen,
  onClose,
  categories,
  selectedCategoryId,
  onSelectCategory,
}: AllCategoriesModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalBackdrop />
      <ModalContent className="max-h-[80%] rounded-3xl p-5 bg-white">
        <ModalHeader className="border-b border-outline-100 pb-3 justify-between items-center">
          <HStack space="xs" className="items-center">
            <Icon as={Layers} size="sm" className="text-brand" />
            <Heading size="md" className="text-typography-900 font-bold">
              Todas las Categorías
            </Heading>
          </HStack>
          <ModalCloseButton className="p-1 rounded-full active:bg-background-100">
            <Icon as={X} size="sm" className="text-typography-500" />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody className="pt-3">
          {categories.length === 0 ? (
            <View className="py-8 items-center justify-center">
              <Text className="text-typography-400 text-sm">
                No hay categorías adicionales registradas.
              </Text>
            </View>
          ) : (
            <View className="gap-y-2">
              {/* Opción para limpiar filtro */}
              <Pressable
                onPress={() => {
                  onSelectCategory(undefined);
                  onClose();
                }}
                className={`flex-row items-center justify-between p-3.5 rounded-2xl border transition-colors ${
                  selectedCategoryId === undefined
                    ? "bg-brand/10 border-brand"
                    : "bg-background-50 border-outline-100 active:bg-outline-100"
                }`}
              >
                <Text
                  className={`font-semibold text-sm ${
                    selectedCategoryId === undefined ? "text-brand" : "text-typography-800"
                  }`}
                >
                  Todas las categorías
                </Text>
                {selectedCategoryId === undefined && (
                  <Icon as={Check} size="sm" className="text-brand" />
                )}
              </Pressable>

              {/* Lista de categorías de la base de datos */}
              {categories.map((cat) => {
                const isSelected = selectedCategoryId === cat.id;
                return (
                  <Pressable
                    key={cat.id}
                    onPress={() => {
                      onSelectCategory(cat.id);
                      onClose();
                    }}
                    className={`flex-row items-center justify-between p-3.5 rounded-2xl border transition-colors ${
                      isSelected
                        ? "bg-brand/10 border-brand"
                        : "bg-background-50 border-outline-100 active:bg-outline-100"
                    }`}
                  >
                    <Text
                      className={`font-semibold text-sm capitalize ${
                        isSelected ? "text-brand" : "text-typography-800"
                      }`}
                    >
                      {cat.service_type}
                    </Text>
                    {isSelected && <Icon as={Check} size="sm" className="text-brand" />}
                  </Pressable>
                );
              })}
            </View>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
