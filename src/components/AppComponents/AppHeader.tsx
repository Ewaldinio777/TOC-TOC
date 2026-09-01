import React from "react";
import { VStack } from "@/src/components/ui/vstack";
import { Heading } from "@/src/components/ui/heading";
import { Text } from "@/src/components/ui/text";

interface AppHeaderProps {
  title: string;
  subtitle: string;
}

export function AppHeader({ title, subtitle }: AppHeaderProps) {
  return (
    <VStack className="items-center mb-10 mt-6" space="xs">
      <Heading size="2xl" className="text-brand font-extrabold text-center">
        {title}
      </Heading>
      <Text className="text-typography-900 font-medium text-center text-sm">
        {subtitle}
      </Text>
    </VStack>
  );
}
