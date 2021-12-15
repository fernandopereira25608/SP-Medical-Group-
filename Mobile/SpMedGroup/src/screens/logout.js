import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from "@react-navigation/native";

export default function Logout() {
    const navigation = useNavigation();


    async function Deslogar() {
        await AsyncStorage.removeItem('userToken');
        navigation.navigate('Login')
    }

    return (
        <View style={styles.main}>
            <Text style={styles.mainTitulo}>{"Deseja sair?".toUpperCase()}</Text>
            <TouchableOpacity
                onPress={Deslogar}
                style={styles.btnSair}
            >
                <Text
                    style={styles.btnSairText}
                >
                    {"Sim".toUpperCase()}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: '100%',
        backgroundColor: "#F6F6F6"
    },
    mainTitulo: {
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 32,
        color: '#000'
    },
    btnSair: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 47,
        backgroundColor: '#12c7c7',
        marginTop: 40
    },
    btnSairText: {
        fontFamily:'TitilliumWeb-Regular',
        fontSize: 24,
        color: '#000'
    }
})