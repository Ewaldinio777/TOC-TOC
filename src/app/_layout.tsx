import { GluestackUIProvider } from '@/src/components/ui/gluestack-ui-provider';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import '@/global.css'; // Mantenemos tu configuración de css global

export default function RootLayout() {
  
  return (
    <GluestackUIProvider mode="light">
      {/* Stack mantiene un historial de navegación de pantallas */}
      <NativeTabs>
        <NativeTabs.Trigger name="index">
          <Label>Home</Label>
          <Icon sf="house.fill" drawable="custom_android_drawable" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="settings">
          <Icon sf="gear" drawable="custom_settings_drawable" />
          <Label>Settings</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    </GluestackUIProvider>
  );
}



