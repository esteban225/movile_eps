import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../../../screens/main/ProfileScreen";

const Stack = createStackNavigator();

export default function PerfilesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "Perfil" 
                component={ProfileScreen}
                options={{ title: "Perfiles" }}
            />
        </Stack.Navigator>
    );
}