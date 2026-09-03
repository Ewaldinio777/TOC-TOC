import { supabase } from "@/utils/supabase";
import { RegisterFormData } from "@/src/schemas/auth.schema";

export const AuthService = {
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    return data;
  },

  async register(params: RegisterFormData) {
    const {
      email,
      password,
      name,
      last_name,
      phone,
    } = params;

    // Paso 1: Crear usuario en Supabase Auth (sin crear sesión activa)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw new Error(authError.message);
    if (!authData.user)
      throw new Error("No se pudo obtener el usuario registrado.");

    const userId = authData.user.id;

    // Paso 2: Insertar perfil en la tabla pública 'user'
    const { data: userData, error: userError } = await supabase
      .from("user")
      .insert([
        {
          id: userId,
          name,
          last_name,
          prefixes_number: params.prefixes_number,
          phone: params.phone,
          last_seen: new Date().toISOString(),
          avatar_url: null,
        } as any,
      ])
      .select()
      .single();

    if (userError) {
      console.error(
        "Error al guardar datos adicionales del usuario:",
        userError.message,
      );
      throw new Error(userError.message);
    }

    // Paso 3: Cerrar sesión inmediatamente para que el usuario deba verificar su email
    await supabase.auth.signOut();

    return { authUser: authData.user, profile: userData };
  },

  async resetPassword(newPassword: string) {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw new Error(error.message);
    return data;
  },

  async forgotPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      // El deep link redirige de vuelta a la app (scheme 'toctoc' en app.json)
      redirectTo: "http://localhost:8081/reset-password",
    });

    if (error) throw new Error(error.message);
  },

  // Obtiene los tipos de documento desde el ENUM de Supabase
  async getDocumentTypes() {
    const { data, error } = await (supabase.rpc as any)("get_document_type_enum");

    if (error) throw new Error(error.message);

    return (data as string[]).map((type) => ({
      label: type,
      value: type,
    }));
  },

  async getPrefixesNumber() {
    const { data, error } = await (supabase.rpc as any)("get_prefixes_number");

    if (error) throw new Error(error.message);

    // Remove any potential duplicates from the database
    const uniquePrefixes = Array.from(new Set(data as string[]));

    return uniquePrefixes.map((type) => ({
      label: type,
      value: type,
    }));
  },
};
