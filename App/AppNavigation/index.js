import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn } from "../Screens/SignIn";
import { SignUp } from "../Screens/SignUp";
import { HomeScreen } from "../Screens/HomeScreen";
import { CreateTask } from "../Screens/CreateTask";
import { Splash } from "../Screens/Splash";

const Stack = createNativeStackNavigator()
export const AppNavigation = () => {

    useEffect(() => {
        getAuth()
    }, [])

    const getAuth = async () => {
        // const auth =
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="First" component={Splash} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="CreateTask" component={CreateTask} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}