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

import CardHealthCenters from '../../components/CardHealthCentersComponent';
import {
  eliminarHealthCenters,
  listarHealthCenters,
} from '../../src/services/HealthCentersService';
import getColors from '../../components/ColorsStylesComponent'; // Ensure this path is correct
const Colors = getColors();

export default function ListarHealthCenters() {
  const [healthCenters, setHealthCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const fetchHealthCenters = useCallback(async () => {
    setLoading(true);
    try {
      const result = await listarHealthCenters();
      if (result.success) {
        setHealthCenters(result.data);
      } else {
        Alert.alert(
          'Error al Cargar',
          result.message || 'No se pudieron cargar los centros de salud. Por favor, intenta de nuevo.'
        );
      }
    } catch (error) {
      console.error('Error fetching health centers:', error);
      Alert.alert(
        'Error de Conexión',
        'Hubo un problema de red al cargar los centros de salud. Verifica tu conexión.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchHealthCenters();
      StatusBar.setBarStyle('dark-content');
      return () => StatusBar.setBarStyle('default');
    }, [fetchHealthCenters])
  );

  const filteredHealthCenters = useMemo(() => {
    if (!searchText) {
      return healthCenters;
    }
    const lowercasedSearchText = searchText.toLowerCase();
    return healthCenters.filter(center =>
      center.name.toLowerCase().includes(lowercasedSearchText)
    );
  }, [healthCenters, searchText]);

  const handleDelete = useCallback((id) => {
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que deseas eliminar este centro de salud? Esta acción es irreversible.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const result = await eliminarHealthCenters(id);
              if (result.success) {
                Alert.alert('Éxito', 'Centro de salud eliminado correctamente.');
                fetchHealthCenters();
              } else {
                Alert.alert(
                  'Error al Eliminar',
                  result.message || 'No se pudo eliminar el centro de salud.'
                );
              }
            } catch (error) {
              console.error('Error deleting health center:', error);
              Alert.alert(
                'Error',
                'Hubo un problema al eliminar el centro de salud. Por favor, inténtalo de nuevo.'
              );
            }
          },
        },
      ]
    );
  }, [fetchHealthCenters]);

  const handleCreate = useCallback(() => {
    navigation.navigate("EditarHealthCenter");
  }, [navigation]);

  const handleEdit = useCallback(
    (healthCenter) => {
      navigation.navigate('EditarHealthCenter', { healthCenter });
    },
    [navigation]
  );

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Cargando centros de salud...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* Componente de buscador */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.textPlaceholder} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar centro de salud..."
          placeholderTextColor={Colors.textPlaceholder}
          value={searchText}
          onChangeText={setSearchText}
          clearButtonMode="while-editing"
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearSearchButton}>
            <Ionicons name="close-circle" size={20} color={Colors.textPlaceholder} />
          </TouchableOpacity>
        )}
      </View>

      {/* FlatList para la lista de centros de salud */}
      <FlatList
        data={filteredHealthCenters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardHealthCenters
            healthCenter={item}
            onDetail={() => navigation.navigate('DetalleHealthCenter', { healthCenter: item })}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.id)}
            cardStyle={styles.healthCenterCard}
            textStyle={styles.healthCenterCardText}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyListContainer}>
            <Ionicons name="clipboard-outline" size={70} color={Colors.textPlaceholder} />
            <Text style={styles.emptyText}>
              {searchText ? 'No se encontraron resultados para tu búsqueda.' : '¡Ups! Parece que no hay centros de salud registrados.'}
            </Text>
            {!searchText && (
              <Text style={styles.emptySubtitle}>
                Sé el primero en añadir uno tocando el botón de abajo.
              </Text>
            )}
          </View>
        }
        // Añadimos paddingHorizontal al contentContainerStyle de FlatList
        // para que los ítems tengan margen interno
        contentContainerStyle={[
          styles.flatListContent,
          filteredHealthCenters.length === 0 && styles.emptyListContent
        ]}
      />

      {/* Botón flotante de acción para agregar un nuevo centro */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreate}
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
  // Estilos para el encabezado de la pantalla
  header: {
    backgroundColor: Colors.headerBackground,
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: StatusBar.currentHeight + 10 || 40, // Asegura espacio debajo de la barra de estado
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center', // Centrar el título
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  // Estilos para el buscador
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginHorizontal: 16,
    marginTop: 20, // Más espacio desde el encabezado
    marginBottom: 15,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 3 }, // Sombra ligeramente más pronunciada
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
    height: 50, // Altura del input ligeramente aumentada
    fontSize: 17, // Texto un poco más grande
    color: Colors.textPrimary,
  },
  clearSearchButton: {
    marginLeft: 10,
    padding: 5,
  },
  // Estilos para cuando la lista está vacía
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
  // Estilo para el contentContainerStyle de FlatList cuando no está vacía
  flatListContent: {
    paddingHorizontal: 16, // Aplicamos padding horizontal aquí para las tarjetas
    paddingBottom: 100, // Espacio para que el FAB no cubra el último item
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Estilos para cada tarjeta de centro de salud (manteniendo la coherencia)
  healthCenterCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 18,
    marginBottom: 12, // Espacio entre tarjetas, ya no necesita marginHorizontal si lo tiene el FlatList
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  healthCenterCardText: {
    color: Colors.textPrimary,
    fontSize: 17,
    fontWeight: '500',
  },
  // Estilos para el botón flotante de acción (FAB)
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