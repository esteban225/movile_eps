import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/auth/Login';
import RegisterScreen from '../../screens/auth/Register';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1e1e2f', // tono oscuro moderno
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 22,
        },
        headerTitleAlign: 'center',
        animation: 'slide_from_right',
        gestureEnabled: true,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Eps',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => alert('¿Necesitas ayuda con tu cuenta?')}
              style={{ marginRight: 15 }}
            >
              <Ionicons name="help-circle-outline" size={28} color="#00bcd4" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Registro"
        component={RegisterScreen}
        options={{
          title: 'Crear cuenta',
        }}
      />
    </Stack.Navigator>
  );
}
