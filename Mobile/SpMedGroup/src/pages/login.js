import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Alert,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'

import api from '../services/api';
import auth from '../services/auth';

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: ''
      , senha: ''
    }

    // this.showDetails = this.showDetails.bind(this)
  }

  realizarLogin = async () => {

    await api.post('/login', {
      email: this.state.email
      , senha: this.state.senha
    })
      .then(resposta => {

        const token = resposta.data.token;
        auth.setItem(token);
        this.props.navigation.navigate("Consultas")
        });
  }

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.overlay} />
        <TextInput
          style={styles.inputLogin}
          placeholder="email"

          // defaultValue="fernando.pereira1@spmedicalgroup.com.br"

          placeholderTextColor="#FFFFFF"
          underlineColorAndroid="#FFFFFF"
          onChangeText={email => this.setState({ email })}
        />

        <TextInput
          style={styles.inputLogin}
          placeholder="senha"
          secureTextEntry={true}
          placeholderTextColor="#FFFFFF"
          password="true"
          underlineColorAndroid="#FFFFFF"
          onChangeText={senha => this.setState({ senha })}
        />
        <TouchableOpacity
          style={styles.btnLogin}
          onPress={this.realizarLogin}
        >
          <Text style={styles.btnLoginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#83BFDF"
  },
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  mainImgLogin: {
    tintColor: "#FFFFFF",
    height: 100,
    width: 90,
    margin: 10
  },
  btnLogin: {
    height: 38,
    shadowColor: "rgba(0,0,0, 0.4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 3, // Android
    width: 240,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#81DF99",
    backgroundColor: "#81DF99",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  btnLoginText: {
    fontSize: 10,
    fontFamily: "OpenSans-Light",
    color: "black",
    letterSpacing: 4
  },
  inputLogin: {
    width: 240,
    marginBottom: 10,
    fontSize: 10
    ,borderBottomColor: 'black'
  }
});

export default Login

//#81df99 -- verde
//#83bedf -- azul

// Adm@email.com
// adimin123

//lol@gmail.com
//senha1

//fernando@gmail.com
//senha3