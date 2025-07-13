import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

// Importing icons from @expo/vector-icons - using different sets for variety
import { Ionicons, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Destructuring Dimensions for cleaner access
const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width / 2) - 30; // Consistent item width

export default function Inicio() {
  const navigation = useNavigation();

  // Memoize the navigation function
  const navigateToFlow = useCallback((flowName) => {
    navigation.navigate(flowName);
  }, [navigation]);

  // Array of menu items with updated icons and a professional color scheme
  const menuItems = [
    {
      name: 'Citas',
      iconComponent: Ionicons,
      iconName: 'calendar-outline', // Modern calendar icon
      colors: ['#6a11cb', '#2575fc'], // Deep purple to vibrant blue gradient
      route: 'Citas',
    },
    {
      name: 'Salud',
      iconComponent: MaterialCommunityIcons,
      iconName: 'shield-plus-outline', // Health shield icon
      colors: ['#00c6ff', '#0072ff'], // Bright blue to darker blue gradient
      route: 'Eps', // Assuming 'Eps' relates to health services
    },
    {
      name: 'Doctores',
      iconComponent: FontAwesome6,
      iconName: 'user-doctor', // Doctor icon
      colors: ['#fc00ff', '#00dbde'], // Pink to teal gradient
      route: 'Medicos',
    },
    {
      name: 'Usuarios',
      iconComponent: Ionicons,
      iconName: 'people-outline', // People icon
      colors: ['#ffafbd', '#ffc3a0'], // Soft pink to peach gradient
      route: 'Usuarios',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Bienvenido a **MedApp**</Text>
          <Text style={styles.headerSubtitle}>Tu portal integral de servicios de salud.</Text>
        </View>

        {/* Grid of Icons */}
        <View style={styles.gridContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.iconContainer}
              onPress={() => navigateToFlow(item.route)}
              activeOpacity={0.8} // Give some visual feedback on press
            >
              <LinearGradient
                colors={item.colors}
                style={styles.gradientBackground}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <item.iconComponent
                  name={item.iconName}
                  size={48} // Slightly adjusted size for visual balance
                  color="#fff" // White icons on gradient background
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

// Modernized and organized stylesheets
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light grey background for a clean look
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 40, // Increased vertical padding
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 70, // More space below the header
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 38, // Larger and bolder title
    fontWeight: '900',
    color: '#2c3e50', // Dark text
    marginBottom: 10,
    fontFamily: 'System' // Or a custom modern font if you have one
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#7f8c8d', // Softer grey for subtitle
    textAlign: 'center',
    lineHeight: 24, // Improved readability
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20, // Increased gap between items
    paddingHorizontal: 5,
  },
  iconContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH + 20, // Maintain card aspect ratio
    alignItems: 'center',
    justifyContent: 'flex-start', // Align content to the top within the card
    backgroundColor: '#ffffff',
    borderRadius: 18, // More rounded corners for a modern feel
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6, // More pronounced shadow for depth
    },
    shadowOpacity: 0.08, // Lighter shadow opacity
    shadowRadius: 10,
    elevation: 12, // Android shadow
    marginVertical: 10,
    overflow: 'hidden', // Ensure gradient stays within bounds
  },
  gradientBackground: {
    width: '100%',
    height: '70%', // Gradient takes up the top part of the card
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  iconLabel: {
    marginTop: 15,
    fontSize: 17,
    fontWeight: '700',
    color: '#34495e',
    textAlign: 'center',
    paddingHorizontal: 10, // Prevent text from hitting edges
  },
});