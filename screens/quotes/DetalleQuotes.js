import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { listarUserEps, listarUsersEps } from '../../src/services/UsersEpsService';
import { listarDoctors } from '../../src/services/DoctorsService'; // Nuevo
import { eliminarQuote } from '../../src/services/QuotesService';

import getColors from '../../components/ColorsStylesComponent'; // Ensure this path is correct
const Colors = getColors();

export default function DetalleQuotes() {
    const route = useRoute();
    const navigation = useNavigation();
    const { quotes } = route.params;

    const [doctorName, setDoctorName] = useState("Cargando...");
    const [userEpsName, setUserEpsName] = useState("Cargando...");

    useEffect(() => {
        const fetchNames = async () => {
            try {
                // Obtener doctores
                const doctorResponse = await listarDoctors();
                if (doctorResponse.success && Array.isArray(doctorResponse.data)) {
                    const doctor = doctorResponse.data.find(d => d.id === quotes.doctors_id);
                    setDoctorName(doctor ? doctor.name : "No encontrado");
                }

                // Obtener usuarios EPS
                const userResponse = await listarUserEps();
                if (userResponse.success && Array.isArray(userResponse.data)) {
                    const user = userResponse.data.find(u => u.id === quotes.userseps_id);
                    setUserEpsName(user ? user.name : "No encontrado");
                }
            } catch (error) {
                console.error("Error al obtener nombres:", error);
                setDoctorName("Error");
                setUserEpsName("Error");
            }
        };

        fetchNames();
    }, []);

    const handleEdit = () => {
        navigation.navigate("EditarQuotes", { quotes });
    };

    const handleDelete = () => {
        Alert.alert(
            'Confirmar Eliminación',
            '¿Estás seguro de que deseas eliminar esta cita? Esta acción es irreversible.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const result = await eliminarQuote(quotes.id);
                            if (result.success) {
                                Alert.alert('Éxito', 'Cita eliminada correctamente.');
                                navigation.goBack();
                            } else {
                                Alert.alert('Error', result.message || 'No se pudo eliminar la cita.');
                            }
                        } catch (err) {
                            console.error('Error al eliminar:', err);
                            Alert.alert('Error', 'Ocurrió un problema al eliminar la cita.');
                        }
                    },
                },
            ]
        );
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Ionicons name="calendar-outline" size={60} color={Colors.primary} />
                <Text style={styles.title}>Detalles de la Cita</Text>
                <Text style={styles.subtitle}>Información detallada de la cita médica</Text>
            </View>

            <View style={styles.infoCard}>
                <InfoItem label="Tipo" value={quotes.type} icon="medkit-outline" />
                <InfoItem label="Fecha" value={quotes.date} icon="calendar" />
                <InfoItem label="Estado" value={quotes.status} icon="alert-circle-outline" />
                <InfoItem label="Motivo" value={quotes.reason} icon="chatbox-ellipses-outline" />
                <InfoItem label="Observaciones" value={quotes.observations} icon="document-text-outline" />
                <InfoItem label="Doctor" value={doctorName} icon="person-outline" />
                <InfoItem label="Usuario EPS" value={userEpsName} icon="people-outline" />
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={handleEdit}>
                    <Ionicons name="pencil-outline" size={22} color={Colors.cardBackground} />
                    <Text style={styles.actionButtonText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={handleDelete}>
                    <Ionicons name="trash-outline" size={22} color={Colors.cardBackground} />
                    <Text style={styles.actionButtonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

function InfoItem({ label, value, icon }) {
    return (
        <>
            <View style={styles.infoItem}>
                <Ionicons name={icon} size={20} color={Colors.textSecondary} style={styles.itemIcon} />
                <View style={{ flexShrink: 1 }}>
                    <Text style={styles.label}>{label}:</Text>
                    <Text style={styles.value}>{value || 'No especificado'}</Text>
                </View>
            </View>
            <View style={styles.separator} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    contentContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
        paddingTop: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        color: Colors.textPrimary,
        textAlign: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        fontWeight: '500',
        textAlign: 'center',
    },
    infoCard: {
        backgroundColor: Colors.cardBackground,
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 30,
        borderColor: Colors.border,
        borderWidth: 1,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 8,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    itemIcon: {
        marginRight: 15,
        width: 25,
        textAlign: 'center',
    },
    label: {
        fontSize: 13,
        color: Colors.textSecondary,
        fontWeight: '600',
        marginBottom: 2,
    },
    value: {
        fontSize: 17,
        color: Colors.textPrimary,
        fontWeight: '500',
    },
    separator: {
        height: 1,
        backgroundColor: Colors.border,
        marginLeft: 40,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 10,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    editButton: {
        backgroundColor: Colors.primary,
    },
    deleteButton: {
        backgroundColor: Colors.danger,
    },
    actionButtonText: {
        color: Colors.cardBackground,
        fontSize: 17,
        fontWeight: '700',
        marginLeft: 10,
    },
});
