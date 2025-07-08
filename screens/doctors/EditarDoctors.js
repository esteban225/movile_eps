import React, { useState, useEffect, act } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import BotonComponent from "../../components/BottonComponent";

export default function DetalleDoctors({ navigation }) {
    const route = useRoute();

    const doctor = route.params?.doctor;

    const [name, setName] = useState(doctor?.name || "");
    const [email, setEmail] = useState(doctor?.email || "");
    const [phone, setPhone] = useState(doctor?.phone || "");
    const [identificationType, setIdentificationType] = useState(doctor?.identificationType || "");
    const [identificationNumber, setIdentificationNumber] = useState(doctor?.identificationNumber || "");
    const [status, setStatus] = useState(doctor?.status || "");
    const [address, setAddress] = useState(doctor?.address || "");

    const [loading, setLoading] = useState(false);

    const esEdicion = !!doctor;

    const handleGuardar = async () => {
        if (!name || !apellido || !email || !phone || !identificationType || !identificationNumber || !status || !address) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }

        setLoading(true);
        let result;
        try {
            if (esEdicion) {
                result = await editarDoctor(doctor.id, {
                    name: name,
                    email: email,
                    phone: phone,
                    identificationType: identificationType,
                    identificationNumber: identificationNumber,
                    status: status,
                    address: address
                });
            } else {
                result = await crearDoctor({
                    name: name,
                    email: email,
                    phone: phone,
                    identificationType: identificationType,
                    identificationNumber: identificationNumber,
                    status: status,
                    address: address
                });
            }

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Doctor actualizado correctamente" : "Doctor creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar el doctor");
            }
        } catch (error) {
            console.error("Error al guardar doctor:", error);
            Alert.alert("Error", error.message || "Ocurrió un error inesperado al guardar la doctor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{esEdicion ? "Editar Doctor" : "Nuevo Doctor"}</Text>

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Tipo Documento"
                value={identificationType}
                onChangeText={setIdentificationType}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Número Documento"
                value={identificationNumber}
                onChangeText={setIdentificationNumber}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Status"
                value={status}
                onChangeText={setStatus}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Dorección"
                value={address}
                onChangeText={setAddress}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />

            <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.textoBoton} >{esEdicion ? "Guardar cambios" : "Crear doctor"}</Text>
                )}
            </TouchableOpacity>

        </View>
    );
}