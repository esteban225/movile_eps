import { useEffect } from "react";
import AppNavigation from "./src/navigation/AppNavigation";
import * as Notification from 'expo-notifications';
import { Button, View } from "react-native";

export default function App() {

  useEffect(() => {
    Notification.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    const getPremissions = async () => {
      const { status } = await Notification.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notification.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          alert('No se han concedido permisos para mostrar notificaciones');
        }
      }
    }
    getPremissions();
  }, []);

  const enviarNotificacionLocal = async () => {
    await Notification.scheduleNotificationAsync({
      content: {
        title: "Notificación Local",
        body: "Esta es una notificación local de prueba.",
      },
      trigger: { seconds: 2 }, // La notificación se enviará después de 2 segundos
    });
  }

  return (
    <View style={{ flex: 1}}>
      <AppNavigation />
      <Button title="Enviar Notificación Local" onPress={enviarNotificacionLocal} />
    </View>
  );
}

