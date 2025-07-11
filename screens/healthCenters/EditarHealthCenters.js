import React, { useState, useEffect, act } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import BotonComponent from "../../components/BottonComponent";
import { crearHealthCenters, editarHealthCenters } from "../../src/services/HealthCentersService";

export default function EditarHealthCenters({ navigation }) {
    const route = useRoute();

    const healthCenter = route.params?.healthCenter;

    const [name, setName] = useState(healthCenter?.name || "");
    const [email, setEmail] = useState(healthCenter?.email || "");
    const [phone, setPhone] = useState(healthCenter?.phone || "");
    const [type, setType] = useState(healthCenter?.type || "")
    const [status, setStatus] = useState(healthCenter?.status || "");
    const [address, setAddress] = useState(healthCenter?.address || "");

    const [loading, setLoading] = useState(false);

    const esEdicion = !!healthCenter;

    const handleGuardar = async () => {
        if (!name || !apellido || !email || !phone || !type  || !status || !address) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }

        setLoading(true);
        let result;
        try {
            if (esEdicion) {
                result = await editarHealthCenters(healthCenter.id, {
                    name: name,
                    email: email,
                    phone: phone,
                    type: type,
                    status: status,
                    address: address
                });
            } else {
                result = await crearHealthCenters({
                    name: name,
                    email: email,
                    phone: phone,
                    type: type,
                    status: status,
                    address: address
                });
            }

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Centro de salud actualizado correctamente" : "Centro de salud creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar el Centro de salud");
            }
        } catch (error) {
            console.error("Error al guardar Centro de salud:", error);
            Alert.alert("Error", error.message || "Ocurrió un error inesperado al guardar el Centro de salud.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{esEdicion ? "Editar Centro de salud" : "Nuevo Centro de salud"}</Text>

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
                value={type}
                onChangeText={setType}
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
                    <Text style={styles.textoBoton} >{esEdicion ? "Guardar cambios" : "Crear Centro de salud"}</Text>
                )}
            </TouchableOpacity>

        </View>
    );
}