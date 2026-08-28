import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOrders } from "../../../hooks/useRegister";

export default function OrdersScreen() {
  const { orders, loading, error } = useOrders();
  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error}</Text>;

  if (orders) {
    return (
      <SafeAreaView>
        <View>
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text>
                {item.id} - {item.status}
              </Text>
            )}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    <SafeAreaView>
      <View>
        <Text>sex</Text>
      </View>
    </SafeAreaView>;
  }
}
