import React from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import fonts from "../../Assets/fonts";

export const TextBox = ({ label, placeholder, source, keyboardType, borderBottomColor, value, onChangeText, secureTextEntry }) => {
    return (
        <View style={[styles.box, { borderBottomColor: borderBottomColor }]}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.container}>
                <Image source={source}
                    style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    box: {
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    label: {
        color: 'grey',
        fontSize: 16,
        marginVertical: 5,
        fontFamily: fonts.RobotoMedium
    },
    input: {
        marginLeft: 12,
        fontFamily: fonts.RobotoMedium,
        width: '80%'
    },
    icon: {
        width: 18,
        height: 18,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})