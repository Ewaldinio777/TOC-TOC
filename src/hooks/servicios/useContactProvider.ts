import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ServicesService } from "@/src/services/services.service";

interface ContactParams {
  clientId: string;
  providerId: string;
  serviceId?: number;
}

export const useContactProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ContactParams) =>
      ServicesService.createOrGetConversation(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
};
