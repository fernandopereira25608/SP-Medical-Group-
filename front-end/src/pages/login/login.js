import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from  'axios'
import { parseJwt } from '../../services/authentication'

import '../../assets/css/login.css'

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { parse } from 'json5';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            senha : '',
            erroMensagem : '',
            isLoading : false
        }
    }

    realizarLogin = (x) => {

        //Ignora o comportamento padrão do navegador (Recarregar a página)
        x.preventDefault();

        this.setState({ erroMensagem : '', isLoading : true });

        //Faz a chamada para a API passando a URL e o corpo da requisição
        axios.post('http://localhost:5000/api/Login', {
            email : this.state.email,
            senha : this.state.senha
        })

        .then(resposta => {
            //Verifica o retorna da requisição
            if(resposta.status === 200){
                //Salva o valor do token no localStorage
                localStorage.setItem('login', resposta.data.token)
                //Define que a requisição terminou
                this.setState({ isLoading : false })

                console.log(parseJwt().Tipo)

                //Veridica o tipo de usuário que realizou o login
                switch (parseJwt().Tipo){
                    case "1":
                        //Caso seja adm força a página a ser redirecionada para a página de cadastro
                        this.props.history.push('/cadastro')
                      break;
                    case "2":
                        //Caso seja médico força a página a ser redirecionada para a página de listagem
                        this.props.history.push('/listarMedico')
                      break;
                    case "3":
                        //Caso seja paciente força a página a ser redirecionada para a página home
                        this.props.history.push('/listarPaciente')
                      break;
                    default:  
                        this.props.history.push('/')
                      break;
                }
            }
        })

        //Caso tenha erro, caí em uma mensagem personalizada e define o=que a requisição terminou
        .catch(() => {
            this.setState({ erroMensagem : "E-mail ou senha inválidos! Tente novamente.", isLoading : false })
        });
    }

    //Função genérica que atualiza o state de acordo com o input, pode ser ultilizada em vários inputs diferentes
    atualizaState = (x) => {
        this.setState({ [x.target.name] : x.target.value })
    }

    render(){
        return(
            <div className="body">
                <Header />

                <main className='main-login'>
                    <section className="informacoes alinhando-centro">
                        <h2>Login</h2>
                            <form className='dados' onSubmit={this.realizarLogin}>
                                <div className="email">
                                    <h3>E-mail</h3>
                                    <div className="input">
                                        <input 
                                            type="email"
                                            name="email"
                                            //Define que o input email vai receber o valor do state email
                                            value={this.state.email}
                                            //Chama a função que atualiza o state
                                            onChange={this.atualizaState} />
                                    </div>
                                </div>
                                <div className="senha">
                                    <h3>Senha</h3>
                                    <div className="input">
                                        <input 
                                            type="password"
                                            name="senha"
                                            //Define que o input senha vai receber o valor do state senha
                                            value={this.state.senha}
                                            //Chama a função que atualiza o state
                                            onChange={this.atualizaState} />
                                    </div>
                                </div>
                            <p>{this.state.erroMensagem}</p>    {/* Mensagem de erro */}

                            {
                                this.state.isLoading === true &&
                                <button type="submit" disabled>Carregando</button>
                            }

                            {
                                this.state.isLoading === false &&
                                <button type="submit" disabled={this.state.email === '' || this.state.senha === '' ? 'none' : ''}>Entrar</button>
                            }

                            {/* <button type="submit">Entrar</button> */}
                        </form>
                    </section>
                </main>

                <Footer />
            </div>
        )
    }
}