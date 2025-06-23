import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screen/auth/Login';
import RegisterScreen from '../../screen/auth/Registro';

const Stack = createNativeStackNavigator();

export default function AuthNavegacion() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Inicia Sesión' }}
      />
      <Stack.Screen
        name="Registro"
        component={RegisterScreen}
        options={{ title: 'Registro' }}
      />
    </Stack.Navigator>
  );
}
