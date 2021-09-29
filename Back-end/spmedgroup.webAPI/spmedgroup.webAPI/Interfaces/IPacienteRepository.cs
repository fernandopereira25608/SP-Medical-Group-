using spmedgroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace spmedgroup.webAPI.Interfaces
{
    /// <summary>
    /// Interface responsável pelo PacienteRepository
    /// </summary>
    interface IPacienteRepository
    {
        /// <summary>
        /// Cadastra um novo paciente
        /// </summary>
        /// <param name="paciente">Objeto Paciente a ser cadastrado</param>
        void Cadastrar(Paciente paciente);

        /// <summary>
        /// Lista todos os pacientes cadastrados
        /// </summary>
        /// <returns>Uma lista de pacientes</returns>
        List<Paciente> ListarTodos();

        /// <summary>
        /// Busca um paciente específico
        /// </summary>
        /// <param name="idPaciente">ID do paciente</param>
        /// <returns>Objeto Paciente que foi buscado</returns>
        Paciente BuscarPorId(int idPaciente);

        /// <summary>
        /// Busca um novo paciente específico
        /// </summary>
        /// <param name="idPaciente">ID do paciente</param>
        void Deletar(int idPaciente);

        /// <summary>
        /// Atualiza um paciente específico
        /// </summary>
        /// <param name="idPaciente">ID do paciente</param>
        /// <param name="novoPaciente">Objeto Paciente com as novas informações</param>
        void Atualizar(int idPaciente, Paciente novoPaciente);
    }
}
