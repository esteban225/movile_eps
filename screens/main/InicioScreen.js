import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width / 2) - 30;

export default function Inicio() {
  const navigation = useNavigation();

  const navigateToFlow = useCallback((flowName) => {
    navigation.navigate(flowName);
  }, [navigation]);

  const menuItems = [
    {
      name: 'Citas',
      iconComponent: Ionicons,
      iconName: 'calendar-outline',
      colors: ['#6a11cb', '#2575fc'],
      route: 'Citas',
    },
    {
      name: 'Salud',
      iconComponent: MaterialCommunityIcons,
      iconName: 'shield-plus-outline',
      colors: ['#00c6ff', '#0072ff'],
      route: 'Eps',
    },
    {
      name: 'Doctores',
      iconComponent: FontAwesome6,
      iconName: 'user-doctor',
      colors: ['#fc466b', '#3f5efb'],
      route: 'Medicos',
    },
    {
      name: 'Usuarios',
      iconComponent: Ionicons,
      iconName: 'people-outline',
      colors: ['#ff9a9e', '#fad0c4'],
      route: 'Usuarios',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Platform.OS === 'android' ? '#f8f9fa' : 'transparent'}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Bienvenido a <Text style={{ color: '#007AFF' }}>MedApp</Text></Text>
          <Text style={styles.headerSubtitle}>
            Tu portal integral de servicios de salud.
          </Text>
        </View>

        <View style={styles.gridContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.iconContainer}
              onPress={() => navigateToFlow(item.route)}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={item.colors}
                style={styles.gradientBackground}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <item.iconComponent
                  name={item.iconName}
                  size={42}
                  color="#fff"
                />
              </LinearGradient>
              <Text style={styles.iconLabel}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 17,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 24,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  iconContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH + 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
    margin: 10,
  },
  gradientBackground: {
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  iconLabel: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
});
