import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Colors = {
    cardBackground: '#FFFFFF',
    textPrimary: '#212121',
    textSecondary: '#757575',
    danger: '#DC3545',
    primary: '#4CAF50',
    accent: '#FFC107',
    shadow: 'rgba(0,0,0,0.1)',
};

export default function CardQuotes({ quotes, onDetail, cardStyle, textStyle }) {
    return (
        <TouchableOpacity style={[styles.card, cardStyle]} onPress={onDetail} activeOpacity={0.85}>
            <View style={styles.content}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>🩺 {quotes.type}</Text>
                    <Text style={styles.subtitle}>📅 {quotes.date}</Text>
                    <Text style={styles.subtitle}>📌 Estado: {quotes.status}</Text>
                    <Text style={styles.subtitle}>📝 {quotes.reason}</Text>
                </View>
                <Ionicons name="information-circle-outline" size={26} color={Colors.accent} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.cardBackground,
        borderRadius: 12,
        padding: 20,
        marginVertical: 8,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 5,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.textPrimary,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: Colors.textSecondary,
        fontWeight: '500',
        marginBottom: 2,
    },
});
