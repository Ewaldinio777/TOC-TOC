import { Stack } from "expo-router";

export default function ServicesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="services-screen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="become-provider"
        options={{
          title: "Convertirse en Proveedor",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
