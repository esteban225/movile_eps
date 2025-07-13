import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { eliminarUserEps } from '../../src/services/UsersEpsService';

const Colors = {
    background: '#F5F7FA',
    cardBackground: '#FFFFFF',
    primary: '#007AFF',
    success: '#34C759',
    danger: '#FF3B30',
    textPrimary: '#1C1C1E',
    textSecondary: '#6A6A6A',
    border: '#E0E0E0',
    shadow: 'rgba(0, 0, 0, 0.1)',
};

export default function DetalleUsersEps() {
    const route = useRoute();
    const navigation = useNavigation();
    const { userEps } = route.params;

    const handleEdit = () => {
        navigation.navigate("EditarUserEps", { userEps });
    };

    const handleDelete = () => {
        Alert.alert(
            'Confirmar Eliminación',
            `¿Eliminar a ${userEps.name}? Esta acción no se puede deshacer.`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const result = await eliminarUserEps(userEps.id);
                            if (result.success) {
                                Alert.alert('Éxito', 'Usuario eliminado correctamente.');
                                navigation.goBack();
                            } else {
                                Alert.alert('Error', result.message || 'No se pudo eliminar.');
                            }
                        } catch (err) {
                            console.error('Error al eliminar:', err);
                            Alert.alert('Error', 'Hubo un problema al eliminar el usuario.');
                        }
                    },
                },
            ]
        );
    };

    const statusText = userEps.status === 1 ? 'Activo' : 'Inactivo';
    const statusColor = userEps.status === 1 ? Colors.success : Colors.danger;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Ionicons name="medical-outline" size={60} color={Colors.primary} />
                <Text style={styles.title}>{userEps.name}</Text>
                <Text style={styles.subtitle}>Detalles del Usuario EPS</Text>
            </View>

            <View style={styles.infoCard}>
                <InfoItem label="Estado" value={statusText} icon="pulse-outline" color={statusColor} />
                <InfoItem label="Nombre" value={userEps.name} icon="person" />
                <InfoItem label="Rol" value={userEps.role} iconPack="AntDesign" icon="skin" />
                <InfoItem label="Email" value={userEps.email} icon="mail-outline" />
                <InfoItem label="Teléfono" value={userEps.phone} icon="call-outline" />
                <InfoItem
                    label="Tipo y Número de Documento"
                    value={`${userEps.identificationType} - ${userEps.identificationNumber}`}
                    icon="document-text-outline"
                />
                <InfoItem label="Dirección" value={userEps.address} icon="location-outline" />
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

function InfoItem({ label, value, icon, iconPack = "Ionicons", color, }) {
    const Icon = iconPack === "AntDesign" ? AntDesign : Ionicons;

    return (
        <>
            <View style={styles.infoItem}>
                <Icon name={icon} size={20} color={Colors.textSecondary} style={styles.itemIcon} />
                <View style={{ flexShrink: 1 }}>
                    <Text style={styles.label}>{label}:</Text>
                    <Text style={[styles.value, color && { color }]}>{value || 'No especificado'}</Text>
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
        fontSize: 28,
        fontWeight: '800',
        color: Colors.textPrimary,
        textAlign: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center',
        fontWeight: '500',
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
