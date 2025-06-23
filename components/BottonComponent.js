import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CustomButton({ title, onPress, style }) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "green",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 16,
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    }
});
