import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useRoute } from '@react-navigation/native';

// API services
import { crearuser, editaruser } from '../../src/services/UsersEpsService';

// Colores personalizados
const Colors = {
    primary: '#4CAF50',
    primaryDark: '#388E3C',
    background: '#F0F2F5',
    cardBackground: '#FFFFFF',
    textPrimary: '#212121',
    textSecondary: '#757575',
    textLight: '#FFFFFF',
    danger: '#DC3545',
    shadow: 'rgba(0,0,0,0.1)',
    inputBorder: '#CFD8DC',
    inputFocusBorder: '#9E9E9E',
    textPlaceholder: '#9E9E9E',
};

export default function EditarProfile({ navigation }) {
    const route = useRoute();
    const user = route.params?.user;

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [address, setAddress] = useState(user?.address || "");


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

    const [loading, setLoading] = useState(false);
    const esEdicion = !!user;



    const roles = [
        { label: "Afiliado", value: "Afiliado" },
        { label: "Administrador", value: "Administrador" },
        { label: "Profesional de la Salud", value: "Profesional" },
        { label: "Soporte", value: "Soporte" },
    ];

    const handleGuardar = async () => {
        if (!name || !email || !phone || !address) {
            Alert.alert("Campos requeridos", "Por favor, complete todos los campos.");
            return;
        }

        setLoading(true);
        try {
            const data = {
                name,
                email,
                phone,
                address
            };

            const result = esEdicion
                ? await editaruser(user.id, data)
                : await crearuser(data);

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Usuario actualizado." : "Usuario creado.");
                navigation.navigate('Listaruser');
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar el usuario.");
            }
        } catch (error) {
            console.error("Error al guardar usuario:", error);
            Alert.alert("Error", error.message || "Error inesperado al guardar.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        {esEdicion ? "Editar Usuario EPS" : "Nuevo Usuario EPS"}
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Nombre completo"
                        placeholderTextColor={Colors.textPlaceholder}
                        value={name}
                        onChangeText={setName}
                    />
                    {emailError ? <Text style={{ color: Colors.danger }}>{emailError}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={Colors.textPlaceholder}
                        value={email}
                        onChangeText={validateEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Teléfono"
                        placeholderTextColor={Colors.textPlaceholder}
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />

                    <TextInput
                        style={[styles.input]}
                        placeholder="Dirección"
                        placeholderTextColor={Colors.textPlaceholder}
                        value={address}
                        onChangeText={setAddress}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />

                    <TouchableOpacity
                        style={styles.boton}
                        onPress={handleGuardar}
                        disabled={loading}
                        activeOpacity={0.8}
                    >
                        {loading ? (
                            <ActivityIndicator color={Colors.textLight} />
                        ) : (
                            <>
                                <Text style={styles.buttonText}>
                                    {esEdicion ? "Guardar Cambios" : "Crear"}
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 60,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.background,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 25,
        textAlign: 'center',
        color: Colors.textPrimary,
    },
    input: {
        height: 55,
        borderColor: Colors.inputBorder,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 18,
        marginBottom: 18,
        backgroundColor: Colors.cardBackground,
        fontSize: 17,
        color: Colors.textPrimary,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    textArea: {
        height: 120,
        paddingTop: 15,
    },
    pickerContainer: {
        borderColor: Colors.inputBorder,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 18,
        backgroundColor: Colors.cardBackground,
        paddingHorizontal: 10,
        justifyContent: 'center',
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    pickerLabel: {
        fontSize: 14,
        color: Colors.textSecondary,
        paddingLeft: 10,
        paddingTop: 0,
        position: 'absolute',
        top: -10,
        backgroundColor: Colors.background,
        paddingHorizontal: 5,
        left: 10,
        zIndex: 1,
    },
    picker: {
        height: 55,
        width: '100%',
        color: Colors.textPrimary,
    },
    pickerItem: {
        fontSize: 17,
        color: Colors.textPrimary,
    },
    boton: {
        backgroundColor: Colors.primary,
        paddingVertical: 18,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30,
        elevation: 5,
        shadowColor: Colors.primaryDark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    textoBoton: {
        color: Colors.textLight,
        fontSize: 19,
        fontWeight: 'bold',
    },
    buttonText: {
        color: Colors.textLight, // White text
        fontSize: 18, // Slightly larger text
        fontWeight: "700", // Bolder text
    },
    buttonIcon: {
        marginRight: 10, // Space between icon and text
    }
});
