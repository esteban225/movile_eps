import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener @expo/vector-icons instalado

// Paleta de colores consistente (similar a ListarHealthCenters)
const Colors = {
    cardBackground: '#FFFFFF',
    textPrimary: '#212121', // Gris oscuro para el nombre
    textSecondary: '#757575', // Gris medio para el ID
    danger: '#DC3545', // Rojo para eliminar
    primary: '#4CAF50', // Verde para el icono de información y otros elementos primarios
    accent: '#FFC107', // Amarillo para edición o advertencias (similar a #efaf0cff)
    shadow: 'rgba(0,0,0,0.1)', // Sombra sutil
};

export default function CardUserEps({ userEps, onDetail, cardStyle, textStyle }) {
    // Si necesitas un estado para el usuario EPS (ej. activo/inactivo), podrías añadirlo aquí,
    // pero basado en el ejemplo de HealthCenters, no parece que UserEps tenga un 'status' directo.
    // Solo mostramos nombre e ID.

    return (
        <TouchableOpacity style={styles.card} onPress={onDetail} activeOpacity={0.85}>
            <View style={styles.content}>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{userEps.name}</Text>
                    {/* Concatenamos ID y número de identificación en una sola línea */}
                    <Text style={styles.identification}>ID: {userEps.identificationNumber}</Text>
                </View>

                {/* Acciones de Edición y Eliminación como iconos */}
                <View style={styles.actions}>
                <Ionicons name="information-circle-outline" size={26} color="#efaf0cff" /> 
        
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.cardBackground, // Fondo blanco limpio
        borderRadius: 12, // Bordes un poco más redondeados
        padding: 20,
        marginVertical: 8,
        // Eliminamos marginHorizontal aquí porque ListarUserEps ya lo aplica al FlatList contentContainer
        // shadowColor y elevación para una sombra moderna y sutil
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 5,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1, // Para que el texto ocupe el espacio restante
        marginRight: 10, // Espacio entre el texto y los iconos de acción
    },
    name: {
        fontSize: 19, // Un poco más grande para el nombre
        fontWeight: '700', // Más negrita
        color: Colors.textPrimary, // Color de texto oscuro
        marginBottom: 4, // Espacio entre nombre y ID
    },
    identification: {
        fontSize: 14, // Tamaño de fuente para el ID
        color: Colors.textSecondary, // Color de texto secundario
        fontWeight: '500', // Un poco de negrita para el ID
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        padding: 8, // Aumenta el área táctil de los iconos
        marginLeft: 8, // Espacio entre los iconos de acción
    },
});