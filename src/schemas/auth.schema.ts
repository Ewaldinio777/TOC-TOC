import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  last_name: z.string().min(1, "El apellido es obligatorio"),
  documento: z.string().min(1, "El documento es obligatorio"),
  phone: z.string().min(8, "Ingresa un número de teléfono válido"),
  state: z.string().min(1, "El estado/región es obligatorio"),
  email: z.string().email("Ingresa un correo electrónico válido"),
  password: z.string().min(9, "La contraseña debe tener al menos 6 caracteres"),
  tipo_de_documento: z.string().min(1),
  prefixes_number: z.string().min(1),
});

export const loginSchema = z.object({
  email: z.string().email("Ingresa un correo electrónico válido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

// Infiere el tipo TypeScript automáticamente desde el esquema
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
