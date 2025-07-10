import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'; // Import the Picker component

// --- Mock API Functions (Replace with your actual API calls) ---
// You should import these from your services file, e.g.:
// import { crearUserEps, editarUserEps } from '../../services/userEpsApi';

const crearUserEps = async (userData) => {
    console.log("Simulating API call: Creating User EPS with data:", userData);
    return new Promise(resolve => setTimeout(() => resolve({ success: true, message: "Usuario creado exitosamente (Simulado)" }), 1500));
};

const editarUserEps = async (id, userData) => {
    console.log(`Simulating API call: Editing User EPS ${id} with data:`, userData);
    return new Promise(resolve => setTimeout(() => resolve({ success: true, message: "Usuario actualizado exitosamente (Simulado)" }), 1500));
};
// ---------------------------------------------------------------

export default function DetalleUserEps({ navigation }) {
    const route = useRoute();
    const userEps = route.params?.userEps;

    // Initialize states with existing data or sensible defaults for pickers
    const [name, setName] = useState(userEps?.name || "");
    const [email, setEmail] = useState(userEps?.email || "");
    const [phone, setPhone] = useState(userEps?.phone || "");
    const [identificationType, setIdentificationType] = useState(userEps?.identificationType || "CC"); // Default value
    const [identificationNumber, setIdentificationNumber] = useState(userEps?.identificationNumber || "");
    const [userRole, setUserRole] = useState(userEps?.type || "Afiliado"); // Renamed 'type' to 'userRole' for clarity
    const [status, setStatus] = useState(userEps?.status || "Activo"); // Default value
    const [address, setAddress] = useState(userEps?.address || "");
    // Note: 'role' state here seems redundant if 'type' (userRole) covers it.
    // If 'role' is different from 'type', you can keep it and add another picker.
    // const [role, setRole] = useState(userEps?.role || ""); 

    const [loading, setLoading] = useState(false);
    const esEdicion = !!userEps;

    // Options for Identification Type Picker
    const identificationTypes = [
        { label: "Cédula de Ciudadanía", value: "CC" },
        { label: "Tarjeta de Identidad", value: "TI" },
        { label: "Pasaporte", value: "PAS" },
        { label: "Cédula de Extranjería", value: "CE" },
    ];

    // Options for User Role/Type Picker (assuming 'type' means role)
    const userRoles = [
        { label: "Afiliado", value: "Afiliado" },
        { label: "Administrador", value: "Administrador" },
        { label: "Profesional de la Salud", value: "Profesional" },
        { label: "Soporte", value: "Soporte" },
    ];

    // Options for Status Picker
    const userStatuses = [
        { label: "Activo", value: "Activo" },
        { label: "Inactivo", value: "Inactivo" },
        { label: "Pendiente", value: "Pendiente" },
        { label: "Bloqueado", value: "Bloqueado" },
    ];

    const handleGuardar = async () => {
        // --- Corrected validation: Removed 'apellido' ---
        if (!name || !email || !phone || !identificationType || !identificationNumber || !userRole || !status || !address) {
            Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios.");
            return;
        }

        setLoading(true);
        let result;
        try {
            const userDataToSave = {
                name,
                email,
                phone,
                identificationType,
                identificationNumber,
                type: userRole, // Send 'userRole' as 'type' to the API
                status,
                address
                // If 'role' is a separate field, add it here too: role: role
            };

            if (esEdicion) {
                result = await editarUserEps(userEps.id, userDataToSave);
            } else {
                result = await crearUserEps(userDataToSave);
            }

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Usuario actualizado correctamente" : "Usuario creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar el Usuario.");
            }
        } catch (error) {
            console.error("Error al guardar Usuario:", error);
            Alert.alert("Error", error.message || "Ocurrió un error inesperado al guardar el Usuario.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{esEdicion ? "Editar Usuario EPS" : "Nuevo Usuario EPS"}</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Teléfono"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />

            {/* Picker for Identification Type */}
            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Tipo de Identificación:</Text>
                <Picker
                    selectedValue={identificationType}
                    onValueChange={(itemValue, itemIndex) => setIdentificationType(itemValue)}
                    style={styles.picker}
                >
                    {identificationTypes.map((item, index) => (
                        <Picker.Item key={index} label={item.label} value={item.value} />
                    ))}
                </Picker>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Número de Identificación"
                value={identificationNumber}
                onChangeText={setIdentificationNumber}
                keyboardType="numeric" // Appropriate for identification numbers
            />

            {/* Picker for User Role/Type */}
            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Tipo de Usuario:</Text>
                <Picker
                    selectedValue={userRole}
                    onValueChange={(itemValue, itemIndex) => setUserRole(itemValue)}
                    style={styles.picker}
                >
                    {userRoles.map((item, index) => (
                        <Picker.Item key={index} label={item.label} value={item.value} />
                    ))}
                </Picker>
            </View>

            {/* Picker for Status */}
            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Estado:</Text>
                <Picker
                    selectedValue={status}
                    onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}
                    style={styles.picker}
                >
                    {userStatuses.map((item, index) => (
                        <Picker.Item key={index} label={item.label} value={item.value} />
                    ))}
                </Picker>
            </View>

            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Dirección"
                value={address}
                onChangeText={setAddress}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
            />

            <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.textoBoton}>{esEdicion ? "Guardar cambios" : "Crear Usuario"}</Text>
                )}
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    textArea: {
        height: 100, // Increased height for multiline text areas
    },
    pickerContainer: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        justifyContent: 'center', // Vertically centers content in the picker container
    },
    pickerLabel: {
        fontSize: 14,
        color: '#666',
        paddingLeft: 10,
        paddingTop: 5,
        position: 'absolute', // Position label above the picker
        top: -10, // Adjust as needed
        backgroundColor: '#f8f8f8', // Match background to hide border line underneath
        paddingHorizontal: 5,
        left: 10,
        zIndex: 1, // Ensure label is above picker
    },
    picker: {
        height: 50, // Standard height for input fields
        width: '100%',
    },
    boton: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    textoBoton: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});