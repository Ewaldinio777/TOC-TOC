import { Stack } from "expo-router";

export default function ServicesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="services-screen"
        options={{
          title: "Servicios",
        }}
      />
    </Stack>
  );
}
