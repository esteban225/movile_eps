import MainStack from "./stacks/MainStack";
import ProfileStack from "./stacks/ProfileStack";
import SettingsStack from "./stacks/SettingsStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from "react-native";
import ProfileScreen from "../../screen/main/ProfileScreen";




const Tab = createBottomTabNavigator();

export default function NavegacionPrincipal() {
    return (
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#f3340c", // color cuando está activo
            tabBarActiveTintColor: "757575", // color cuando esta inactivo
            tabBarActiveTintColor: {backgroundColor: "#fff"}, // Fondo de la barra
          }}
        >
            <Tab.Screen name="Inicio" component={MainStack} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" size={size} color={color} />
                ),
            }}/>

            <Tab.Screen name="Perfil" component={ProfileScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person-outline" size={size} color={color} />
                )
            }}/>

            <Tab.Screen name="Configuración" component={SettingsStack} options={{
                tabBarIcon: ({ color, size }) =>
                    <Ionicons name="settings-outline" size={size} color={color}  />
            }}/>

        </Tab.Navigator>
    );
}
