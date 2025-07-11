// src/stacks/InicioStack.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Importa la pantalla de Inicio (el "dashboard" con las 4 casillas)
import Inicio from "../../../screens/main/InicioScreen";
import QuotesStack from "./QuotesStack";
import HealthCentersStack from "./HealthCentersStack";
import DoctorsStack from "./DoctorsStack";
import UsersEpsStack from "./UsersEpsStack";

const Stack = createStackNavigator();

export default function MainStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="InicioPantalla" 
                component={Inicio}
                options={{ headerShown: false }} 
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