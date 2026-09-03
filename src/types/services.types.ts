export interface ServiceCategory {
  id: number;
  service_type: string;
  icon_url?: string | null;
  emoji?: string;
}

export interface ProviderUser {
  id: string;
  name: string;
  last_name: string;
  avatar_url?: string | null;
  prefixes_number?: string;
  documento?: string;
  state?: string;
}

export interface ProviderItem {
  id: string;
  user_id: string;
  services_id: number;
  rating: number;
  professional_description?: string | null;
  professional_experience?: string | null;
  created_at: string;
  is_verified?: boolean;
  distance?: string;
  user: ProviderUser;
  service: {
    id: number;
    service_type: string;
  };
}

export interface ContactOption {
  type: "chat" | "phone" | "whatsapp";
  label: string;
  value?: string;
}
