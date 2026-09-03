import { useQuery } from "@tanstack/react-query";
import { ServicesService } from "@/src/services/services.service";

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: () => ServicesService.getServices(),
    staleTime: 1000 * 60 * 15, // 15 minutos en caché
  });
};
