import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button } from "../../Components/Button";
import { TextBox } from "../../Components/TextBox";
import { db } from "../../Utils/Database";
import { styles } from "./styles";

export const SignUp = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('')

    useEffect(() => {
        createTable()
    }, [])

    const createTable = () => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, Email Text ,UserName TEXT, Password INT)'
            )
        })
    }

    const handleSignUp = async () => {
        if (email.length == 0 || username.length == 0 || password.length == 0) {
            alert('Please enter data')
        } else {
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO users (Email, UserName, Password) VALUES (?,?,?)', [email, username, password])
            })
            await AsyncStorage.setItem('auth', JSON.stringify(true))
            navigation.navigate('Home')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.heading}>New{'\n'}Account</Text >
            </View>
            <View style={styles.subContainer}>
                <TextBox
                    source={require('../../Assets/icon/mail.png')}
                    label={"Email"}
                    placeholder={"Enter Email"}
                    value={email}
                    onChangeText={t => setEmail(t)}
                    borderBottomColor={"#f57e59"}
                    keyboardType="email-address" />
                <TextBox
                    source={require('../../Assets/icon/user.png')}
                    label={"Username"}
                    placeholder={"Enter username"}
                    value={username}
                    onChangeText={t => setUserName(t)}
                    borderBottomColor={"#f57e59"}
                />
                <TextBox
                    source={require('../../Assets/icon/key.png')}
                    label={"Password"}
                    placeholder={"Enter password"}
                    value={password}
                    onChangeText={t => setPassword(t)}
                    borderBottomColor={"#f57e59"}
                    secureTextEntry={true}
                />
            </View>
            <View style={{ marginTop: '20%' }}>
                <Button
                    onPress={() => handleSignUp()}
                    title={'Sign up'}
                    bgColor="#f57e59"
                    textColor={'#fff'}
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}
                style={styles.bottomText}>
                <Text>Already have an account? <Text style={styles.text}>SignIn</Text></Text>
            </TouchableOpacity>
        </View>
    )
}