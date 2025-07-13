import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    ScrollView,
    KeyboardAvoidingView, // Added for better keyboard handling
    Platform, // To check the platform
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRoute } from '@react-navigation/native';
import { crearHealthCenters, editarHealthCenters } from "../../src/services/HealthCentersService";
import { Ionicons } from '@expo/vector-icons'; // For icons in the button

// --- Modern and Clean Color Palette ---
const Colors = {
    background: '#F5F7FA', // Lightest gray for the screen background
    cardBackground: '#FFFFFF', // Pure white for form fields and elevated elements
    primary: '#007AFF', // A vibrant, modern blue for main actions
    primaryDark: '#005BBF', // A darker shade of primary for button active states
    textPrimary: '#1C1C1E', // Dark charcoal for main text
    textSecondary: '#6A6A6A', // Medium gray for labels and placeholders
    inputBorder: '#E0E0E0', // Light gray for input borders
    shadow: 'rgba(0, 0, 0, 0.08)', // Subtle shadow
    danger: '#FF3B30', // Red for destructive actions (if needed)
};

export default function EditarHealthCenters({ navigation }) {
    const route = useRoute();
    const healthCenter = route.params?.healthCenter;

    const [name, setName] = useState(healthCenter?.name || "");
    const [email, setEmail] = useState(healthCenter?.email || "");
    const [phone, setPhone] = useState(healthCenter?.phone || "");
    const [type, setType] = useState(healthCenter?.type || "");
    const [status, setStatus] = useState(healthCenter?.status?.toString() || "1");
    const [address, setAddress] = useState(healthCenter?.address || "");
    const [loading, setLoading] = useState(false);

    const esEdicion = !!healthCenter;

    const handleGuardar = async () => {
        if (!name || !email || !phone || !type || status === "" || !address) {
            Alert.alert("Campos Requeridos", "Por favor, complete todos los campos.");
            return;
        }

        setLoading(true);
        try {
            const data = {
                name,
                email,
                phone,
                type,
                status: parseInt(status),
                address,
            };

            const result = esEdicion
                ? await editarHealthCenters(healthCenter.id, data)
                : await crearHealthCenters(data);

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Centro de salud actualizado correctamente." : "Centro de salud creado correctamente.");
                navigation.navigate('ListarHealthCenter');
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar el centro de salud. Intente de nuevo.");
            }
        } catch (error) {
            console.error("Error al guardar:", error);
            Alert.alert("Error", error.message || "Ocurrió un error inesperado al guardar.");
        } finally {
            setLoading(false);
        }
    };

    return (
        // KeyboardAvoidingView ensures inputs are not hidden by the keyboard
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 20} // Adjust offset as needed
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>
                    {esEdicion ? "Editar Centro de Salud" : "Nuevo Centro de Salud"}
                </Text>

                {/* Name Input */}
                <Text style={styles.label}>Nombre del Centro</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese el nombre del centro"
                    placeholderTextColor={Colors.textSecondary}
                    value={name}
                    onChangeText={setName}
                />

                {/* Email Input */}
                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                    style={styles.input}
                    placeholder="ejemplo@dominio.com"
                    placeholderTextColor={Colors.textSecondary}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none" // Prevent auto-capitalization for emails
                />

                {/* Phone Input */}
                <Text style={styles.label}>Teléfono de contacto</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej: 3101234567"
                    placeholderTextColor={Colors.textSecondary}
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                />

                {/* Type Input */}
                <Text style={styles.label}>Tipo</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej: Hospital, Clínica, Centro de Salud"
                    placeholderTextColor={Colors.textSecondary}
                    value={type}
                    onChangeText={setType}
                />

                {/* Status Picker */}
                <Text style={styles.label}>Estado</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={status}
                        onValueChange={(itemValue) => setStatus(itemValue)}
                        style={styles.picker}
                        itemStyle={styles.pickerItem} // Apply style to picker items (iOS only)
                    >
                        <Picker.Item label="Activo" value="1" />
                        <Picker.Item label="Inactivo" value="0" />
                    </Picker>
                </View>

                {/* Address Input (TextArea) */}
                <Text style={styles.label}>Dirección</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Dirección completa del centro"
                    placeholderTextColor={Colors.textSecondary}
                    value={address}
                    onChangeText={setAddress}
                    multiline
                    numberOfLines={4} // Give more lines for better visual
                />

                {/* Save Button */}
                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleGuardar}
                    disabled={loading}
                    activeOpacity={0.8}
                >
                    {loading ? (
                        <ActivityIndicator color={Colors.textLight} />
                    ) : (
                        <>
                            <Ionicons name="save-outline" size={20} color={Colors.textLight} style={styles.buttonIcon} />
                            <Text style={styles.buttonText}>
                                {esEdicion ? "Guardar Cambios" : "Crear Centro de Salud"}
                            </Text>
                        </>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: Colors.background, // Use defined background color
    },
    title: {
        fontSize: 26, // Slightly larger title
        fontWeight: "700", // Bolder title
        marginBottom: 30, // More space below title
        color: Colors.textPrimary,
        textAlign: "center",
    },
    label: {
        marginBottom: 8, // More space below label
        fontSize: 15,
        color: Colors.textPrimary, // Use primary text color for labels
        fontWeight: '600', // Make labels a bit bolder
    },
    input: {
        backgroundColor: Colors.cardBackground, // White background for inputs
        borderRadius: 10,
        paddingHorizontal: 15, // Horizontal padding
        paddingVertical: 12, // Vertical padding
        marginBottom: 20, // More space below inputs
        fontSize: 16,
        borderColor: Colors.inputBorder,
        borderWidth: 1,
        color: Colors.textPrimary, // Text color for input content
        shadowColor: Colors.shadow, // Subtle shadow for inputs
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    pickerContainer: {
        backgroundColor: Colors.cardBackground,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.inputBorder,
        marginBottom: 20,
        overflow: 'hidden', // Ensures border radius is applied correctly on Android
        shadowColor: Colors.shadow, // Subtle shadow for picker
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    picker: {
        height: 50,
        width: "100%",
        color: Colors.textPrimary, // Color of selected picker item text
    },
    pickerItem: { // Style for Picker.Item (iOS only)
        fontSize: 16,
        color: Colors.textPrimary,
    },
    textArea: {
        minHeight: 100, // Minimum height for the address textarea
        textAlignVertical: "top", // Aligns text to the top for multiline input
    },
    button: {
        backgroundColor: Colors.primary, // Use vibrant blue for the button
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 20, // More space above the button
        flexDirection: 'row', // Align icon and text
        shadowColor: Colors.primary, // Shadow color matching button
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
    },
    buttonDisabled: {
        opacity: 0.7, // Slightly more opaque when disabled
        backgroundColor: Colors.primaryDark, // Darker primary when disabled
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