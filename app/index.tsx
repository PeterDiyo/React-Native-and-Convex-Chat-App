import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const Page = () => {
  const groups = useQuery(api.groups.get) || [];

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ScrollView>
        {groups.map((group) => (
          <View key={group._id}>
            <Text style={{ padding: 4, fontSize: 16 }}>{group.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Page;
