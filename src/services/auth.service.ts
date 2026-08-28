import { supabase } from "@/utils/supabase";
import { RegisterFormData } from "@/src/schemas/auth.schema";

export const AuthService = {
  async register(params: RegisterFormData) {
    const {
      email,
      password,
      name,
      last_name,
      documento,
      phone,
      state,
      tipo_de_documento,
    } = params;

    // Paso 1: Crear usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw new Error(authError.message);
    if (!authData.user)
      throw new Error("No se pudo obtener el usuario registrado.");

    const userId = authData.user.id;

    // Paso 2: Crear el registro en la tabla pública 'user'
    const { data: userData, error: userError } = await supabase
      .from("user")
      .insert([
        {
          id: userId, // Vinculamos con el ID de autenticación
          name,
          last_name,
          tipo_de_documento,
          documento,
          phone,
          state,
          last_seen: new Date().toISOString(),
          avatar_url: null,
        },
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

    return { authUser: authData.user, profile: userData };
  },
};
