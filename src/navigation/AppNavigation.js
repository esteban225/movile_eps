import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./AuthNavigation";
import MainNavigation from "./MainNavigation"
import { useEffect, useRef, useState } from "react";


import { ActivityIndicator, AppState, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AppNavigation() {

    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const appState = useRef(AppState.currentState);

    const loadToken = async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");
            setUserToken(token);
        } catch (error) {
            console.error("Error al cargar el token:", error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        loadToken();
    }, []);

    useEffect(() => {
        const subscription = AppState.addEventListener("change", (nextAppState) => {
            if (appState.current.match(/inactive|background/) && nextAppState === "active") {
                console.log("App ha vuelto a estar activa, verificando token...");
                loadToken();
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const insterval = setInterval(() => {
                if (appState.current === "active") {
                    loadToken();
                }
            }, 2000); // Verifica cada 2 segundos
            return () => clearInterval(insterval);
        }
    }, [isLoading]);

    if (isLoading) {
        return (
            <View style={StyleSheet.loadingContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {userToken ? <MainNavigation /> : <AuthNavigation />}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
});