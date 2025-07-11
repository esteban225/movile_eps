import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottonComponent from "../../components/BottonComponent"; // Asegúrate de que la ruta sea correcta

import api from "../../src/services/Connection";
import { logoutUser } from "../../src/services/AuthService"; 


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
                console.error("Error al cargar el perfil:", error);
                if (error.response) {
                    Alert.alert(
                        "Error del servidor",
                        `Error ${error.response.status}: ${error.response.data?.message || "No se pudo cargar el perfil"}`,
                        [
                            {
                                text: "OK",
                                onPress: async () => {
                                    if (error.response.status === 401) {
                                        await AsyncStorage.removeItem("userToken");
                                        navigation.replace("Login");
                                    }
                                }
                            }
                        ]
                    );
                } else if (error.request) {
                    Alert.alert(
                        "Error de conexión",
                        "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
                        [
                            {
                                text: "OK",
                                onPress: async () => {
                                    await AsyncStorage.removeItem("userToken");
                                    navigation.replace("Login");
                                }
                            }
                        ]
                    );
                } else {
                    Alert.alert(
                        "Error",
                        "Ocurrió un error inesperado al cargar el perfil.",
                        [
                            {
                                text: "OK",
                                onPress: async () => {
                                    await AsyncStorage.removeItem("userToken");
                                    navigation.replace("Login");
                                }
                            }
                        ]
                    );
                }
            } finally {
                setLoading(false);
            }
        };
        cargarPerfil();
    }, []);

    const handleLogout = async () => {
      try {
        const result = await logoutUser();
        if (result.success) {
          Alert.alert("Sesión Cerrada", "Has cerrado sesión exitosamente.");
          navigation.replace("Login"); // Redirigir al login
        } else {
          Alert.alert("Error al cerrar sesión", result.message || "No se pudo cerrar la sesión.");
        }
      } catch (error) {
        console.error("Error inesperado al cerrar sesión:", error);
        Alert.alert("Error", "Ocurrió un error inesperado al intentar cerrar sesión.");
      }
    };


    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando perfil...</Text>
            </View>
        );
    }

    if (!usuario) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Perfil de Usuario</Text>
                <View style={styles.containerPerfil}>
                    <Text style={styles.errorText}>
                        No se pudo cargar la información del perfil.
                    </Text>
                    <BottonComponent
                        title="Ir a Iniciar Sesión"
                        onPress={async () => {
                            await AsyncStorage.removeItem("userToken");
                            navigation.replace("Login");
                        }}
                        buttonStyle={styles.loginButton} // Estilo para el botón de ir a Login
                        textStyle={styles.buttonText}
                    />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Mi Perfil</Text>
            <View style={styles.containerPerfil}>
                <Text style={styles.profileText}><Text style={styles.detailLabel}>Nombre: </Text>{usuario.user?.name || "No disponible"}</Text>
                <Text style={styles.profileText}><Text style={styles.detailLabel}>Email: </Text>{usuario.user?.email || "No disponible"}</Text>
                <Text style={styles.profileText}><Text style={styles.detailLabel}>Rol: </Text>{usuario.user?.role || "No disponible"}</Text>
                {usuario.user?.telefono && (
                    <Text style={styles.profileText}><Text style={styles.detailLabel}>Teléfono: </Text>{usuario.user.telefono}</Text>
                )}

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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E0F2F7", // Fondo más suave y azul claro
        padding: 20,
    },
    title: {
        fontSize: 32, // Título más grande
        fontWeight: "bold",
        marginBottom: 35, // Mayor margen inferior
        color: "#007B8C", // Color azul oscuro para el título
        textShadowColor: 'rgba(0, 0, 0, 0.1)', // Sombra sutil en el texto
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    containerPerfil: {
        width: "100%",
        maxWidth: 400,
        padding: 30, // Mayor padding interno
        backgroundColor: "#FFFFFF", // Fondo blanco limpio
        borderRadius: 20, // Esquinas más redondeadas
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 }, // Sombra más pronunciada
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 12, // Elevación para Android
        alignItems: "flex-start",
    },
    profileText: {
        fontSize: 18,
        marginBottom: 10, // Espacio entre líneas de texto
        color: "#333", // Color de texto más oscuro para mayor legibilidad
        width: "100%",
        borderBottomWidth: StyleSheet.hairlineWidth, // Línea sutil en la parte inferior
        borderBottomColor: "#E0E0E0", // Color de línea más claro
        paddingBottom: 8,
        paddingTop: 5, // Pequeño padding superior para la línea
    },
    detailLabel: {
        fontWeight: 'bold', 
        color: "#1C2E4A", 
    },
    errorText: {
        fontSize: 16,
        color: "#D32F2F", // Rojo más fuerte para errores
        textAlign: "center",
        marginBottom: 20,
        width: "100%",
        fontWeight: 'bold',
    },
    profileButtonContainer: {
        marginTop: 30, 
        width: '100%',
        alignItems: 'center', 
    },
    editProfileButton: {
        backgroundColor: "#007B8C", 
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginTop: 15,
        width: '90%', // Ancho del botón
        alignSelf: 'center', 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    logoutButton: {
        backgroundColor: "#DC3545", // Rojo vibrante para "Cerrar Sesión"
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginTop: 15,
        width: '90%', // Ancho del botón
        alignSelf: 'center', // Centrar el botón
        shadowColor: "#000", // Sombra para los botones
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    loginButton: { 
      backgroundColor: "#6C757D", // Gris oscuro
      paddingVertical: 14,
      paddingHorizontal: 25,
      borderRadius: 10,
      marginTop: 20,
      width: '90%',
      alignSelf: 'center',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 18, // Texto de botón más grande
    },
});