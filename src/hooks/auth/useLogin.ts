import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/src/services/auth.service";
import { LoginFormData } from "@/src/schemas/auth.schema";

export const useLogin = () => {
  return useMutation({
    mutationFn: (params: LoginFormData) =>
      AuthService.login(params.email, params.password),
  });
};
