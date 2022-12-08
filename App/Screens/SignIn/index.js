import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button } from "../../Components/Button";
import { TextBox } from "../../Components/TextBox";
import { styles } from "./styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from "../../Utils/Database";

export const SignIn = ({ navigation }) => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [pass, setPass] = useState('')

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData();
        })
        return unsubscribe;
    }, [navigation])

    const getData = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT UserName, Password FROM users', [],
                (obj, result) => {
                    setName(result.rows.item(0).UserName);
                    setPass(result.rows.item(0).Password);
                })
        })
    }

    const handleSignIn = async () => {
        if (username === name && password === pass) {
            await AsyncStorage.setItem('auth', JSON.stringify(true))
            navigation.navigate('Home')
        } else {
            alert('Please enter valid data')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.heading}>Login</Text >
            </View>
            <View style={styles.subContainer}>
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
                    secureTextEntry={true}
                    borderBottomColor={"#f57e59"}
                />
                <TouchableOpacity >
                    <Text style={styles.forgot}>Forgot password</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 100 }}>
                <Button
                    onPress={() => handleSignIn()}
                    title={'Sign in'}
                    bgColor="#f57e59"
                    textColor={'#fff'}
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}
                style={styles.bottomText}>
                <Text>Don't have an account? <Text style={styles.text}>SignUp</Text></Text>
            </TouchableOpacity>
        </View>
    )
}