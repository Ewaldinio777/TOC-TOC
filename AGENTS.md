# SYSTEM RULES FOR TOC-TOC APP

## STACK TECNOLÓGICO

- Mantén fijas las versiones de package.json y el SDK de Expo en v54. No ejecutes comandos de actualización de dependencias (expo upgrade o npm update)
- **Framework:** React Native con Expo Router (`src/app`).
- **UI & Estilos:** Gluestack UI (`src/components/ui`).
- **Data Fetching & State:** TanStack Query (React Query) + Supabase.
- **Tipado & Validación:** TypeScript con Zod / Schemas.

---

## ESTRUCTURA DE CARPETAS Y RESPONSABILIDADES

Respeta estrictamente la siguiente organización para mantener el código modular y limpio:

1. `src/app/`: Exclusivo para navegación con **Expo Router**.
   - Contiene solo pantallas, layouts (`_layout.tsx`) y definición de rutas (`(auth)`, `(tabs)`).
   - **REGLA:** Las pantallas NO deben contener lógica pesada de fetching o peticiones directas a Supabase; solo invocan custom hooks de `src/hooks/` y renderizan componentes.

2. `src/components/`:
   - `ui/`: Componentes atómicos base de **Gluestack UI** (Button, Card, Input, Text, etc.). No los modifiques salvo que sea para refinamiento visual global.
   - `AppComponents/`: Componentes de UI complejos o reutilizables del negocio (ej. tarjeteros de servicios, items de chats, resúmenes de órdenes).
   - `navigate/`: Componentes específicos de barra de navegación o modales de flujo.

3. `src/services/`:
   - Peticiones puras a **Supabase** o servicios externos.
   - Retornan promesas o respuestas directas formateadas. No usan hooks de React.

4. `src/hooks/`:
   - Custom hooks de **TanStack Query** (`useQuery`, `useMutation`).
   - Conectan los servicios de `src/services/` con la interfaz de usuario.
   - Gestionan estados locales reutilizables o suscripciones en tiempo real.

5. `src/schemas/`:
   - Esquemas de validación (Zod) para formularios y entrada de datos.

6. `src/types/`:
   - Definiciones de interfaces y tipos TypeScript reutilizables en toda la aplicación.

7. `src/context/`:
   - Proveedores globales de React Context (ej. autenticación, tema o sesión).

8. `src/utils/`:
   - Configuración de clientes (`supabase.ts`) y funciones helper utilitarias de uso general.

---

## REGLAS DE CÓDIGO Y ESTILO

- **UI First:** Usa siempre componentes de `@/components/ui` (Gluestack UI) en lugar de elementos nativos directos como `<View>` o `<Text>` de React Native, salvo que sea indispensable.
- **Data Fetching:** Toda interacción de lectura o escritura en Supabase debe implementarse mediante un hook de TanStack Query en `src/hooks` consumiendo un servicio de `src/services`.
- **Rutas Importadas:** Utiliza alias absolutos `@/` apuntando a `src/` para todas las importaciones (ej. `@/components/ui/button`, `@/hooks/useOrders`).
- **Manejo de Errores y Loading:** En cada pantalla de `src/app/`, maneja explícitamente los estados `isLoading`, `isError` y `data` que entregan los hooks de TanStack Query.
- **Typescript Estricto:** Define siempre los tipos de entrada y retorno en funciones, hooks y props de componentes. Usa las definiciones centralizadas en `src/types/`.
