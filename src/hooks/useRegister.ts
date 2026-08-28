import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/src/services/auth.service";
import { RegisterFormData } from "@/src/schemas/auth.schema";

export const useRegister = () => {
  return useMutation({
    mutationFn: (params: RegisterFormData) => AuthService.register(params),
  });
};
