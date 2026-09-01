import React from "react";
import { Button, ButtonText, ButtonSpinner } from "@/src/components/ui/button";

interface AppButtonProps {
  onPress: () => void;
  title: string;
  isLoading?: boolean;
  variant?: "solid" | "outline";
  className?: string;
}

export function AppButton({
  onPress,
  title,
  isLoading,
  variant = "solid",
  className = "",
}: AppButtonProps) {
  const isOutline = variant === "outline";

  return (
    <Button
      onPress={onPress}
      isDisabled={isLoading}
      variant={variant}
      className={`rounded-full h-14 w-full ${isOutline ? "border-brand bg-transparent" : "bg-brand border-0"} ${className}`}
    >
      {isLoading ? (
        <ButtonSpinner color={isOutline ? "#F67262" : "white"} />
      ) : (
        <ButtonText
          className={`font-bold text-lg ${isOutline ? "text-brand" : "text-white"}`}
        >
          {title}
        </ButtonText>
      )}
    </Button>
  );
}
