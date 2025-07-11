import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarDoctors from "../../../screens/doctors/ListarDoctors";
import DetalleDoctors from "../../../screens/doctors/DetalleDoctors";
import EditarDoctors from "../../../screens/doctors/EditarDoctors";
import AgregarDoctors from "../../../screens/doctors/AgregarDoctors";

const Stack = createStackNavigator();

export default function DoctorsStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "ListarDoctors"
                component={ListarDoctors}
                options={{ title: "Doctor" }}
            />
             <Stack.Screen 
                name= "DetalleDoctor"
                component={DetalleDoctors}
                options={{ title: "Detalle Doctor" }}
            />
             <Stack.Screen 
                name= "EditarDoctor"
                component={EditarDoctors}
                options={{ title: "Nuevo/Editar Doctor" }}
            />
            <Stack.Screen 
                name= "CrearDoctor"
                component={AgregarDoctors}
                options={{ title: "Nuevo Doctor" }}
            />
        </Stack.Navigator>
    );
}