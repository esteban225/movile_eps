import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarUsersEps from "../../../screens/usersEps/ListarUsersEps";
import DetalleUsersEps from "../../../screens/usersEps/DetalleUsersEps";
import EditarUsersEps from "../../../screens/usersEps/EditarUsersEps";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const Stack = createStackNavigator();

export default function UserEpsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ListarUserEps"
                component={ListarUsersEps}
                options={{
                    title: "Lista ", // Cambiar el título
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
                        <TouchableOpacity onPress={() => alert('Más información sobre usuarios')}>
                            <MaterialCommunityIcons name="information-outline" size={24} color="#fff" style={{ marginRight: 15 }} />
                        </TouchableOpacity>
                    ),
                    headerBackTitleVisible: false, // Ocultar el título de la pantalla anterior
                    animation: 'slide_from_bottom', // Cambiar la animación de entrada
                }}
            />
            <Stack.Screen
                name="DetalleUserEps"
                component={DetalleUsersEps}
                options={{
                    title: "Detalles", // Cambiar el título
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
                        <TouchableOpacity onPress={() => alert('Más información sobre usuarios')}>
                            <MaterialCommunityIcons name="information-outline" size={24} color="#fff" style={{ marginRight: 15 }} />
                        </TouchableOpacity>
                    ),
                    headerBackTitleVisible: false, // Ocultar el título de la pantalla anterior
                    animation: 'slide_from_bottom', // Cambiar la animación de entrada
                }}
            />
            <Stack.Screen
                name="EditarUserEps"
                component={EditarUsersEps}
                options={{
                    title: "Editar ", // Cambiar el título
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
                        <TouchableOpacity onPress={() => alert('Más información sobre usuarios')}>
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