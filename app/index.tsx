import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const Page = () => {
  const groups = useQuery(api.groups.get) || [];

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ScrollView>
        {groups.map((group) => (
          <View key={group._id}>
            <Text>{group.name}</Text>
            <Text>{group.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Page;
