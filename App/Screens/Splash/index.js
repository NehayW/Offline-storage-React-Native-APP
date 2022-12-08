
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Splash = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            getAuth()
        }, 3000);
    }, [])

    const getAuth = async () => {
        const auth = await AsyncStorage.getItem('auth')
        const authorize = JSON.parse(auth);
        if (authorize === true) {
            navigation.navigate('Home')
        } else {
            navigation.navigate('SignIn');
        }
    }

    return (
        <View style={styles.bgImage}>
            <Text style={styles.text}>Your To-Dos</Text>
        </View>
    )
}