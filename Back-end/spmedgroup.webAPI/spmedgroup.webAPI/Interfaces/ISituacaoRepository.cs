using spmedgroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace spmedgroup.webAPI.Interfaces
{
    /// <summary>
    /// Interface responsável pelo SituacaoRepository
    /// </summary>
    interface ISituacaoRepository
    {
        /// <summary>
        /// Cadastra uma nova situação
        /// </summary>
        /// <param name="situacao">Objeto Situacao a ser cadastrado</param>
        void Cadastrar(Situacao situacao);

        /// <summary>
        /// Lista todas as situações cadastradas
        /// </summary>
        /// <returns>Uma lista de situações</returns>
        List<Situacao> ListarTodos();

        /// <summary>
        /// Busca uma situação específica
        /// </summary>
        /// <param name="idSituacao">ID da situação</param>
        /// <returns>Objeto Situacao que foi buscado</returns>
        Situacao BuscarPorId(int idSituacao);

        /// <summary>
        /// Deleta uma situação específica
        /// </summary>
        /// <param name="idSituacao">ID da situação a ser deletada</param>
        void Deletar(int idSituacao);

        /// <summary>
        /// Atualiza uma situação específica
        /// </summary>
        /// <param name="idSituacao">ID da situação</param>
        /// <param name="novaSituacao">Objeto Situacao com as novas informações</param>
        void Atualizar(int idSituacao, Situacao novaSituacao);
    }
}
