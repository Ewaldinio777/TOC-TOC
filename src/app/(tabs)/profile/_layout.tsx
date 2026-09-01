//example

import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="profile-screen"
        options={{
          title: "Mi Perfil",
        }}
      />
      <Stack.Screen
        name="become-provider"
        options={{
          title: "Convertirse en Profesional",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
