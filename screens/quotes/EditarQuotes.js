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
import { useRoute, useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

// Servicios API (ajusta las rutas si es necesario)
import { crearQuote, editarQuote } from "../../src/services/QuotesService";
import { listarDoctors } from "../../src/services/DoctorsService";
import { listarUserEps } from "../../src/services/UsersEpsService";

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

export default function EditarQuotes() {
    const route = useRoute();
    const navigation = useNavigation();
    const quotes = route.params?.quotes;

    const [type, setType] = useState(quotes?.type || "");
    const [date, setDate] = useState(quotes?.date || "");
    const [status, setStatus] = useState(quotes?.status || "Pendiente");
    const [reason, setReason] = useState(quotes?.reason || "");
    const [observations, setObservations] = useState(quotes?.observations || "");
    const [doctorId, setDoctorId] = useState(quotes?.doctor_id?.toString() || "");
    const [userEpsId, setUserEpsId] = useState(quotes?.user_eps_id?.toString() || "");

    const [doctors, setDoctors] = useState([]);
    const [usersEps, setUsersEps] = useState([]);
    const [loading, setLoading] = useState(false);

    const esEdicion = !!quotes;

    useEffect(() => {
        const loadData = async () => {
            try {
                const [resDoctors, resUsers] = await Promise.all([listarDoctors(), listarUserEps()]);
                if (resDoctors.success) setDoctors(resDoctors.data);
                if (resUsers.success) setUsersEps(resUsers.data);
            } catch (error) {
                console.error("Error al cargar datos:", error);
                Alert.alert("Error", "No se pudo cargar la información.");
            }
        };
        loadData();
    }, []);

    const handleGuardar = async () => {
        if (!type || !date || !status || !reason || !doctorId || !userEpsId) {
            Alert.alert("Campos requeridos", "Por favor, completa todos los campos.");
            return;
        }

        setLoading(true);
        try {
            const data = {
                type,
                date,
                status,
                reason,
                observations,
                doctor_id: doctorId,
                user_eps_id: userEpsId,
            };

            const result = esEdicion
                ? await editarQuote(quotes.id, data)
                : await crearQuote(data);

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Cita actualizada." : "Cita creada.");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar la cita.");
            }
        } catch (error) {
            console.error("Error al guardar cita:", error);
            Alert.alert("Error", error.message || "Ocurrió un error inesperado.");
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
                        {esEdicion ? "Editar Cita Médica" : "Nueva Cita Médica"}
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Tipo de cita (Ej: General, Especialista...)"
                        placeholderTextColor={Colors.textPlaceholder}
                        value={type}
                        onChangeText={setType}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Fecha (YYYY-MM-DD)"
                        placeholderTextColor={Colors.textPlaceholder}
                        value={date}
                        onChangeText={setDate}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Motivo de la cita"
                        placeholderTextColor={Colors.textPlaceholder}
                        value={reason}
                        onChangeText={setReason}
                    />

                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Observaciones"
                        placeholderTextColor={Colors.textPlaceholder}
                        value={observations}
                        onChangeText={setObservations}
                        multiline
                        numberOfLines={3}
                        textAlignVertical="top"
                    />

                    {/* Select Doctor */}
                    <View style={styles.pickerContainer}>
                        <Text style={styles.pickerLabel}>Seleccione un Doctor</Text>
                        <Picker
                            selectedValue={doctorId}
                            onValueChange={setDoctorId}
                            style={styles.picker}
                        >
                            <Picker.Item label="-- Seleccione --" value="" />
                            {doctors.map((doc) => (
                                <Picker.Item key={doc.id} label={doc.name} value={String(doc.id)} />
                            ))}
                        </Picker>
                    </View>

                    {/* Select Usuario EPS */}
                    <View style={styles.pickerContainer}>
                        <Text style={styles.pickerLabel}>Seleccione Usuario EPS</Text>
                        <Picker
                            selectedValue={userEpsId}
                            onValueChange={setUserEpsId}
                            style={styles.picker}
                        >
                            <Picker.Item label="-- Seleccione --" value="" />
                            {usersEps.map((u) => (
                                <Picker.Item key={u.id} label={u.name} value={String(u.id)} />
                            ))}
                        </Picker>
                    </View>

                    {/* Estado */}
                    <View style={styles.pickerContainer}>
                        <Text style={styles.pickerLabel}>Estado</Text>
                        <Picker
                            selectedValue={status}
                            onValueChange={setStatus}
                            style={styles.picker}
                        >
                            <Picker.Item label="Pendiente" value="Pendiente" />
                            <Picker.Item label="Completada" value="Completada" />
                            <Picker.Item label="Cancelada" value="Cancelada" />
                        </Picker>
                    </View>

                    <TouchableOpacity
                        style={styles.boton}
                        onPress={handleGuardar}
                        disabled={loading}
                        activeOpacity={0.8}
                    >
                        {loading ? (
                            <ActivityIndicator color={Colors.textLight} />
                        ) : (
                            <Text style={styles.textoBoton}>
                                {esEdicion ? "Guardar Cambios" : "Crear Cita"}
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: { flexGrow: 1 },
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
        height: 100,
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
});
