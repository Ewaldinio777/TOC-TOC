import React from "react";
import { HStack } from "@/src/components/ui/hstack";
import { View, TouchableOpacity } from "react-native";
import { Text } from "@/src/components/ui/text";
import { Icon } from "@/src/components/ui/icon";

// Reusing some placeholder icons for social until we have actual svgs.
// The design has Facebook, Google, Apple
import { FacebookIcon, ChromeIcon, AppleIcon } from "lucide-react-native";

export function AppSocial() {
  return (
    <View className="mt-6 w-full">
      <HStack className="items-center mb-6 w-full">
        <View className="flex-1 h-[1px] bg-typography-200" />
        <Text className="mx-4 text-typography-400 text-sm font-medium">OR</Text>
        <View className="flex-1 h-[1px] bg-typography-200" />
      </HStack>

      <HStack space="md" className="justify-center">
        <TouchableOpacity className="w-16 h-12 border border-typography-200 rounded-xl items-center justify-center">
          <Icon as={FacebookIcon} className="text-blue-600" size="xl" />
        </TouchableOpacity>

        <TouchableOpacity className="w-16 h-12 border border-typography-200 rounded-xl items-center justify-center">
          {/* Using Chrome as generic Google substitute for now, or just colored circles */}
          <Icon as={ChromeIcon} className="text-red-500" size="xl" />
        </TouchableOpacity>

        <TouchableOpacity className="w-16 h-12 border border-typography-200 rounded-xl items-center justify-center">
          <Icon as={AppleIcon} className="text-black" size="xl" />
        </TouchableOpacity>
      </HStack>
    </View>
  );
}
