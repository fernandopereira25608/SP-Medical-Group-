import { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../assets/css/listagemPaciente.css';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

export default class ListarAdm extends Component{
    constructor(props){
        //Permite que nós possamos referênciar o this
        super(props);
        this.state = {
            listaConsultas : []
        }
    }

    buscarConsultas = (x) => {
        
        //Faz a chamada para a API
        fetch('http://localhost:5000/api/Consulta/minhasP', {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('login')
            }
        })

        //Define que a resposta da requisição será em JSON
        .then(resposta => resposta.json())

        //Atualiza o state listaConsultas com os dados obtidos
        .then(dados => this.setState({ listaConsultas : dados }))

        //Caso acorra algum erro, mostra ele no console do navegador
        .catch((erro) => console.log(erro))

        console.log(this.state.listaConsultas)
    }

    //Chama a função buscarConsultas() assim que o component é renderizado
    componentDidMount(){
        this.buscarConsultas();
    }

    render(){
        return(

            <div className='body'>

                <Header />

                <main className='main-paciente'>
                    <section className="informacoes alinhando-centro">
                        <h2>Consultas</h2>
                        <div className="dentro">
                            <div className="cima-info">
                                {
                                    this.state.listaConsultas.map(consulta => {
                                        return(
                                            <div className="card" key={consulta.idConsulta}>
                                                <div className="medico alinhando-centro">
                                                    <h3>Médico</h3>
                                                    <div className="campo">
                                                        <p>{consulta.idMedicoNavigation.idUsuarioNavigation.nome}</p>
                                                    </div>
                                                </div>
                                                <div className="especialidade alinhando-centro">
                                                    <h3>Especialidade</h3>
                                                    <div className="campo">
                                                        <p>{consulta.idMedicoNavigation.idEspecialidadeNavigation.nome}</p>
                                                    </div>
                                                </div>
                                                <div className="data-hora alinhando-centro">
                                                    <h3>Data e hora</h3>
                                                    <div className="campo">
                                                        {/* <p>{(consulta.dataConsulta).split('T')[]}</p> */}
                                                        <p>{Intl.DateTimeFormat("pt-BR").format(new Date(consulta.dataConsulta))} {(consulta.dataConsulta).split('T')[1]}</p>
                                                    </div>
                                                </div>
                                                <div className="descricao alinhando-centro">
                                                    <h3>Descrição</h3>
                                                    <div className="campo">
                                                        <p>{consulta.descricao}</p>
                                                    </div>
                                                </div>
                                                <div className="situacao alinhando-centro">
                                                    <h3>Situação</h3>
                                                    <div className="campo">
                                                        <p>{consulta.idSituacaoNavigation.descricao}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        {/* <Link to='/cadastro'>
                        <button type="submit">Cadastrar nova consulta</button>
                        </Link> */}
                    </section>
                </main>

                <Footer />

            </div>

        )
    }

}