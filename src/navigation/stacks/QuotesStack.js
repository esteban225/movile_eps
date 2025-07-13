import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarQuotes from "../../../screens/quotes/ListarQuotes";
import DetalleQuotes from "../../../screens/quotes/DetalleQuotes";
import EditarQuotes from "../../../screens/quotes/EditarQuotes";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const Stack = createStackNavigator();

export default function QuotesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "ListarQuotes"
                component={ListarQuotes}
                options={{ title: "citas",
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
             <Stack.Screen 
                name= "DetalleQuotes"
                component={DetalleQuotes}
                options={{ title: "Detalle Cita",
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
             <Stack.Screen 
                name= "EditarQuotes"
                component={EditarQuotes}
                options={{ title: "Nuevo/Editar Citas",                     headerStyle: {
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