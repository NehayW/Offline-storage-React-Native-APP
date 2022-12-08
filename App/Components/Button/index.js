import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import fonts from "../../Assets/fonts";

export const Button = ({ onPress, title, bgColor, textColor }) => {
    return (
        <TouchableOpacity onPress={onPress}
            style={[styles.button, { backgroundColor: bgColor, }]}>
            <Text style={[styles.text, { color: textColor }]}>{title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        padding: 18,
        width: '52%',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        alignSelf: 'center'
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: fonts.RobotoMedium
    }
})