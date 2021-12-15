import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

import api from '../services/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigation = useNavigation()

    realizarLogin = async() => {
        const resposta = await api.post('/login', {
            email: email,
            senha: senha,
        });
        const token = resposta.data.token;
    
        await AsyncStorage.setItem('userToken', token)

        if (resposta.status == 200) {
            navigation.navigate('Main')
        }
    };

    return(
        <ImageBackground
            source={require('../../assets/img/LoginBack.png')}
            style={StyleSheet.absoluteFillObject}
        >
            <View style={styles.main}>
                <Image
                    source={require('../../assets/img/LoginBranco.png')}
                    style={styles.mainImgLogin}
                />
                <TextInput
                    placeholder={'Email'.toUpperCase()}
                    placeholderTextColor='#FFF'
                    keyboardType='email-address'
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                    style={styles.inputLogin}
                />
                <TextInput
                    placeholder={'Senha'.toUpperCase()}
                    placeholderTextColor='#FFF'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={senha}
                    onChangeText={(senha) => setSenha(senha)}
                    style={styles.inputLogin}
                />
                <TouchableOpacity
                    onPress={realizarLogin}
                    style={styles.btnLogin}
                >
                    <Text
                        style={styles.btnLoginText}
                    >
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    main: {
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'100%',
    },
    mainImgLogin:{
        height:100,
        width:165,
        margin:60,
        marginTop:0,
    },
    inputLogin:{
        width:280,
        marginBottom:40,
        fontFamily:'TitilliumWeb-Regular',
        fontSize:16,
        borderBottomColor: '#FFF',
        borderBottomWidth:2,
        color: "#FFF"
    },
    btnLoginText:{
        fontSize:16,
        fontFamily:'TitilliumWeb-Regular',
        color: '#FFF',
        textTransform:'uppercase',
        letterSpacing:6,
    },
    btnLogin:{
        alignItems: 'center',
        justifyContent: 'center',
        height:47,
        width:100,
        borderColor: '#FFF',
        borderWidth:2,
        shadowOffset:{height:1, width:1},
        marginTop: 20
    }
})