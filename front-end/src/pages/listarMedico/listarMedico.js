import { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../assets/css/listagemMedico.css';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

export default class ListarAdm extends Component{
    constructor(props){
        //Permite que nós possamos referênciar o this
        super(props);
        this.state = {
            listaConsultas : [],
            idConsultaAlterada : 0,
            descricaoAtualizada : ''
        }
    }

    buscarConsultas = (x) => {
        
        fetch('http://localhost:5000/api/Consulta/minhasM', {
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

    }

    //Busca a consulta pelo ID da mesma e atualiza os states
    buscarConsultaPorId = (consulta) => {

        this.setState({ idConsulta : localStorage.setItem('descricao', consulta.idConsultaAlterada)}

        , () => {
            console.log(
                // Exibe no console do navegador o valor do ID do Tipo de Evento recebido
                'Consulta ' + consulta.idConsulta + ' foi selecionada, ',
                // o valor do state idTipoEventoAlterado
                'agora o valor do state idConsultaAlterada é: ' + this.state.idConsultaAlterada,
                // e o valor do state titulo
                'e o valor do state descricaoAtualizada é: ' + this.state.descricaoAtualizada
            );
        });
    }

    atualizarDescricao = (x) => {

        x.preventDefault();

        fetch('http://localhost:5000/api/Consulta/'+this.state.idConsultaAlterada+'/descricao', {
            
            //Define o método da requisição
            method: 'PATCH',

            //Define o corpo da requisição convertendo um objeto JS em JSON
            body: JSON.stringify({ descricao : this.state.descricaoAtualizada }),

            //Define o cabeçalho da requisição
            headers : {
                "Content-type" : "application/json",
                'Authorization' : 'Bearer ' + localStorage.getItem('login')
            }
        })

        //Define que a resposta da requisição será em JSON
        .then(resposta => resposta.json())

        //Atualiza o state listaConsultas com os dados obtidos
        .then(dados => this.setState({ listaConsultas : dados }))

        .then(this.buscarConsultas)

        //Caso acorra algum erro, mostra ele no console do navegador
        .catch((erro) => console.log(erro))

        console.log(this.state.listaConsultas)


    }

    atualizarEstadoDescricao = async (event) => {

        await this.setState({
            [event.target.name] : event.target.value, idConsultaAlterada : event.target.id
        })
    }

    //Chama a função buscarConsultas() assim que o component é renderizado
    componentDidMount(){
        this.buscarConsultas();
    }

    render(){
        return(

            <div className='body'>
                <Header />

                <main className='main-medico'>
                    <section className="informacoes alinhando-centro">
                        <h2>Consultas</h2>
                        <div className="dentro">
                            <div className="cima-info">

                                {
                                    this.state.listaConsultas.map(consulta => {
                                        return(
                                            <div className="card" key={consulta.idConsulta}>
                                                <div className="paciente alinhando-centro">
                                                    <h3>Paciente</h3>
                                                    <div className="campo">
                                                        <p>{consulta.idPacienteNavigation.idUsuarioNavigation.nome}</p>
                                                    </div>
                                                </div>
                                                <div className="data-hora alinhando-centro">
                                                    <h3>Data e hora</h3>
                                                    <div className="campo">
                                                        <p>{Intl.DateTimeFormat("pt-BR").format(new Date(consulta.dataConsulta))} {(consulta.dataConsulta).split('T')[1]}</p>
                                                    </div>
                                                </div>
                                                <form onSubmit={this.atualizarDescricao} className="descricao alinhando-centro">
                                                    <h3>Descrição</h3>
                                                    <div>
                                                        <textarea 
                                                            className="campo"
                                                            onChange={this.atualizarEstadoDescricao}
                                                            id={consulta.idConsulta}
                                                            name="descricaoAtualizada"
                                                            row="2"
                                                        >
                                                        {consulta.descricao}</textarea>
                                                    </div>
                                                    <button type="submit">Atualizar descrição</button>
                                                </form>
                                                <div className="situacao alinhando-centro">
                                                    <h3>Situação</h3>
                                                    <div className="campo">
                                                        <p>{consulta.idSituacaoNavigation.descricao}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>

        )
    }

}