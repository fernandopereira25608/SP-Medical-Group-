import { React, Component } from 'react';
//import { Link } from 'react-router-dom';

import '../../assets/css/cadastro.css';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

export default class Cadastro extends Component{
    constructor(props){
        super(props);
        this.state = {
            listaConsultas : [],
            idMedico : 0,
            idPaciente : 0,
            idSituacao : 1,
            descricao : '',
            data : new Date(),
            hora : '',
            listaMedicos : [],
            listaPacientes : [],
            isLoading : false
        }
    }

    //Fazer a requisição e trazer a lista de consultas
    buscarConsultas = () =>
    {
        //Faz a chamada para a API
        fetch('http://localhost:5000/api/Consulta')

        //Define que a resposta da requisição será em JSON
        .then(resposta => resposta.json())

        //Atualiza o state listaConsultas com os dados obtidos
        .then(dados => this.setState({ listaConsultas : dados }))

        //Caso acorra algum erro, mostra ele no console do navegador
        .catch((erro) => console.log(erro))
    }

    //Fazer a requisição e trazer a lista de médicos
    buscarMedicos = () =>
    {
        fetch('http://localhost:5000/api/Medico')

        //Define que a resposta da requisição será em JSON
        .then(resposta => resposta.json())

        //Atualiza o state listaMedicos com os dados obtidos
        .then(dados => this.setState({ listaMedicos : dados }))

        //Caso acorra algum erro, mostra ele no console do navegador
        .catch((erro) => console.log(erro))
    }

    //Fazer a requisição e trazer a lista de pacientes
    buscarPacientes = () =>
    {
        fetch('http://localhost:5000/api/Paciente')

        //Define que a resposta da requisição será em JSON
        .then(resposta => resposta.json())

        //Atualiza o state listaPacientes com os dados obtidos
        .then(dados => this.setState({ listaPacientes : dados }))

        //Caso acorra algum erro, mostra ele no console do navegador
        .catch((erro) => console.log(erro))
    }

    //Chama a função buscarConsultas() assim que o component é renderizado
    componentDidMount()
    {
        this.buscarConsultas();
        this.buscarMedicos();
        this.buscarPacientes();
    }

    //Função responsável por cadastrar uma nova consulta
    cadastrarConsulta = (x) =>
    {
        //Ignora a ação padrão do navegador, que é atualizar(recarregar) a página inteira
        x.preventDefault();

        //Define que a requisição está em andamento
        this.setState({ isLoading : true })

        let consulta = {
            idPaciente : this.state.idPaciente,
            idMedico : this.state.idMedico,
            dataConsulta : new Date( this.state.data + 'T' + this.state.hora ),
            // dataConsulta : this.state.data + T + this.state.hora
            idSituacao : this.state.idSituacao,
            descricao : this.state.descricao
        }

        fetch('http://localhost:5000/api/Consulta', {

            method : 'POST',

            body : JSON.stringify({ consulta }),
        })

        //Define que a resposta da requisição será em JSON
        .then(resposta => resposta.json())

        //Atualiza o state listaPacientes com os dados obtidos
        .then(dados => this.setState({ listaPacientes : dados }))
        .then(dados => this.setState({ listaMedicos : dados }))
        .then(dados => this.setState({ data : dados }))
        .then(dados => this.setState({ hora : dados }))
        .then(dados => this.setState({ isLoading : true }))

        .catch(erro => {
            //Mostra o erro no console do navegador
            console.log(erro)
            //Define que a requisição terminou
            this.setState({ isLoading : false })
        })

        //Atualiza a lista de consultas sem que o usuário precise fazer alguma outra ação
        .then(this.buscarConsultas());
    }

    //Função genérica que atualiza o state de acordo com o input, pode ser ultilizada em vários inputs diferentes
    atualizaStateCampo = (x) =>
    {
        this.setState({ [x.target.name] : x.target.value })
    }

    render()
    {
        return(
            <div className='body'>
                <Header />
                <main className='main-cadastro'>
                    <div className="alinhando-centro">
                        <div className="informacoes-cadastro">
                            <h2>Nova Consulta</h2>
                            <div className="card-cadastro">
                                <form className="info-cards" onSubmit={this.cadastrarConsulta}>
                                    <div className="caixa-texto">
                                        <p>Nome do médico</p>
                                        <select name='idMedico' value={this.state.idMedico} onChange={this.atualizaStateCampo}>
                                            <option value='0'>Selecione o Médico</option>

                                            {/* Usa o map() para preencher a lista de opções, ou seja, percorre a lista de pacientes e retorna uma option para cada paciente definindo o valor como seu prórpio id */}

                                            {
                                                this.state.listaMedicos.map( medico => {
                                                    return(
                                                        <option key={medico.idPaciente} value={medico.idPaciente}>{medico.idUsuarioNavigation.nome}</option>
                                                    )
                                                })
                                            }

                                        </select>
                                    </div>
                                        <div className="caixa-texto">
                                            <p>Nome do paciente</p>
                                            <select name='idPaciente' value={this.state.idPaciente} onChange={this.atualizaStateCampo}>
                                                <option value='0'>Selecione o paciente</option>

                                                {/* Usa o map() para preencher a lista de opções, ou seja, percorre a lista de pacientes e retorna uma option para cada paciente definindo o valor como seu prórpio id */}

                                                {
                                                    this.state.listaPacientes.map( paciente => {
                                                        return(
                                                            <option key={paciente.idPaciente} value={paciente.idPaciente}>{paciente.idUsuarioNavigation.nome}</option>
                                                        )
                                                    })
                                                }

                                            </select>
                                        </div>
                                        <div className="caixa-texto">
                                            <p>Dia</p>
                                            <input
                                                name='data'
                                                type="date"
                                                value={this.state.data}
                                                onChange={this.atualizaStateCampo}
                                            />
                                        </div>
                                        <div className="caixa-texto">
                                            <p>Hora</p>
                                            <input
                                                name='hora'
                                                type="time"
                                                value={this.state.hora}
                                                onChange={this.atualizaStateCampo}
                                            />
                                        </div>
                                        <button type="submit">Cadastrar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}