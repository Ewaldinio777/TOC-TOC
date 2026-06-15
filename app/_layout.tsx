import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Stack } from 'expo-router';
import '@/global.css'; // Mantenemos tu configuración de css global

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="dark">
      {/* Stack mantiene un historial de navegación de pantallas */}
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Inicio sex' }} />
      </Stack>
    </GluestackUIProvider>
  );
}