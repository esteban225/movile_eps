import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../../../screens/main/SettingsScreen"; 

const Stack = createStackNavigator();

export default function SettingsStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ConfiguracionPantalla" 
                component={SettingsScreen} 
                options={{
                    title: "Configuraciones",
                    headerStyle: { // <-- Agregado para el color de encabezado
                        backgroundColor: '#6A5ACD', // Un color púrpura/lavanda para Configuración
                    },
                    headerTintColor: '#fff', // Color del texto del título y el icono de retroceso
                    headerTitleStyle: {
                        fontWeight: 'bold', // Título en negrita
                    },
                }}
            />
        </Stack.Navigator>
    );
}