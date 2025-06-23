import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// Importa `useNavigation` SOLO si InicioStack NO ES una pantalla directa de un navegador
// Si InicioStack ES una pantalla directa, simplemente recibe 'navigation' como prop
// import { useNavigation } from '@react-navigation/native';


export default function MainStack({ navigation }) { // <--- Recibe 'navigation' como prop aquí
    // Si InicioStack NO es una pantalla directa del navegador (es decir, es un componente hijo de una pantalla),
    // entonces usarías el hook useNavigation así:
    // const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenidos al Club</Text>

            <View style={styles.buttonsGrid}>
                {/* Botón de Asociados con icono */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("ListarParticipante")} // <--- Usa 'navigation' aquí
                >
                    <MaterialCommunityIcons name="account-group" size={40} color="black" />
                    <Text style={styles.buttonText}>Asociados</Text>
                </TouchableOpacity>

                {/* Botón de Actividades con icono */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("ActividadesStack")} // <--- Usa 'navigation' aquí
                >
                    <MaterialCommunityIcons name="run" size={40} color="black" />
                    <Text style={styles.buttonText}>Actividades</Text>
                </TouchableOpacity>

                {/* Botón de Participaciones con icono */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("ListarParticipante")} // <--- Usa 'navigation' aquí
                >
                    <MaterialCommunityIcons name="chart-pie" size={40} color="black" />
                    <Text style={styles.buttonText}>Participaciones</Text>
                </TouchableOpacity>

                {/* Botón de Préstamos con icono */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("ListarParticipante")} // <--- Usa 'navigation' aquí
                >
                    <MaterialCommunityIcons name="cash-multiple" size={40} color="black" />
                    <Text style={styles.buttonText}>Préstamos</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 40,
        marginBottom: 30,
        color: "#333", // Cambiado de "#rfm" a un color hexadecimal válido.
        fontWeight: "bold",
        textAlign: 'center',
    },
    buttonsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
        width: '100%',
        maxWidth: 600,
    },
    button: {
        margin: 0,
        marginVertical: 10,
        marginHorizontal: 10,
        paddingVertical: 15,
        paddingHorizontal: 25,
        backgroundColor: "#fff",
        borderRadius: 8,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        flexGrow: 1,
        minWidth: 140,
        maxWidth: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#ccc",
        borderStyle: "solid",
        borderWidth: 10,
    },
    buttonText: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 8,
    },
});