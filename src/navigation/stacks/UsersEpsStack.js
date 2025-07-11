import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarUsersEps from "../../../screens/usersEps/ListarUsersEps";
import DetalleUsersEps from "../../../screens/usersEps/DetalleUsersEps";
import EditarUsersEps from "../../../screens/usersEps/EditarUsersEps";
import AgregarUserEps from "../../../screens/usersEps/AgregarUserEps";


const Stack = createStackNavigator();

export default function UserEpsStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "ListarUserEps"
                component={ListarUsersEps}
                options={{ title: "citas" }}
            />
             <Stack.Screen 
                name= "DetalleUserEps"
                component={DetalleUsersEps}
                options={{ title: "Detalle Cita" }}
            />
             <Stack.Screen 
                name= "EditarUserEps"
                component={EditarUsersEps}
                options={{ title: "Nuevo/Editar UserEps" }}
            />
            <Stack.Screen
                name= "CrearUserEps" // Nuevo nombre de ruta para la pantalla de creación
                component={AgregarUserEps} // Asigna el nuevo componente
                options={{ title: "Nueva Especialidad" }}
            />
            
        </Stack.Navigator>
    );
}