import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/src/services/auth.service";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (newPassword: string) => AuthService.resetPassword(newPassword),
  });
};
