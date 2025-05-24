import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const Page = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const router = useRouter();
  const startGroup = useMutation(api.groups.create);

  const onCreateGroup = async () => {
    await startGroup({
      name,
      description,
      icon_url: iconUrl,
    });
    router.back();
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.TextInput}
        value={name}
        onChangeText={setName}
      ></TextInput>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[
          styles.TextInput,
          { height: 100, textAlignVertical: "top", paddingTop: 10 },
        ]}
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
      />

      <Text style={styles.label}>Icon URL</Text>
      <TextInput
        style={styles.TextInput}
        value={iconUrl}
        onChangeText={setIconUrl}
      ></TextInput>
      <TouchableOpacity style={styles.button} onPress={onCreateGroup}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  label: {
    marginVertical: 10,
    fontSize: 18,
  },
  TextInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    minHeight: 40,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4169e1", // royal blue
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Page;
