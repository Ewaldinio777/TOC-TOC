import { useQuery } from "@tanstack/react-query";
import { ServicesService } from "@/src/services/services.service";

export const useVipProviders = () => {
  return useQuery({
    queryKey: ["vip-providers"],
    queryFn: () => ServicesService.getVipProviders(),
    staleTime: 1000 * 60 * 10,
  });
};
