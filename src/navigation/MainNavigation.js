import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather } from "@expo/vector-icons";

import InicioStack from "./stacks/MainStack";
import PerfilesStack from "./stacks/ProfileStack";
import ConfiguracionesStack from "./stacks/SettingsStack";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function MainNavigation() {
    return (
        <Tab.Navigator
            screenOptions={{
                // Estilo para la barra de pestañas en general
                tabBarStyle: {
                    backgroundColor: '#F8F8F8', // Un blanco más suave para el fondo de la barra
                    borderTopWidth: 0, // Elimina el borde superior predeterminado
                    height: 65, // Un poco más de altura para un look moderno
                    paddingBottom: 8, // Más padding en la parte inferior para iconos/texto
                    paddingTop: 8, // Más padding en la parte superior
                    // Añadiendo sombra para un efecto flotante
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 5, // Sombra más visible para elevar la barra
                    },
                    shadowOpacity: 0.08,
                    shadowRadius: 6,
                    elevation: 10, // Elevación para Android
                },
                // Colores de los iconos y texto de la pestaña
                tabBarActiveTintColor: "#007B8C", // Un azul teal más profesional para la pestaña activa
                tabBarInactiveTintColor: "#7F8C8D", // Un gris más suave para la pestaña inactiva
                tabBarLabelStyle: {
                    fontSize: 11, // Tamaño de fuente ligeramente ajustado
                    fontWeight: '700', // Más peso para el texto, casi negrita
                    marginTop: 4, // Más margen entre icono y texto
                },
            }}
        >
            <Tab.Screen
                name="Inicio"
                component={InicioStack}
                options={{
                    headerShown: false, // Oculta el encabezado del TabNavigator para que el Stack interno lo maneje
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="home" size={size + 2} color={color} /> // Icono de casa, tamaño un poco mayor, color dinámico
                    ),
                    tabBarLabel: 'Inicio', // Asegura que el texto de la pestaña sea 'Inicio'
                }}
            />

            <Tab.Screen
                name="Perfil" // Nombre de la ruta (lo que usas para navegar si es necesario)
                component={PerfilesStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        // Icono más apropiado para Perfil, color dinámico
                        <Feather name="user" size={size + 2} color={color} />
                    ),
                    tabBarLabel: 'Perfil', // Asegura que el texto de la pestaña sea 'Perfil'
                }}
            />

            <Tab.Screen
                name="Configuración" // Nombre de la ruta
                component={ConfiguracionesStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        // Icono más apropiado para Configuración, color dinámico
                        <Ionicons name="settings-outline" size={size + 2} color={color} />
                    ),
                    tabBarLabel: 'Configuración', // Asegura que el texto de la pestaña sea 'Configuración'
                }}
            />
        </Tab.Navigator>
    );
}