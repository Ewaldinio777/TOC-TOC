import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("service")
        .select("*")
        .order("service_type");

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};
