import { createStackNavigator } from "@react-navigation/stack";
import DetalleHealthCenters from "../../../screens/healthCenters/DetalleHealthCenters";
import EditarHealthCenters from "../../../screens/healthCenters/EditarHealthCenters";
import ListarHealthCenters from "../../../screens/healthCenters/ListarHealthCenters";

const Stack = createStackNavigator();

export default function HealthCenterStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#4CAF50', // Un verde fresco para el fondo del encabezado
                    elevation: 5, // Sombra para Android
                    shadowOpacity: 0.3, // Sombra para iOS
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 4,
                },
                headerTintColor: '#fff', // Color del texto y los iconos del encabezado
                headerTitleStyle: {
                    fontWeight: 'bold', // Texto del título en negrita
                    fontSize: 20,
                },
                headerBackTitleVisible: false, // Oculta el título "Atrás" en iOS
                cardStyle: {
                    backgroundColor: '#f5f5f5', // Un fondo más suave para las pantallas
                },
            }}
        >
            <Stack.Screen
                name="ListarHealthCenter"
                component={ListarHealthCenters}
                options={{
                    title: "Centros de Salud", // Título más descriptivo
                }}
            />
            <Stack.Screen
                name="DetalleHealthCenter"
                component={DetalleHealthCenters}
                options={{ 
                    title: "Detalles del Centro",
                    headerBackTitleVisible: false, // Asegura que no aparezca "Atrás" si vienes de la lista
                }}
                
            />
            <Stack.Screen
                name="EditarHealthCenter"
                component={EditarHealthCenters}
                options={{ 
                    title: "Gestionar Centro de Salud", // Título más claro para editar/crear
                    presentation: 'modal', // Abre esta pantalla como un modal (opcional, para una sensación moderna de formulario)
                }}
            />
        </Stack.Navigator>
    );
}