import { Text, View } from "react-native";

export default function SettingsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings Screen</Text>
            <Text style={styles.description}>This is the settings screen where you can adjust your preferences.</Text>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    iconBtn: {
        marginLeft: 10,
    },
}