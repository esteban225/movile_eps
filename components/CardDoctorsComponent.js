import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function CardDoctors({doctor, onEdit, onDelete} ) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.name}>Nombre: {doctor.name}</Text>
                <Text style={styles.detail}>Tipo de identificación: {doctor.identificationType}</Text>
                <Text style={styles.detail}>Número de identificación: {doctor.identificationNumber}</Text>
                <Text style={styles.detail}>Número de licencia: {doctor.license_number}</Text>
                <Text style={styles.detail}>Especialidad: {doctor.specialty}</Text>
                <Text style={styles.detail}>Dirección: {doctor.address}</Text>
                <Text style={styles.detail}>Teléfono: {doctor.phone}</Text>
                <Text style={styles.detail}>Email: {doctor.email}</Text>
                <Text style={styles.detail}>Estado: {doctor.status}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                    <Ionicons name="create-outline" size={24} color="#1976D2" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                    <Ionicons name="trash-outline" size={24} color="#D32F2F" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    detail: {
        fontSize: 14,
        color: '#555',
    },
    actions: {
        flexDirection: 'row',
    },
    iconBtn: {
        marginLeft: 10,
    },
});
