import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="Services"
        options={{
          title: "Services",
        }}
      />

      <Tabs.Screen
        name="Chats"
        options={{
          title: "Chats",
        }}
      />

      <Tabs.Screen
        name="Explore"
        options={{
          title: "Explore",
        }}
      />

      <Tabs.Screen
        name="Orders"
        options={{
          title: "Orders",
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
