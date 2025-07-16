import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { loginUser } from "../../src/services/AuthService";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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


  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        Alert.alert("Éxito", "Inicio de sesión exitoso", [
          {
            text: "OK",
            onPress: () =>
              console.log("Login exitoso, redirigiendo automaticamente ...."),
          },
        ]);
      } else {
        Alert.alert('Error al ingresar', result.message)
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error inesperado", error ,[
        { text: "OK", onPress: () => console.log(error) },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
        {emailError ? <Text style={{ color: '#DC3545' }}>{emailError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={validateEmail}
          keyboardType="email-address"
          autoCapitalize="none"
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

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Ingresar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Registro")}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryText}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#EAF0F6",
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
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#777",
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#F9FAFB",
    marginBottom: 16,
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
