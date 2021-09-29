using spmedgroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace spmedgroup.webAPI.Interfaces
{
    /// <summary>
    /// Interface responsável pelo ConsultaRepository
    /// </summary>
    interface IConsultaRepository
    {
        /// <summary>
        /// Cadastra uma nova consulta
        /// </summary>
        /// <param name="consulta">Objeto Consulta a ser cadastrado</param>
        void Cadastrar(Consultum consulta);

        /// <summary>
        /// Lista todas as consultas cadastradas
        /// </summary>
        /// <returns>Uma lista de consultas</returns>
        List<Consultum> ListarTodos();

        /// <summary>
        /// Lista as consultas de um médico ou paciente específico
        /// </summary>
        /// <param name="id">ID do médico ou usuário</param>
        /// <returns></returns>
        List<Consultum> ListarMinhas(int id);

        /// <summary>
        /// Busca uma consulta específica
        /// </summary>
        /// <param name="idConsulta">ID da consulta</param>
        /// <returns>Objeto Consulta que foi buscado</returns>
        Consultum BuscarPorId(int idConsulta);

        /// <summary>
        /// Busca uma nova consulta específica
        /// </summary>
        /// <param name="idConsulta">ID da consulta</param>
        void Deletar(int idConsulta);

        /// <summary>
        /// Atualiza uma consulta específica
        /// </summary>
        /// <param name="idConsulta">ID da consulta</param>
        /// <param name="novaConsulta">Objeto Consulta com as novas informações</param>
        void Atualizar(int idConsulta, Consultum novaConsulta);

        /// <summary>
        /// Altera o status de uma consulta
        /// </summary>
        /// <param name="idConsulta">ID da consulta que será alterada</param>
        /// <param name="status">Novo status para a consulta</param>
        void Aprovacao(int idConsulta, string status);

        /// <summary>
        /// Insere uma descrição a uma consulta específica
        /// </summary>
        /// <param name="idConsulta">ID da consulta</param>
        /// <param name="descricao">Descrição da consulta</param>
        void InserirDesc(int idConsulta, string descricao);
    }
}
