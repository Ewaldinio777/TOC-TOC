import { useQuery } from "@tanstack/react-query";
import { AuthService } from "@/src/services/auth.service";

export const useDocumentTypes = () => {
  return useQuery({
    queryKey: ["documentTypes"],
    queryFn: () => AuthService.getDocumentTypes(),
    staleTime: 1000 * 60 * 60, // Mantiene la información en caché por 1 hora
  });
};
