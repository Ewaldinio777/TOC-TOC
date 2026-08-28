//example

import { Stack } from "expo-router";

export default function ServicesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="chats-screen"
        options={{
          title: "Chats",
        }}
      />
    </Stack>
  );
}
