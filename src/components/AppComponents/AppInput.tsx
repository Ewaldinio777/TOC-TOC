import React from "react";
import { Controller } from "react-hook-form";
import {
  Input,
  InputField,
  InputSlot,
  InputIcon,
} from "@/src/components/ui/input";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from "@/src/components/ui/form-control";
import { EyeIcon, EyeOffIcon } from "@/src/components/ui/icon";

interface AppInputProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  error?: string;
  isPassword?: boolean;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "number-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  containerClassName?: string;
  inputClassName?: string;
  onChangeTextInterceptor?: (text: string) => string;
}

export function AppInput({
  control,
  name,
  label,
  placeholder,
  error,
  isPassword,
  keyboardType = "default",
  autoCapitalize = "sentences",
  containerClassName = "",
  inputClassName = "",
  onChangeTextInterceptor,
}: AppInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <FormControl isInvalid={!!error} className={`mb-4 ${containerClassName}`}>
      <FormControlLabel className="mb-1">
        <FormControlLabelText className="text-typography-800 font-bold text-sm">
          {label}
        </FormControlLabelText>
      </FormControlLabel>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Input
            className={`bg-brand-light border-0 rounded-xl h-14 ${inputClassName}`}
          >
            <InputField
              placeholder={placeholder}
              value={value}
              onChangeText={(text) => {
                const newText = onChangeTextInterceptor ? onChangeTextInterceptor(text) : text;
                onChange(newText);
              }}
              type={isPassword && !showPassword ? "password" : "text"}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              className="text-typography-900 placeholder:text-typography-400"
            />
            {isPassword && (
              <InputSlot
                className="pr-4"
                onPress={() => setShowPassword(!showPassword)}
              >
                <InputIcon
                  as={showPassword ? EyeIcon : EyeOffIcon}
                  className="text-typography-400"
                />
              </InputSlot>
            )}
          </Input>
        )}
      />

      <FormControlError>
        <FormControlErrorText className="text-xs mt-1">
          {error}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
}
