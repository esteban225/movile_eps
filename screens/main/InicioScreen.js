// src/Screen/Inicio/Inicio.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const itemWidth = (width / 2) - 30;

export default function Inicio() {
    const navigation = useNavigation();

    const navigateToFlow = (flowName) => {
        navigation.navigate(flowName);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#f0f2f5" />
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                {/* Encabezado */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Bienvenido a Eps</Text>
                </View>

                {/* Iconos con nombres */}
                <View style={styles.gridContainer}>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => navigateToFlow('Citas')}>
                        <Fontisto name="date" size={45} color="black" style={styles.iconShadow} />
                        <Text style={styles.iconLabel}>Citas</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.iconContainer} onPress={() => navigateToFlow('Eps')}>
                        <MaterialIcons name="health-and-safety" size={45} color="silver" style={styles.iconShadow} />
                        <Text style={styles.iconLabel}>Eps</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconContainer} onPress={() => navigateToFlow('Medicos')}>
                        <Fontisto name="doctor" size={45} color="skyblue" style={styles.iconShadow} />
                        <Text style={styles.iconLabel}>Medicos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconContainer} onPress={() => navigateToFlow('Usuarios')}>
                        <FontAwesome5 name="laptop-house" size={45} color="orange" style={styles.iconShadow} />
                        <Text style={styles.iconLabel}>Usuarios</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scrollContent: {
        alignItems: 'center', // Centra todo el contenido
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 190,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: '#333',
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 18,
        color: '#666',
    },
    statusText: {
        fontWeight: 'bold',
        color: '#28a745',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 20,
    },
    iconContainer: {
        width: itemWidth,
        alignItems: 'center',
        marginVertical: 15,
    },
    iconShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 2, height: 4 },
        textShadowRadius: 6,
    },
    iconLabel: {
        marginTop: 15,
        fontSize: 16,
        fontWeight: '600',
        color: '#444',
        textAlign: 'center',
    },
});