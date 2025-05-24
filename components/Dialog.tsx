import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface DialogProps {
  visible: boolean;
  onClose?: () => void;
  onSubmit?: (name: string) => void;
}

const Dialog = () => {
  return null; // Placeholder for the actual dialog component
};

// Container component that handles the modal logic
const DialogContainer: React.FC<{ visible: boolean; onClose?: () => void }> = ({
  visible,
  onClose,
}) => {
  const [name, setName] = React.useState("");

  const handleSubmit = async () => {
    if (name.trim().length > 0) {
      try {
        await AsyncStorage.setItem("user", name);
        onClose?.();
      } catch (error) {
        console.error("Error saving name:", error);
      }
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.message}>Please enter your name to continue</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4169e1",
    padding: 12,
    borderRadius: 5,
    width: "100%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

Dialog.container = DialogContainer;

export default Dialog;
