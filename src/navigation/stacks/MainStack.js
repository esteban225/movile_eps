// src/stacks/InicioStack.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Importa la pantalla de Inicio (el "dashboard" con las 4 casillas)
import Inicio from "../../../screens/main/InicioScreen";
import QuotesStack from "./QuotesStack";
import HealthCentersStack from "./HealthCentersStack";
import DoctorsStack from "./DoctorsStack";
import UsersEpsStack from "./UsersEpsStack";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function MainStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="InicioPantalla"
                component={Inicio}
                options={{
                    title: "Inicio",
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
                        <TouchableOpacity onPress={() => alert('Más información sobre Inicio')}>
                            <MaterialCommunityIcons name="information-outline" size={24} color="#fff" style={{ marginRight: 15 }} />
                        </TouchableOpacity>
                    ),
                    headerBackTitleVisible: false, // Ocultar el título de la pantalla anterior
                    animation: 'slide_from_bottom', // Cambiar la animación de entrada
                }}
            />
            <Stack.Screen
                name="Citas"
                component={QuotesStack}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Usuarios"
                component={UsersEpsStack}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Eps"
                component={HealthCentersStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Medicos"
                component={DoctorsStack}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}