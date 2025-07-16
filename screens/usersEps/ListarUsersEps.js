import React, { useState, useCallback, useMemo } from 'react';
import {
    View,
    Text,
    FlatList,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import CardUserEps from '../../components/CardUserEpsComponent'; // Path to your CardUserEpsComponent
import {
    listarUserEps,
    eliminarUserEps,
} from '../../src/services/UsersEpsService'; // Ensure this path is correct

import getColors from '../../components/ColorsStylesComponent'; // Ensure this path is correct
const Colors = getColors();

export default function ListarUserEps() {
    const [userEps, setUserEps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();

    const fetchUserEps = useCallback(async () => {
        setLoading(true);
        try {
            const result = await listarUserEps();
            if (result.success) {
                setUserEps(result.data);
            } else {
                Alert.alert('Error al Cargar', result.message || 'No se pudieron cargar los usuarios EPS.');
            }
        } catch (error) {
            console.error('Error fetching user EPS:', error);
            Alert.alert('Error de Conexión', 'No se pudo obtener la información. Verifica tu red.');
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchUserEps();
            // Sets the status bar text color to dark for a light header background
            StatusBar.setBarStyle('dark-content');
            // Resets status bar style when the screen loses focus
            return () => StatusBar.setBarStyle('default');
        }, [fetchUserEps])
    );

    const filteredUserEps = useMemo(() => {
        if (!searchText) return userEps;
        const lowercasedSearchText = searchText.toLowerCase();
        // Filter by name or document number
        return userEps.filter((user) =>
            user?.name?.toLowerCase().includes(lowercasedSearchText) ||
            user?.documentNumber?.toLowerCase().includes(lowercasedSearchText)
        );
    }, [searchText, userEps]);

    const handleEliminarUserEps = useCallback((id) => {
        Alert.alert(
            'Eliminar Usuario EPS',
            '¿Estás seguro de que deseas eliminar este usuario? Esta acción es irreversible.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const result = await eliminarUserEps(id);
                            if (result.success) {
                                Alert.alert('Éxito', 'Usuario EPS eliminado correctamente.');
                                fetchUserEps(); // Reload the list after deletion
                            } else {
                                Alert.alert('Error', result.message || 'No se pudo eliminar el usuario.');
                            }
                        } catch (error) {
                            console.error('Error deleting user EPS:', error);
                            Alert.alert('Error', 'Hubo un problema al intentar eliminar el usuario. Por favor, inténtalo de nuevo.');
                        }
                    },
                },
            ]
        );
    }, [fetchUserEps]);

    const handleEditarUserEps = (userEpsItem) => {
        // Navigates to the 'EditarUserEps' screen, passing the user EPS data
        navigation.navigate('EditarUserEps', { userEps: userEpsItem });
    };

    const handleCrearUserEps = useCallback(() => {
        // Navigates to the 'EditarUserEps' screen without data for creation
        navigation.navigate('EditarUserEps');
    }, [navigation]);

    const handleDetailUserEps = useCallback(
        (userEpsItem) => {
            // Navigates to a 'DetalleUserEps' screen to show more details
            // Make sure you have a 'DetalleUserEps' route configured in your navigator.
            navigation.navigate('DetalleUserEps', { userEps: userEpsItem });
        },
        [navigation]
    );

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={styles.loadingText}>Cargando usuarios EPS...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            {/* Search Bar Component */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color={Colors.textPlaceholder} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar usuario por nombre..."
                    placeholderTextColor={Colors.textPlaceholder}
                    value={searchText}
                    onChangeText={setSearchText}
                    clearButtonMode="while-editing" // Provides a clear button on iOS
                />
                {searchText.length > 0 && (
                    <TouchableOpacity
                        onPress={() => setSearchText('')}
                        accessibilityLabel="Limpiar búsqueda"
                        style={styles.clearSearchButton}
                    >
                        <Ionicons name="close-circle" size={20} color={Colors.textPlaceholder} />
                    </TouchableOpacity>
                )}
            </View>

            {/* FlatList for the list of User EPS */}
            <FlatList
                data={filteredUserEps}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CardUserEps
                        userEps={item}
                        onDetail={() => handleDetailUserEps(item)} // Handle detail action
                        onEdit={() => handleEditarUserEps(item)}
                        onDelete={() => handleEliminarUserEps(item.id)}
                        cardStyle={styles.userEpsCard} // Apply consistent card style
                        textStyle={styles.userEpsCardText} // Apply consistent text style
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyListContainer}>
                        <Ionicons name="people-circle-outline" size={70} color={Colors.textPlaceholder} />
                        <Text style={styles.emptyText}>
                            {searchText ? 'No hay coincidencias para tu búsqueda.' : '¡Ups! Parece que no hay usuarios EPS registrados.'}
                        </Text>
                        {!searchText && <Text style={styles.emptySubtitle}>Sé el primero en añadir uno tocando el botón de abajo.</Text>}
                    </View>
                }
                // Apply horizontal padding to the contentContainerStyle for card margins
                contentContainerStyle={[
                    styles.flatListContent,
                    filteredUserEps.length === 0 && styles.emptyListContent,
                ]}
            />

            {/* Floating Action Button to add new User EPS */}
            <TouchableOpacity
                style={styles.createButton}
                onPress={handleCrearUserEps}
                activeOpacity={0.8}
            >
                <Ionicons name="add" size={30} color={Colors.textLight} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
    loadingText: {
        marginTop: 15,
        fontSize: 16,
        color: Colors.textSecondary,
    },
    // Styles for the screen header (consistent with ListarHealthCenters)
    header: {
        backgroundColor: Colors.headerBackground,
        paddingHorizontal: 20,
        paddingVertical: 15,
        paddingTop: StatusBar.currentHeight + 10 || 40, // Ensure space below status bar
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
        alignItems: 'center', // Center the title
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    // Styles for the search bar (consistent with ListarHealthCenters)
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.cardBackground,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginHorizontal: 16,
        marginTop: 20, // More space from the header
        marginBottom: 15,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 3 }, // Slightly more pronounced shadow
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 4,
        borderWidth: 1,
        borderColor: Colors.inputBorder,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 50, // Slightly increased input height
        fontSize: 17, // Slightly larger text
        color: Colors.textPrimary,
    },
    clearSearchButton: {
        marginLeft: 10,
        padding: 5,
    },
    // Styles for when the list is empty (consistent with ListarHealthCenters)
    emptyListContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
        paddingHorizontal: 20,
    },
    emptyText: {
        fontSize: 20,
        color: Colors.textPrimary,
        textAlign: 'center',
        marginTop: 20,
        fontWeight: '600',
    },
    emptySubtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginTop: 8,
    },
    // Styles for FlatList contentContainer when not empty
    flatListContent: {
        paddingHorizontal: 16, // Apply horizontal padding here for the cards
        paddingBottom: 100, // Space so the FAB doesn't cover the last item
    },
    emptyListContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Styles for each User EPS card (consistent with healthCenterCard)
    userEpsCard: {
        backgroundColor: Colors.cardBackground,
        borderRadius: 12,
        padding: 18,
        marginBottom: 12, // Space between cards
        shadowColor: Colors.shadow,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 8,
    },
    userEpsCardText: {
        color: Colors.textPrimary,
        fontSize: 17,
        fontWeight: '500',
    },
    // Styles for the floating action button (FAB) (consistent with ListarHealthCenters)
    createButton: {
        backgroundColor: Colors.primaryDark,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        right: 30,
        shadowColor: Colors.primaryDark,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.4,
        shadowRadius: 15,
        elevation: 10,
    },
});