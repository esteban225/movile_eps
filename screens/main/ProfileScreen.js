import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity, // Added for potential future interactive elements
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Assuming BottonComponent is a custom button component you have
import BottonComponent from "../../components/BottonComponent";
// Assuming api and logoutUser are correctly configured services
import api from "../../src/services/Connection";
import { logoutUser } from "../../src/services/AuthService";

// Placeholder image URL for demonstration.
// In a real app, you'd use a local asset or a user's actual profile picture URL.
const PROFILE_PLACEHOLDER_IMAGE = "https://placehold.co/130x130/EAF6F6/005662?text=👤";

export default function ProfileScreen({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        // Retrieve the authentication token from AsyncStorage
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          // If no token is found, redirect to the Login screen
          navigation.replace("Login");
          return;
        }

        // Fetch user profile data from the API
        const response = await api.get("/me");
        setUsuario(response.data); // Set the fetched user data
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
        // Handle different types of errors gracefully
        if (error.response) {
          // Server-side errors (e.g., 401 Unauthorized, 404 Not Found)
          Alert.alert(
            "Error del Servidor",
            `Error ${error.response.status}: ${error.response.data?.message || "No se pudo cargar el perfil."}`,
            [
              {
                text: "OK",
                onPress: async () => {
                  if (error.response.status === 401) {
                    // If unauthorized, clear token and redirect to login
                    await AsyncStorage.removeItem("userToken");
                    navigation.replace("Login");
                  }
                },
              },
            ]
          );
        } else if (error.request) {
          // Network errors (e.g., no internet connection)
          Alert.alert(
            "Error de Conexión",
            "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
            [
              {
                text: "OK",
                onPress: async () => {
                  // Clear token and redirect to login on connection error
                  await AsyncStorage.removeItem("userToken");
                  navigation.replace("Login");
                },
              },
            ]
          );
        } else {
          // Other unexpected errors
          Alert.alert(
            "Error Inesperado",
            "Ocurrió un error inesperado al cargar el perfil. Inténtalo de nuevo.",
            [
              {
                text: "OK",
                onPress: async () => {
                  // Clear token and redirect to login on unexpected error
                  await AsyncStorage.removeItem("userToken");
                  navigation.replace("Login");
                },
              },
            ]
          );
        }
      } finally {
        setLoading(false); // Always set loading to false once the operation completes
      }
    };
    cargarPerfil(); // Call the function to load the profile when the component mounts
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handle user logout
  const handleLogout = async () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres cerrar tu sesión?",
      [
        { text: "Cancelar", style: "cancel" }, // Cancel button
        {
          text: "Sí, cerrar sesión", // Confirm logout button
          onPress: async () => {
            try {
              const result = await logoutUser(); // Call the logout service
              if (result.success) {
                Alert.alert("Sesión Cerrada", "Has cerrado sesión exitosamente.");
                navigation.replace("Login"); // Redirect to login after successful logout
              } else {
                Alert.alert("Error", result.message || "No se pudo cerrar sesión.");
              }
            } catch (error) {
              console.error("Error cerrando sesión:", error);
              Alert.alert("Error", "Ocurrió un error al cerrar sesión.");
            }
          },
          style: "destructive", // Style for destructive action
        },
      ]
    );
  };

  // Display loading indicator while data is being fetched
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" /> {/* Updated color */}
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  // Display error message if profile data could not be loaded
  if (!usuario) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Perfil de Usuario</Text>
        <View style={styles.card}>
          <Text style={styles.errorText}>No se pudo cargar la información del perfil.</Text>
          <BottonComponent
            title="Ir a Iniciar Sesión"
            onPress={async () => {
              await AsyncStorage.removeItem("userToken"); // Ensure token is cleared
              navigation.replace("Login");
            }}
            buttonStyle={styles.loginButton}
            textStyle={styles.buttonText}
          />
        </View>
      </SafeAreaView>
    );
  }

  // Render the user profile details
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          {/* Profile Image */}
          <Image
            source={{ uri: usuario.user?.profileImage || PROFILE_PLACEHOLDER_IMAGE }}
            style={styles.profileImage}
          />
          <Text style={styles.title}>Mi Perfil</Text>
          <Text style={styles.subtitle}>¡Bienvenido de nuevo!</Text>
        </View>

        <View style={styles.card}>
          {/* User Information Rows */}
          <View style={styles.infoRow}>
            <Text style={styles.detailLabel}>👤 Nombre</Text>
            <Text style={styles.profileTextValue}>{usuario.user?.name || "No disponible"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.detailLabel}>📧 Email</Text>
            <Text style={styles.profileTextValue}>{usuario.user?.email || "No disponible"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.detailLabel}>🛡️ Rol</Text>
            <Text style={styles.profileTextValue}>{usuario.user?.role || "No disponible"}</Text>
          </View>
          {usuario.user?.telefono && (
            <View style={styles.infoRow}>
              <Text style={styles.detailLabel}>📞 Teléfono</Text>
              <Text style={styles.profileTextValue}>{usuario.user.telefono}</Text>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.profileButtonContainer}>
            <BottonComponent
              title="Editar Perfil"
              onPress={() => Alert.alert("Funcionalidad Pendiente", "La edición del perfil aún no está implementada.")}
              buttonStyle={styles.editProfileButton}
              textStyle={styles.buttonText}
            />
            <BottonComponent
              title="Cerrar Sesión"
              onPress={handleLogout}
              buttonStyle={styles.logoutButton}
              textStyle={styles.buttonText}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA", // Very light background
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 25,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  loadingText: {
    marginTop: 15,
    fontSize: 18,
    color: "#495057", // Medium dark text
    fontWeight: "500",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#E9ECEF", // Light grey for image background
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#007BFF", // Primary blue accent
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15, // Slightly less intense shadow
    shadowRadius: 10, // Slightly smaller radius
    elevation: 12,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#212529", // Darker text for prominence
    textShadowColor: "rgba(0, 0, 0, 0.05)", // Subtle text shadow
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 18,
    color: "#495057", // Softer color for subtitle
    marginTop: 8,
    fontWeight: "500",
  },
  card: {
    width: "100%",
    maxWidth: 450,
    padding: 30,
    backgroundColor: "#FFFFFF",
    borderRadius: 20, // Slightly less rounded for a sharper professional look
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 }, // Adjusted shadow
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 15,
    alignItems: "flex-start",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#DEE2E6", // Lighter, more subtle border
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E9ECEF", // Lighter separator
  },
  detailLabel: {
    fontWeight: "700",
    color: "#212529", // Darker text for labels
    fontSize: 17,
    flex: 1,
    marginRight: 15,
  },
  profileTextValue: {
    fontSize: 17,
    color: "#495057", // Medium dark text for values
    flex: 2,
    textAlign: "right",
    fontWeight: "400",
  },
  errorText: {
    fontSize: 18,
    color: "#DC3545", // Red for errors
    textAlign: "center",
    marginBottom: 30,
    width: "100%",
    fontWeight: "bold",
  },
  profileButtonContainer: {
    marginTop: 40,
    width: "100%",
    alignItems: "center",
  },
  editProfileButton: {
    backgroundColor: "#007BFF", // Primary blue
    borderRadius: 15,
    paddingVertical: 16,
    width: "100%",
    marginBottom: 18,
    elevation: 8,
    shadowColor: "#007BFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, // Adjusted shadow opacity
    shadowRadius: 5,
  },
  logoutButton: {
    backgroundColor: "#DC3545", // Professional red
    borderRadius: 15,
    paddingVertical: 16,
    width: "100%",
    elevation: 8,
    shadowColor: "#DC3545",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  loginButton: {
    backgroundColor: "#6C757D", // Neutral grey
    paddingVertical: 16,
    borderRadius: 15,
    marginTop: 25,
    width: "100%",
    elevation: 6,
    shadowColor: "#6C757D",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 19,
    textAlign: "center",
  },
});
