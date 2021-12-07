import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import jwt from "jwt-decode";

import api from '../services/api';
import auth from '../services/auth';

class Consultas extends Component {
    constructor(props){
        super(props);

        this.state = {
            lista: []
            ,token: ''
            ,usuario: ''
        }
    }

    componentDidMount(){
        this.buscarToken();
    }

    buscarToken = async () =>{
        try{
            const value = await auth.getItem('spmedg-token');
            if(value !== null){
                // Alert.alert(value)
                this.setState({ token: value });
                this.setState({ usuario: jwt(value).tipoUsuario });
                // Alert.alert(this.state.usuario)
                this.carregarConsulta();
            }
        }
        catch{
            (error)
        }
    }

    carregarConsulta = async () =>{
        const resposta = await api.get('/Consultas', 
        {headers: {
                'Authorization': "bearer " + this.state.token
            }
        })
        const dadosDaApi = resposta.data
        // Alert.alert(tipousuario)
        this.setState({ lista : dadosDaApi })
    }

    
    deslogar = async () =>{
        await auth.removeItem('spmedg-token');

        this.props.navigation.navigate("Login");
    }

    render() {
        return (
            <View>
                <View style={styles.headers}>
                    <Text >Consultas</Text>
                    <TouchableOpacity
                        onPress={this.deslogar}
                    >
                        <Text style={{fontWeight: 'bold'}} style={styles.btnDeSair}>Sair</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data = {this.state.lista}
                    keyExtractor = {item => item.idConsulta}
                    renderItem = {this.renderizaItem}
                />
            </View>
        )
    }

    renderizaItem = ({item}) =>(
        this.state.usuario === 'Paciente' ?
        <View style={styles.consultas}>

                {item.statusConsulta === 'Realizada' ?
                    <View style={styles.displayStatus}>
                        <Text>{item.statusConsulta}</Text>
                        <View style={styles.barraDeStatusRealizada}></View>
                    </View>
                    : (item.statusConsulta === 'Cancelada' ?
                    <View style={styles.displayStatus}>
                        <Text>{item.statusConsulta}</Text>
                        <View style={styles.barraDeStatusCancelada}></View>
                    </View>
                    :
                    <View style={styles.displayStatus}>
                        <Text>{item.statusConsulta}</Text>
                        <View style={styles.barraDeStatusAgendada}></View>
                    </View>
                    ) 
                }

            <Text>Data: {item.dataConsulta}</Text>
            <Text>Médico: {item.nomeMedico}</Text>
            <Text>especialidade: {item.especialidade}</Text>
            <Text>Obs: {item.descricao}</Text>
        </View> 
        :
        ( this.state.usuario === 'Médico' ?
        <View style={styles.consultas}>

                {item.statusConsulta === 'Realizada' ?
                    <View style={styles.displayStatus}>
                        <Text>{item.statusConsulta}</Text>
                        <View style={styles.barraDeStatusRealizada}></View>
                    </View>
                    : (item.statusConsulta === 'Cancelada' ?
                    <View style={styles.displayStatus}>
                        <Text>{item.statusConsulta}</Text>
                        <View style={styles.barraDeStatusCancelada}></View>
                    </View>
                    :
                    <View style={styles.displayStatus}>
                        <Text>{item.statusConsulta}</Text>
                        <View style={styles.barraDeStatusAgendada}></View>
                    </View>
                    ) 
                }

            <Text>Data: {item.dataConsulta}</Text>
            <Text>Paciente: {item.nomePaciente}</Text>
            <Text>Nascimento: {item.dtNascimentoPaciente}</Text>
            <Text>Obs: {item.descricao}</Text>
        </View>
            :
            (this.state.usuario === 'Administrador' ? 
                <View style={styles.consultas}>

                    {item.statusConsulta === 'Realizada' ?
                    <View style={styles.displayStatus}>
                        <Text>{item.statusConsulta}</Text>
                        <View style={styles.barraDeStatusRealizada}></View>
                    </View>
                    : (item.statusConsulta === 'Cancelada' ?
                    <View style={styles.displayStatus}>
                        <Text>{item.statusConsulta}</Text>
                        <View style={styles.barraDeStatusCancelada}></View>
                    </View>
                    :
                    <View style={styles.displayStatus}>
                        <Text>{item.statusConsulta}</Text>
                        <View style={styles.barraDeStatusAgendada}></View>
                    </View>
                    ) 
                }

                    <View>
                        <Text>Data: {item.dataConsulta}</Text>
                        <Text>Paciente: {item.nomePaciente}</Text>
                        <Text>Nascimento: {item.dtNascimentoPaciente}</Text>
                        <Text>Médico: {item.nomeMedico}</Text>
                        <Text>especialidade: {item.especialidade}</Text>
                        <Text>Obs: {item.descricao}</Text>
                    </View>
                </View>
            : 
            <Text>Erro</Text>
            )
        )
    );
}

const styles = StyleSheet.create({
    displayStatus:{
        flexDirection: 'row-reverse',
        alignItems: 'center'
    }
    ,headers: {
        color: 'black'
        ,width: '100%'
        ,flexDirection: 'row'
        ,justifyContent: 'space-between'
        ,alignItems: 'center'
        ,height: 36
        ,paddingLeft: 50
        ,backgroundColor: '#81df99'
    }
    ,btnDeSair: {
        backgroundColor: '#e3e3e3'
        ,height: '100%'
        ,width: 40
        ,textAlign: 'center'
        ,borderBottomLeftRadius: 10

    }
    ,consultas: {
        padding: 10,
        backgroundColor: "#ededed"
        ,width: '90%'
        ,marginLeft: '5%'
        ,marginTop: '5%'
        ,fontSize: 12
        ,borderBottomRightRadius: 20
        ,borderTopLeftRadius: 20
        ,color: 'black'
    }
    ,barraDeStatusRealizada: {
        width: 12
        ,height: 12
        ,backgroundColor: '#1bc400'
        ,marginRight: 9
        ,borderRadius: 10
    }
    ,barraDeStatusCancelada: {
        width: 12
        ,height: 12
        ,backgroundColor: '#C74646'
        ,marginRight: 9
        ,borderRadius: 10
    }
    ,barraDeStatusAgendada: {
        width: 12
        ,height: 12
        ,backgroundColor: '#fff335'
        ,marginRight: 9
        ,borderRadius: 10
    }
})

export default Consultas


// Cores #81df99 -- verde
// Cores #83bedf -- azul