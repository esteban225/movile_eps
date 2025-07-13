import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../../../screens/main/SettingsScreen";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function SettingsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ConfiguracionPantalla"
                component={SettingsScreen}
                options={{
                    title: "Ajustes de la App", // Cambiar el título
                    headerStyle: {
                        backgroundColor: '#54C392',
                        borderBottomWidth: 1, // Añadir un borde inferior
                        borderBottomColor: '#3a8769',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20, // Aumentar el tamaño de fuente del título
                    },
                    headerRight: () => ( // Añadir un botón de información a la derecha
                        <TouchableOpacity onPress={() => alert('Más información sobre ajustes')}>
                            <MaterialCommunityIcons name="information-outline" size={24} color="#fff" style={{ marginRight: 15 }} />
                        </TouchableOpacity>
                    ),
                    headerBackTitleVisible: false, // Ocultar el título de la pantalla anterior
                    animation: 'slide_from_bottom', // Cambiar la animación de entrada
                }}
            />
        </Stack.Navigator>
    );
}