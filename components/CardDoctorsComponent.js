import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CardDoctor({ doctors, onDetail, cardStyle, textStyle }) {
  const statusText = doctors.status === 1 ? 'Activo' : 'Inactivo';
  const statusColor = doctors.status === 1 ? '#28a745' : '#dc3545'; // Colores más suaves para activo/inactivo

  return (
    <TouchableOpacity style={[styles.card, cardStyle]} onPress={onDetail} activeOpacity={0.85}>
      <View style={styles.content}>
        {/* Icono a la izquierda del nombre del centro de salud */}
        <View style={styles.textContainer}>
          <Text style={[styles.name, textStyle]}> 👨‍🔬 {doctors.name}</Text>
          <Text style={[styles.status, { color: statusColor }]}>
           📊 {statusText}
          </Text>
        </View>
        {/* Nuevo icono para detalle */}
        <Ionicons name="information-circle-outline" size={26} color="#efaf0cff" /> 
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff', // Fondo blanco limpio
    borderRadius: 12, // Bordes un poco más redondeados
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16, // Añadir margen horizontal para que no ocupe todo el ancho
    // Sombras más modernas y sutiles
    shadowColor: '#000',
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
  healthIcon: {
    marginRight: 15, // Espacio entre el icono del hospital y el texto
  },
  textContainer: {
    flex: 1, // Para que el texto ocupe el espacio restante
  },
  name: {
    fontSize: 19, // Un poco más grande
    fontWeight: '700', // Más negrita
    color: '#343a40', // Color de texto oscuro
    marginBottom: 4, // Espacio entre nombre y estado
  },
  status: {
    fontSize: 14, // Un poco más pequeño
    fontWeight: '600', // Un poco más de negrita para el estado
  },
});