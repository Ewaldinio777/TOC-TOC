import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";

export const useProviders = (serviceId?: number, searchQuery?: string) => {
  return useQuery({
    queryKey: ["providers", serviceId, searchQuery],
    queryFn: async () => {
      let query = supabase.from("service_provider").select(`
          *,
          user:user_id (id, name, last_name, avatar_url),
          service:services_id (id, service_type)
        `);

      if (serviceId) {
        query = query.eq("services_id", serviceId);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      // Basic client side filter for search query for now, since Supabase doesn't easily allow text search across multiple joined tables without a custom RPC or view.
      let filteredData = data;
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        filteredData = data.filter((provider) => {
          const userName =
            provider.user && !Array.isArray(provider.user)
              ? `${provider.user.name} ${provider.user.last_name}`.toLowerCase()
              : "";
          const desc = provider.professional_description?.toLowerCase() || "";
          return userName.includes(lowerQuery) || desc.includes(lowerQuery);
        });
      }

      return filteredData;
    },
  });
};
