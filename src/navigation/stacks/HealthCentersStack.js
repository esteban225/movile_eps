
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native";
import DetalleHealthCenters from "../../../screens/healthCenters/DetalleHealthCenters";
import EditarHealthCenters from "../../../screens/healthCenters/EditarHealthCenters";
import ListarHealthCenters from "../../../screens/healthCenters/ListarHealthCenters";

const Stack = createStackNavigator();

export default function EpsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ListarEps"
                component={ListarHealthCenters}
                options={{
                    title: "Eps",
                    // Verificacion PRUEBA
                    headerRight: () => (
                        <Button
                            onPress={() => alert("Boton en el header")}
                            title="Info"
                            color="red"
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="DetalleEps"
                component={DetalleHealthCenters}
                options={{ title: "Detalle Eps" }}
            />
            <Stack.Screen
                name="EditarEps"
                component={EditarHealthCenters}
                options={{ title: "Nuevo/Editar Eps" }}
            />
        </Stack.Navigator>
    );
}