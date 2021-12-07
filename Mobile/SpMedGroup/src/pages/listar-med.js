import React, { Component } from 'react'
import { StyleSheet, Image, Text, View, FlatList, TouchableOpacity, } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../services/api'



class Médico extends Component {  

    constructor(props) {

        super(props)

        this.state = {

            listaConsultasMed: []

        }

    }

    BuscarConsultasMedico = async () => {


        const valorToken = await AsyncStorage.getItem('userToken')

        const resposta = await api.get('/Consulta', {

            headers: {
                'Authorization': 'Bearer ' + valorToken
            }

        })

        const dadosDaApi = resposta.data

        this.setState({ listaConsultasMed: dadosDaApi })

    }


    LimparListaMed = () => {

        this.setState({ listaConsultasMed: [] })

    }


    RealizarLogout = async () => {

        try {

            await AsyncStorage.removeItem('userToken')

            this.props.navigation.navigate('Home')

        }

        catch (error) {

            console.warn(error)

        }

    }


    componentDidMount() {

    }


    render() {

        return (

            <View style={styles.main}>


                <View style={styles.header}>

                    <Image
                        style={styles.hamburger}
                    />

                    <Text style={styles.headerText}>{'clínica sp medical group'.toUpperCase()}</Text>

                    <Image
                        style={styles.logo}
                    />

                </View>


               


                <View style={styles.mainBody}>

                    <View style={styles.flexBtns}>

                        <View style={styles.consultasTitleBox}>
                            <Text style={styles.consultasTitle}>{'agenda - médico'.toUpperCase()}</Text>
                        </View>

                        <TouchableOpacity
                            onPress={this.RealizarLogout}
                            style={styles.btnLogout}
                        >
                            <View style={styles.btnLogoutBox}>
                                <Text style={styles.btnLogoutText}>{'sair'.toUpperCase()}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>


                    <TouchableOpacity
                        onPress={this.BuscarConsultasMedico}
                        style={styles.consultasBtn}
                    >

                        <View style={styles.consultasBtnBox}>
                            <Text style={styles.consultasBtnText}>{'ver consultas'.toUpperCase()}</Text>
                        </View>

                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={this.LimparListaMed}
                        style={styles.consultasBtn}
                    >

                        <View style={styles.consultasBtnBox}>
                            <Text style={styles.consultasBtnText}>{'limpar lista'.toUpperCase()}</Text>
                        </View>

                    </TouchableOpacity>


                    

                    <View style={styles.listaConsultasBox}>

                        <FlatList
                            contentContainerStyle={styles.mainListContent}
                            data={this.state.listaConsultasMed}
                            keyExtractor={item => item.idConsulta}
                            renderItem={this.renderItem}
                        />

                    </View>

                </View>


            </View>

        )

    }


    renderItem = ({ item }) => (

        <View style={styles.flatItemRow}>

            <View style={styles.flatItemContainer}>

                <Text style={styles.flatItemInfo}>Data da Consulta: {Intl.DateTimeFormat('pt-BR').format(new Date(item.dataConsulta))}</Text>
                <Text style={styles.flatItemInfo}>Paciente: {item.idPacienteNavigation.nomePaciente} </Text>
                <Text style={styles.flatItemInfo}>Situação da Consulta: {item.idSituacaoNavigation.descricaoSituacao} </Text>

                <View style={styles.flexDescricao}>

                    <Text style={styles.flatItemDescricao}>Descrição: {item.descricao}</Text>

                    <Image
                        style={styles.flatItemImg}
                    />

                </View>

            </View>

        </View>

    )

}

export default Médico


const styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: '#aefad0',
    },

    header: {
        width: '100%',
        height: 90,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    hamburger: {
        width: 40,
        height: 40,
    },

    headerText: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: 400,
        color: '#000',
        marginLeft: 25
    },

    logo: {
        width: 70,
        height: 74,
        marginLeft: 30
    },


    flexBtns: {
        alignItems: 'center'
    },

    consultasTitleBox: {
        width: '50%',
        height: 40,
        borderRadius: 5,
        marginTop: 15,
        marginLeft: '25%',
        marginRight: '25%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    consultasTitle: {
        fontFamily: 'Roboto',
        fontSize: 18
    },

    btnLogout: {
        marginTop: 15,
    },

    btnLogoutBox: {
        width: 100,
        height: 20,
        borderRadius: 6,
        textAlign: 'center',
    },

    btnLogoutText: {
        fontFamily: 'Roboto',
        fontSize: 16
    },

    consultasBtn: {
        width: '40%',
        height: 30,
        marginTop: 18,
        marginLeft: '30%',
        marginRight: '30%',
    },

    consultasBtnBox: {
        width: '100%',
        height: '100%',    
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    consultasBtnText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#fff'
    },


    

    listaConsultasBox: {
        width: '80%',
        height: 'auto',
        borderRadius: 10,
        marginTop: 15,
        marginLeft: '10%',
        marginRight: '10%'
    },

    flatItemRow: {
        borderBottomWidth: 2,
        borderColor: '#000',
        marginTop: 10
    },

    flatItemContainer: {
        flex: 1
    },

    flatItemInfo: {
        lineHeight: 25
    },

    flatItemImg: {
        width: 16,
        height: 16,
        tintColor: 'green',
        marginTop: 8,
        marginBottom: 3,
        marginLeft: 15
    },

    flexDescricao: {
        flexDirection: 'row',
    },

    flatItemDescricao: {
        marginTop: 6
    }


})