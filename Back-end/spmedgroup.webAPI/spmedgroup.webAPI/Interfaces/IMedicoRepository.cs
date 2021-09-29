using spmedgroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace spmedgroup.webAPI.Interfaces
{
    /// <summary>
    /// Interface responsável pelo MedicoRepository
    /// </summary>
    interface IMedicoRepository
    {
        /// <summary>
        /// Cadastra um novo médico
        /// </summary>
        /// <param name="medico">Objeto Medico a ser cadastrado</param>
        void Cadastrar(Medico medico);

        /// <summary>
        /// Lista todos os médicos cadastrados
        /// </summary>
        /// <returns>Uma lista de médicos</returns>
        List<Medico> ListarTodos();

        /// <summary>
        /// Busca um médico específico
        /// </summary>
        /// <param name="idMedico">ID do médico</param>
        /// <returns>Objeto Medico que foi buscado</returns>
        Medico BuscarPorId(int idMedico);

        /// <summary>
        /// Busca um novo médico específico
        /// </summary>
        /// <param name="idMedico">ID do médico</param>
        void Deletar(int idMedico);

        /// <summary>
        /// Atualiza um médico específico
        /// </summary>
        /// <param name="idMedico">ID do médico</param>
        /// <param name="novoMedico">Objeto Medico com as novas informações</param>
        void Atualizar(int idMedico, Medico novoMedico);
    }
}
