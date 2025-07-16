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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottonComponent from "../../components/BottonComponent";
import api from "../../src/services/Connection";
import { logoutUser } from "../../src/services/AuthService";

const PROFILE_PLACEHOLDER_IMAGE = "https://placehold.co/130x130/EAF6F6/005662?text=👤";

export default function ProfileScreen({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          navigation.replace("Login");
          return;
        }

        const response = await api.get("/me");
        setUsuario(response.data);
      } catch (error) {
        console.error("Error al cargar perfil:", error);
        Alert.alert("Error", "No se pudo cargar el perfil. Vuelve a iniciar sesión.");
        await AsyncStorage.removeItem("userToken");
        navigation.replace("Login");
      } finally {
        setLoading(false);
      }
    };
    cargarPerfil();
  }, []);

  const handleLogout = async () => {
    Alert.alert("Cerrar sesión", "¿Deseas cerrar sesión?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Cerrar sesión",
        style: "destructive",
        onPress: async () => {
          try {
            const result = await logoutUser();
            if (result.success) {
              await AsyncStorage.removeItem("userToken");
              navigation.replace("Login");
            } else {
              Alert.alert("Error", result.message || "No se pudo cerrar sesión.");
            }
          } catch {
            Alert.alert("Error", "Error al cerrar sesión.");
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  if (!usuario) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Perfil de Usuario</Text>
        <View style={styles.card}>
          <Text style={styles.errorText}>No se pudo cargar la información.</Text>
          <BottonComponent
            title="Iniciar sesión"
            onPress={async () => {
              await AsyncStorage.removeItem("userToken");
              navigation.replace("Login");
            }}
            buttonStyle={styles.loginButton}
            textStyle={styles.buttonText}
          />
        </View>
      </SafeAreaView>
    );
  }

  const handleEditProfile = () => {
    navigation.navigate("editarPerfil");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image
            source={{ uri: usuario.user?.profileImage || PROFILE_PLACEHOLDER_IMAGE }}
            style={styles.profileImage}
          />
          <Text style={styles.title}>Mi Perfil</Text>
          <Text style={styles.subtitle}>Bienvenido, {usuario.user?.name || "Usuario"}</Text>
        </View>

        <View style={styles.card}>
          <InfoRow label="👤 Nombre" value={usuario.user?.name} />
          <InfoRow label="📧 Email" value={usuario.user?.email} />

          <View style={styles.profileButtonContainer}>
            <BottonComponent
              title="Editar Perfil"
              onPress={handleEditProfile}
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

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.profileTextValue}>{value || "No disponible"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContent: {
    flexGrow: 1,
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
    color: "#495057",
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
    backgroundColor: "#E9ECEF",
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#007BFF",
    elevation: 12,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#212529",
  },
  subtitle: {
    fontSize: 18,
    color: "#495057",
    marginTop: 8,
    fontWeight: "500",
  },
  card: {
    width: "100%",
    maxWidth: 450,
    padding: 30,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#DEE2E6",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E9ECEF",
  },
  detailLabel: {
    fontWeight: "700",
    color: "#212529",
    fontSize: 17,
    flex: 1,
    marginRight: 15,
  },
  profileTextValue: {
    fontSize: 17,
    color: "#495057",
    flex: 2,
    textAlign: "right",
    fontWeight: "400",
  },
  profileButtonContainer: {
    marginTop: 40,
    width: "100%",
    alignItems: "center",
  },
  editProfileButton: {
    backgroundColor: "#007BFF",
    borderRadius: 15,
    paddingVertical: 16,
    width: "100%",
    marginBottom: 18,
    elevation: 8,
  },
  logoutButton: {
    backgroundColor: "#DC3545",
    borderRadius: 15,
    paddingVertical: 16,
    width: "100%",
    elevation: 8,
  },
  loginButton: {
    backgroundColor: "#6C757D",
    paddingVertical: 16,
    borderRadius: 15,
    marginTop: 25,
    width: "100%",
    elevation: 6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 19,
    textAlign: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#DC3545",
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "bold",
  },
});
