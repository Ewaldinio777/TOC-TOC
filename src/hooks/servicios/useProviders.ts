import { useQuery } from "@tanstack/react-query";
import { ServicesService } from "@/src/services/services.service";

export const useProviders = (serviceId?: number, searchQuery?: string) => {
  return useQuery({
    queryKey: ["providers", serviceId, searchQuery],
    queryFn: () => ServicesService.getProviders(serviceId, searchQuery),
    staleTime: 1000 * 60 * 5, // 5 minutos en caché
  });
};
