import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarQuotes from "../../../screens/quotes/ListarQuotes";
import DetalleQuotes from "../../../screens/quotes/DetalleQuotes";
import EditarQuotes from "../../../screens/quotes/EditarQuotes";


const Stack = createStackNavigator();

export default function CitasStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "ListarCitas"
                component={ListarQuotes}
                options={{ title: "citas" }}
            />
             <Stack.Screen 
                name= "DetalleCitas"
                component={DetalleQuotes}
                options={{ title: "Detalle Cita" }}
            />
             <Stack.Screen 
                name= "EditarCitas"
                component={EditarQuotes}
                options={{ title: "Nuevo/Editar Citas" }}
            />
            {/* <Stack.Screen
                name= "CrearCita" // Nuevo nombre de ruta para la pantalla de creación
                component={AgregarQuote} // Asigna el nuevo componente
                options={{ title: "Nueva Especialidad" }}
            /> */}
            
        </Stack.Navigator>
    );
}