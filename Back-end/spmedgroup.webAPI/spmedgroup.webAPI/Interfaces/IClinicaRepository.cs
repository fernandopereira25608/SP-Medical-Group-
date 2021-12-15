using spmedgroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace spmedgroup.webAPI.Interfaces
{
    /// <summary>
    /// Interface responsável pelo ClinicaRepository
    /// </summary>
    interface IClinicaRepository
    {
        /// <summary>
        /// Cadastra uma nova clínica
        /// </summary>
        /// <param name="clinica">Objeto Clinica a ser cadastrado</param>
        void Cadastrar(Clinica clinica);

        /// <summary>
        /// Lista todas as clínicas cadastradas
        /// </summary>
        /// <returns>Lista de clínicas</returns>
        List<Clinica> ListarTodos();

        /// <summary>
        /// Busca uma clínica em específico
        /// </summary>
        /// <param name="idClinica">ID da clínica</param>
        /// <returns>Objeto Clinica que foi buscado</returns>
        Clinica BuscarPorId(int idClinica);

        /// <summary>
        /// Deleta uma clínica em específico
        /// </summary>
        /// <param name="idClinica">ID da clínic</param>
        void Deletar(int idClinica);

        /// <summary>
        /// Atualiza uma clínica em específico
        /// </summary>
        /// <param name="idClinica">ID da clínica</param>
        /// <param name="novaClinica">Objeto Clinica com as novas informações</param>
        void Atualizar(int idClinica, Clinica novaClinica);
    }
}
