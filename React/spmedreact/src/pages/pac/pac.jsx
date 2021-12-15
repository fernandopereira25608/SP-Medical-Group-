import { useState, useEffect } from 'react';
import axios from "axios";

import Header from "../../components/header/header";
import Footer from '../../components/footer/footer';

import '../../assets/css/pac.css'

export default function ConsultaPac() {
    const [listaConsul, setListaConsul] = useState([]);

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

    return (
        <div>
            <Header />
            <main className="container">
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