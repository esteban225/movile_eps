import { TouchableOpacity } from "react-native";

export default function BotonInicioComponent({ navigation }) {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: "green",
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
                marginVertical: 16,
            }}
            onPress={() => navigation.navigate("/")}
        >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
                Ir a Listar Actividad
            </Text>
        </TouchableOpacity>
    );
}