import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../../../screens/main/ProfileScreen";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EditarProfile from "../../../screens/profile/EditarProfile";

const Stack = createStackNavigator();

export default function PerfilesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Perfil"
                component={ProfileScreen}
                options={{
                    title: "Perfiles",
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
                        <TouchableOpacity onPress={() => alert('Más información sobre perfiles')}>
                            <MaterialCommunityIcons name="information-outline" size={24} color="#fff" style={{ marginRight: 15 }} />
                        </TouchableOpacity>
                    ),
                    headerBackTitleVisible: false, // Ocultar el título de la pantalla anterior
                    animation: 'slide_from_bottom', // Cambiar la animación de entrada
                }}

            />
            <Stack.Screen
                name="editarPerfil"
                component={EditarProfile}
                options={{
                    title: "Perfiles",
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
                        <TouchableOpacity onPress={() => alert('Más información sobre perfiles')}>
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