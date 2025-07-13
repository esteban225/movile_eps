import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarUsersEps from "../../../screens/usersEps/ListarUsersEps";
import DetalleUsersEps from "../../../screens/usersEps/DetalleUsersEps";
import EditarUsersEps from "../../../screens/usersEps/EditarUsersEps";


const Stack = createStackNavigator();

export default function UserEpsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ListarUserEps"
                component={ListarUsersEps}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DetalleUserEps"
                component={DetalleUsersEps}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditarUserEps"
                component={EditarUsersEps}
                options={{ headerShown: false }} 
            />


        </Stack.Navigator>
    );
}