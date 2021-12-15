using spmedgroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace spmedgroup.webAPI.Interfaces
{
    /// <summary>
    /// Interface responsável pelo TipoUsuarioRepository
    /// </summary>
    interface ITipoUsuarioRepository
    {
        /// <summary>
        /// Cadastra um novo tipo de usuário
        /// </summary>
        /// <param name="tipoUsuario">Objeto TipoUsuário que será cadastrado</param>
        void Cadastrar(TipoUsuario tipoUsuario);

        /// <summary>
        /// Lista todos os tipos de usuário cadastrados
        /// </summary>
        /// <returns>Uma lista de tipos de usuário</returns>
        List<TipoUsuario> ListarTodos();

        /// <summary>
        /// Busca um tipo de usuaário em específico
        /// </summary>
        /// <param name="idTipoUsuario">ID do usuário</param>
        /// <returns>Objeto TipoUsuario que foi buscado</returns>
        TipoUsuario BuscarPorId(int idTipoUsuario);

        /// <summary>
        /// Deleta um tipo de usuário específico
        /// </summary>
        /// <param name="idTipoUsuario">ID do tipo de usuário a ser deletado</param>
        void Deletar(int idTipoUsuario);

        /// <summary>
        /// Atualiza um tipo de usuário específico
        /// </summary>
        /// <param name="idTipoUsuario">ID do tipo de usuário a ser cadastrado</param>
        /// <param name="novoTipoUsuario">Objeto TipoUsuario  com as novas informações</param>
        void Atualizar(int idTipoUsuario, TipoUsuario novoTipoUsuario);
    }
}
