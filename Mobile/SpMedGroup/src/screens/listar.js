import React, { useState, useEffect } from "react";

import {
    StyleSheet,
    Text,
    View,
    FlatList,
} from 'react-native';

import api from '../services/api'

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Consultas() {
    const [listaConsultas, setListaConsultas] = useState([]);


    async function BuscarConsultas() {
        const token = await AsyncStorage.getItem('userToken');

        const resposta = await api.get('/consultas/listar/minhas', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })

        const dadosDaApi = resposta.data.listaConsultas;

        setListaConsultas(dadosDaApi)
    }

    useEffect(() => {
        BuscarConsultas();
    }, [])

    return (
        <View style={styles.main}>
            <View style={styles.mainHeader}>
                <Text style={styles.mainHeaderText}>{'Consultas'.toUpperCase()}</Text>
                <View style={styles.mainHeaderLine}></View>
            </View>
            <View style={styles.mainBody}>
                <FlatList
                    contentContainerStyle={styles.mainBodyContent}
                    data={listaConsultas}
                    keyExtractor={item => item.idConsulta}
                    renderItem={({ item }) => (
                        <View style={styles.flatItem}>
                            <Text style={styles.flatItemInfo}>{"Médico: " + (item.idMedicoNavigation.idUsuarioNavigation.nome)}</Text>
                            <Text style={styles.flatItemInfo}>{"Paciente: " + (item.idPacienteNavigation.idUsuarioNavigation.nome)}</Text>
                            <Text style={styles.flatItemInfo}>{"Prontuário: " + (item.descricao)}</Text>
                            <Text style={styles.flatItemInfo}>{"Status: " + (item.idSituacaoNavigation.descricao)}</Text>
                            <Text style={styles.flatItemInfo}>{"Data: " + (Intl.DateTimeFormat("pt-BR", {
                                year: 'numeric', month: 'numeric', day: 'numeric',
                                hour: 'numeric', minute: 'numeric', hour12: false
                            }).format(new Date(item.dataConsul)))}</Text>
                        </View>

                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#F6F6F6'
    },
    mainHeader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainHeaderText: {
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 16,
        color: '#000',
        letterSpacing: 5
    },
    mainHeaderLine: {
        width: 220,
        paddingTop: 10,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
    },
    mainBody: {
        flex: 4,
    },
    mainBodyContent: {
        paddingTop: 10,
        paddingRight: 50,
        paddingLeft: 50,
    },
    flatItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginTop: 40,
    },
    flatItemInfo: {
        fontSize: 14,
        color: '#000',
        lineHeight: 24,
        fontFamily: 'TitilliumWeb-Regular',
    }
})