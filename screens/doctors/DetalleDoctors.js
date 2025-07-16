import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { eliminarDoctor } from '../../src/services/DoctorsService'; // Asegúrate de que esta ruta sea correcta

import getColors from '../../components/ColorsStylesComponent'; // Ensure this path is correct
const Colors = getColors();

export default function DetalleDoctor() {
    const route = useRoute();
    const navigation = useNavigation();
    // doctors contiene todos los datos que pasas desde la pantalla anterior
    const { doctors } = route.params;

    // Función para manejar la navegación a la pantalla de edición
    const handleEdit = () => {
        navigation.navigate("EditarDoctor", { doctors });
    };

    // Función para manejar la eliminación con confirmación
    const handleDelete = () => {
        Alert.alert(
            'Confirmar Eliminación',
            `¿Estás seguro de que deseas eliminar a ${doctors.name}? Esta acción es irreversible.`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const result = await eliminarDoctor(doctors.id);
                            if (result.success) {
                                Alert.alert('Éxito', 'Centro de salud eliminado correctamente.');
                                navigation.goBack(); // Volver a la lista después de eliminar
                            } else {
                                Alert.alert('Error', result.message || 'No se pudo eliminar el centro de salud.');
                            }
                        } catch (err) {
                            console.error('Error al eliminar:', err);
                            Alert.alert('Error', 'Hubo un problema al eliminar el centro. Por favor, inténtalo de nuevo.');
                        }
                    },
                },
            ]
        );
    };

    // Determinamos el texto y color del estado basado en el valor de doctors.status
    const statusText = doctors.status === 1 ? 'Activo' : 'Inactivo';
    const statusColor = doctors.status === 1 ? Colors.success : Colors.danger;

    return (
        // Usamos ScrollView para permitir el desplazamiento si el contenido es largo
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                {/* Icono representativo para el encabezado */}
                <Ionicons name="medical-outline" size={60} color={Colors.primary} style={styles.headerIcon} />
                {/* Título principal con el nombre del centro */}
                <Text style={styles.title}>{doctors.name}</Text>
                {/* Subtítulo descriptivo */}
                <Text style={styles.subtitle}>Detalles del Centro de Salud</Text>
            </View>

            {/* Tarjeta con la información detallada */}
            <View style={styles.infoCard}>
                {/* Item de Estado */}
                <View style={styles.infoItem}>
                    <Ionicons name="pulse-outline" size={20} color={Colors.textSecondary} style={styles.itemIcon} />
                    <View>
                        <Text style={styles.label}>Estado:</Text>
                        <Text style={[styles.value, { color: statusColor, fontWeight: '600' }]}>{statusText}</Text>
                    </View>
                </View>
                <View style={styles.separator} />

                {/* Item de Nombre */}
                <View style={styles.infoItem}>
                    <Ionicons name="person" size={20} color={Colors.textSecondary} style={styles.itemIcon} />
                    <View>
                        <Text style={styles.label}>Nombre:</Text>
                        <Text style={styles.value}>{doctors.name || 'No especificado'}</Text>
                    </View>
                </View>
                <View style={styles.separator} />
                
                {/* Item de Especialidad */}
                <View style={styles.infoItem}>
                    <AntDesign name="skin" size={20} color={Colors.textSecondary} style={styles.itemIcon} />
                    <View>
                        <Text style={styles.label}>Especialidad:</Text>
                        <Text style={styles.value}>{doctors.specialty || 'No especificado'}</Text>
                    </View>
                </View>
                <View style={styles.separator} />

                {/* Item de Email */}
                <View style={styles.infoItem}>
                    <Ionicons name="mail-outline" size={20} color={Colors.textSecondary} style={styles.itemIcon} />
                    <View>
                        <Text style={styles.label}>Email:</Text>
                        <Text style={styles.value}>{doctors.email || 'No especificado'}</Text>
                    </View>
                </View>
                <View style={styles.separator} />

                {/* Item de Teléfono */}
                <View style={styles.infoItem}>
                    <Ionicons name="call-outline" size={20} color={Colors.textSecondary} style={styles.itemIcon} />
                    <View>
                        <Text style={styles.label}>Teléfono:</Text>
                        <Text style={styles.value}>{doctors.phone || 'No especificado'}</Text>
                    </View>
                </View>
                <View style={styles.separator} />

                {/* Item de Tipo de Documento e Identificación */}
                <View style={styles.infoItem}>
                    <Ionicons name="document-text-outline" size={20} color={Colors.textSecondary} style={styles.itemIcon} />
                    <View>
                        <Text style={styles.label}>Tipo y Número de documento:</Text>
                        <Text style={styles.value}>{doctors.identificationType || 'No especificado'} - {doctors.identificationNumber || 'No especificado'}</Text>
                    </View>
                </View>
                <View style={styles.separator} />

                {/* Item de Dirección */}
                <View style={styles.infoItem}>
                    <Ionicons name="location-outline" size={20} color={Colors.textSecondary} style={styles.itemIcon} />
                    <View style={{ flexShrink: 1 }}> {/* Para que el texto largo se ajuste */}
                        <Text style={styles.label}>Dirección:</Text>
                        <Text style={styles.value}>{doctors.address || 'No especificado'}</Text>
                    </View>
                </View>
            </View>

            {/* Fila de botones de acción (Editar y Eliminar) */}
            <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={handleEdit} activeOpacity={0.8}>
                    <Ionicons name="pencil-outline" size={22} color={Colors.cardBackground} />
                    <Text style={styles.actionButtonText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={handleDelete} activeOpacity={0.8}>
                    <Ionicons name="trash-outline" size={22} color={Colors.cardBackground} />
                    <Text style={styles.actionButtonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    contentContainer: {
        padding: 20,
        paddingBottom: 40, // Espacio adicional al final para el ScrollView
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
        paddingTop: 10, // Espacio superior para el encabezado
    },
    headerIcon: {
        marginBottom: 10,
    },
    title: {
        fontSize: 28, // Tamaño de fuente más grande para el título principal
        fontWeight: '800', // Más negrita
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
        borderRadius: 15, // Bordes más redondeados
        paddingHorizontal: 20,
        paddingVertical: 10, // Padding vertical un poco menor para los ítems
        marginBottom: 30,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 5 }, // Sombra más pronunciada para profundidad
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 8, // Elevación para Android
        borderWidth: 1, // Borde sutil
        borderColor: Colors.border,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15, // Más padding vertical por cada item
    },
    itemIcon: {
        marginRight: 15,
        width: 25, // Ancho fijo para alinear iconos
        textAlign: 'center',
    },
    label: {
        fontSize: 13, // Un poco más pequeño para la etiqueta
        color: Colors.textSecondary,
        fontWeight: '600', // Semibold para las etiquetas
        marginBottom: 2,
    },
    value: {
        fontSize: 17, // Tamaño de fuente ligeramente más grande para el valor
        color: Colors.textPrimary,
        fontWeight: '500', // Medium
    },
    separator: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: 0, // Ajuste para que el separador esté justo entre los items
        marginLeft: 40, // Alineado con el inicio del texto
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15, // Espacio entre los botones
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15, // Más padding vertical para botones más grandes
        borderRadius: 10, // Bordes redondeados
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    editButton: {
        backgroundColor: Colors.primary, // Usamos el azul principal para editar
    },
    deleteButton: {
        backgroundColor: Colors.danger, // Usamos el rojo para eliminar
    },
    actionButtonText: {
        color: Colors.cardBackground, // Texto blanco sobre los botones de color
        fontSize: 17,
        fontWeight: '700', // Negrita
        marginLeft: 10, // Espacio entre el icono y el texto
    },
});