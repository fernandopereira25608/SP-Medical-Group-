using spmedgroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace spmedgroup.webAPI.Interfaces
{
    /// <summary>
    /// Interface responsável pelo EspecialidadeRepository
    /// </summary>
    interface IEspecialidadeRepository
    {
        /// <summary>
        /// Cadastra uma nova especialidade
        /// </summary>
        /// <param name="especialidade">Objeto Especialidade a ser cadastrado</param>
        void Cadastrar(Especialidade especialidade);

        /// <summary>
        /// Lista todas as especialidades cadastrados
        /// </summary>
        /// <returns>Uma lista de clínicas</returns>
        List<Especialidade> ListarTodos();

        /// <summary>
        /// Busca uma especialidade em específico
        /// </summary>
        /// <param name="idEspecialidade">ID da especialidade</param>
        /// <returns>Objeto Especialidade que foi buscado</returns>
        Especialidade BuscarPorId(int idEspecialidade);

        /// <summary>
        /// Deleta uma especilidade em específico
        /// </summary>
        /// <param name="idEspecialidade">ID da especialidade</param>
        void Deletar(int idEspecialidade);

        /// <summary>
        /// Atualiza uma especialidade específica
        /// </summary>
        /// <param name="idEspecialidade">ID da especialidade</param>
        /// <param name="novaEspecialidade">Objeto Especialidade com as novas informações</param>
        void Atualizar(int idEspecialidade, Especialidade novaEspecialidade);
    }
}
