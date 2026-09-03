import { supabase } from "@/utils/supabase";
import { ServiceCategory, ProviderItem } from "@/src/types/services.types";

export const ServicesService = {
  // Obtiene el catálogo de servicios/categorías
  async getServices(): Promise<ServiceCategory[]> {
    const { data, error } = await supabase
      .from("service")
      .select("*")
      .order("service_type");

    if (error) {
      throw new Error(error.message);
    }

    return (data || []) as ServiceCategory[];
  },

  // Obtiene los proveedores filtrados por categoría o término de búsqueda
  async getProviders(serviceId?: number, searchQuery?: string): Promise<ProviderItem[]> {
    let query = supabase.from("service_provider").select(`
      *,
      user:user_id (id, name, last_name, avatar_url, prefixes_number, state),
      service:services_id (id, service_type)
    `);

    if (serviceId) {
      query = query.eq("services_id", serviceId);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    let list = (data || []).map((item: any, idx: number) => ({
      ...item,
      // Distancias y verificación simulada o según rating para realce visual
      distance: `A ${(1.2 + (idx % 4) * 0.8).toFixed(1)} km`,
      is_verified: item.rating >= 4.8 || idx % 2 === 0,
    })) as ProviderItem[];

    if (searchQuery && searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) => {
        const fullName = `${p.user?.name || ""} ${p.user?.last_name || ""}`.toLowerCase();
        const sType = p.service?.service_type?.toLowerCase() || "";
        const desc = p.professional_description?.toLowerCase() || "";
        return fullName.includes(q) || sType.includes(q) || desc.includes(q);
      });
    }

    return list;
  },

  // Obtiene proveedores VIP / Relevantes para el carrusel horizontal
  async getVipProviders(): Promise<ProviderItem[]> {
    const { data, error } = await supabase
      .from("service_provider")
      .select(`
        *,
        user:user_id (id, name, last_name, avatar_url, prefixes_number, state),
        service:services_id (id, service_type)
      `)
      .order("rating", { ascending: false })
      .limit(6);

    if (error) {
      throw new Error(error.message);
    }

    return (data || []).map((item: any, idx: number) => ({
      ...item,
      distance: `A ${(0.9 + idx * 0.5).toFixed(1)} km`,
      is_verified: true,
    })) as ProviderItem[];
  },

  // Iniciar o recuperar conversación con un proveedor
  async createOrGetConversation(params: {
    clientId: string;
    providerId: string;
    serviceId?: number;
  }) {
    const { clientId, providerId, serviceId } = params;

    // Buscar si ya existe una conversación entre ambos
    const { data: existing, error: searchError } = await supabase
      .from("conversation")
      .select("*")
      .eq("client_id", clientId)
      .eq("provider_id", providerId)
      .maybeSingle();

    if (searchError) {
      console.warn("Error al buscar conversación previa:", searchError.message);
    }

    if (existing) {
      return existing;
    }

    // Si no existe, crear la nueva conversación
    const { data: newConv, error: createError } = await supabase
      .from("conversation")
      .insert({
        client_id: clientId,
        provider_id: providerId,
        origin: "services",
        service_id: serviceId ?? null,
      })
      .select()
      .single();

    if (createError) {
      throw new Error(createError.message);
    }

    return newConv;
  },
};
