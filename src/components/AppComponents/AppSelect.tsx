import React from "react";
import { Controller } from "react-hook-form";
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
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from "@/src/components/ui/form-control";
import { ChevronDownIcon } from "@/src/components/ui/icon";

export interface SelectOption {
  label: string;
  value: string;
}

interface AppSelectProps {
  control: any;
  name: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  containerClassName?: string;
  selectClassName?: string;
}

export function AppSelect({
  control,
  name,
  label,
  options,
  placeholder = "Selecciona una opción",
  error,
  containerClassName = "",
  selectClassName = "",
}: AppSelectProps) {
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
        render={({ field: { onChange, value } }) => {
          // Obtener la etiqueta correspondiente al valor seleccionado
          const selectedOption = options.find((opt) => opt.value === value);

          return (
            <Select selectedValue={value} onValueChange={onChange}>
              <SelectTrigger
                className={`bg-brand-light border-0 rounded-xl h-14 px-3 flex-row items-center justify-between ${selectClassName}`}
              >
                <SelectInput
                  placeholder={placeholder}
                  value={selectedOption ? selectedOption.label : ""}
                  className="text-typography-900 placeholder:text-typography-400 text-sm flex-1 h-full py-0 truncate"
                />
                <SelectIcon
                  as={ChevronDownIcon}
                  className="text-typography-400 ml-1 shrink-0"
                />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {options.map((option) => (
                    <SelectItem
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          );
        }}
      />

      <FormControlError>
        <FormControlErrorText className="text-xs mt-1">
          {error}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
}
