import { useState, useEffect } from 'react';
import axios from "axios";

import Header from "../../components/header/header";
import Footer from '../../components/footer/footer';

import '../../assets/css/med.css'

export default function ConsultaMed() {
    const [listaConsul, setListaConsul] = useState([]);
    const [idConsulta, setIdConsulta] = useState('');
    const [descricao, setDescricao] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function listarConsultas() {
        axios('http://spmedgroup-kaue.azurewebsites.net/api/consultas/listar/minhas', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaConsul(resposta.data.listaConsultas)
                }
            })

            .catch(erro => console.log(erro))
    };

    useEffect(listarConsultas, []);

    function alterarConsulta(evento) {
        setIsLoading(true);

        evento.preventDefault()

        axios
            .patch('http://spmedgroup-kaue.azurewebsites.net/api/consultas/descricao/' + idConsulta, {
                Descricao: descricao

            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .then(resposta => {

                if (resposta.status === 200) {
                    console.log('Descrição alterada');

                    listarConsultas();
                    setIsLoading(false);
                }
            })
            .catch(erro => console.log(erro), setInterval(() => {
                setIsLoading(false)
            }, 5000));
    }

    return (
        <div>
            <Header />
            <main className="container">
                <div className="background_cadastrar">
                    <div className="grid alinhar_box">
                        <section className="container_form">
                            <form className="alinhar_form" onSubmit={alterarConsulta}>
                                <h1>Alterar Prontuário</h1>
                                <div className="container_input espacamento">
                                    <label htmlFor="consulta">Consulta</label>
                                    <select
                                        name="consulta"
                                        id="consulta"
                                        value={idConsulta}
                                        onChange={(campo) => setIdConsulta(campo.target.value)}
                                    >
                                        <option value='0'>Selecione a Consulta</option>

                                        {listaConsul.map((consulta) => {
                                            return (
                                                <option key={consulta.idConsulta} value={consulta.idConsulta}>
                                                    {consulta.idPacienteNavigation.idUsuarioNavigation.nome}/Cpf:{consulta.idPacienteNavigation.cpf}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="container_input">
                                    <label htmlFor="descricao">Descrição</label>
                                    <input
                                        type="text" 
                                        name="descricao"
                                        value={descricao}
                                        onChange={(campo) => setDescricao(campo.target.value)}
                                    />
                                </div>
                                {isLoading && (
                                    <button disabled className='btn' type = 'submit'>
                                        Carregando...
                                    </button>
                                )}
                                {!isLoading &&(
                                    <button className='btn' type='submit'>
                                        Alterar
                                    </button>
                                )}
                            </form>
                        </section>
                    </div>
                </div>
                <div className="background_consulta">
                    <div className="grid alinhar_consulta">
                        <section className="container_tabela">
                            <h2>Minhas Consultas</h2>
                            <table className="tabela">
                                <thead>
                                    <tr>
                                        <th>Médico</th>
                                        <th>Paciente</th>
                                        <th>Prontuário</th>
                                        <th>Status</th>
                                        <th>Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaConsul.map((consulta) => {
                                        return (
                                            <tr key={consulta.idConsulta}>
                                                <td>{consulta.idMedicoNavigation.idUsuarioNavigation.nome}</td>
                                                <td>{consulta.idPacienteNavigation.idUsuarioNavigation.nome}</td>
                                                <td>{consulta.descricao}</td>
                                                <td>{consulta.idSituacaoNavigation.descricao}</td>
                                                <td>{Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                                    hour: 'numeric', minute: 'numeric', hour12: false
                                                }).format(new Date(consulta.dataConsul))}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}