import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import { useState } from "react";
import { registerUser } from "../../src/services/AuthService";

export default function RegistroScreen({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //validacion del correo electrónico
  const [emailError, setEmailError] = useState("");
  const validateEmail = (text) => {
    setEmail(text);
    if (!text.includes('@')) {
      setEmailError("El correo electrónico no es valido");
    } else {
      setEmailError("");
    }
  }
  const handleRegister = async () => {

    if (password !== confirmarPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      const result = await registerUser(nombre, email, password);
      if (result.success) {
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", result.message || "Ocurrió un error al registrar el usuario");
        console.error(result.error); // Log the error for debugging
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error inesperado", [
        { text: "OK", onPress: () => console.log(error) },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.subtitle}>Regístrate para continuar</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          value={nombre}
          onChangeText={setNombre}
          editable={!loading}
          placeholderTextColor="#999"
        />
        {emailError ? <Text style={{ color: '#DC3545' }}>{emailError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={validateEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
          editable={!loading}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          secureTextEntry
          value={confirmarPassword}
          onChangeText={setConfirmarPassword}
          editable={!loading}
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Registrarse</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.secondaryButton}>
          <Text style={styles.secondaryText}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF0F6",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#F9FAFB",
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#4F46E5",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    alignItems: "center",
  },
  secondaryText: {
    color: "#4F46E5",
    fontSize: 14,
    fontWeight: "600",
  },
});
