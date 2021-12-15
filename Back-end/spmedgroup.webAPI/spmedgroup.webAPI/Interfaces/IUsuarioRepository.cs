using Microsoft.AspNetCore.Http;
using spmedgroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace spmedgroup.webAPI.Interfaces
{
    /// <summary>
    /// Interface responsável pelo UsuarioRepository
    /// </summary>
    interface IUsuarioRepository
    {
        /// <summary>
        /// Cadastra um novo usuário
        /// </summary>
        /// <param name="usuario">Objeto Usuario que será cadastrado</param>
        void Cadastrar(Usuario usuario);

        /// <summary>
        /// Lista todos os usuários cadastrados
        /// </summary>
        /// <returns>Uma lista de usuários</returns>
        List<Usuario> ListarTodos();

        /// <summary>
        /// Busca um usuário em específico
        /// </summary>
        /// <param name="idUsuario">ID do usuário</param>
        /// <returns>Objeto Usuario que foi buscado</returns>
        Usuario BuscarPorId(int idUsuario);

        /// <summary>
        /// Deleta um usuário em específico
        /// </summary>
        /// <param name="idUsuario">ID do usuário a ser deletado</param>
        void Deletar(int idUsuario);

        /// <summary>
        /// Atualiza um usuário em específico
        /// </summary>
        /// <param name="idUsuario">ID do usuário</param>
        /// <param name="novoUsuario">Objeto Usuario com as novas informações</param>
        void Atualizar(int idUsuario, Usuario novoUsuario);

        /// <summary>
        /// Busca um usuário específico
        /// </summary>
        /// <param name="email">Email do usuário</param>
        /// <param name="senha">Senha do usuário</param>
        /// <returns>Objeto Usuario correspondente as credenciais informadas</returns>
        Usuario Login(string email, string senha);

        /// <summary>
        /// Cadastra uma imagem no banco
        /// </summary>
        /// <param name="foto">Arquivo da imagem</param>
        /// <param name="id">ID do usuário que postou a imagem</param>
        void SalvarPerfilBD(IFormFile foto, int id);

        /// <summary>
        /// Cadastra uma imagem pelo diretório
        /// </summary>
        /// <param name="foto">Arquivo da imagem</param>
        /// <param name="id">ID do usuário que postou a imagem</param>
        void SalvarPerfilDir(IFormFile foto, int id);

        /// <summary>
        /// Consulta uma imagem armazenada no banco de dados
        /// </summary>
        /// <param name="idUsuario">ID do usuário que postou a imagem</param>
        /// <returns>Imagem buscada em base64</returns>
        string ConsultarPerfilBD(int idUsuario);

        /// <summary>
        /// Consulta uma imagem armazenada no diretório
        /// </summary>
        /// <param name="idUsuario">ID do usuário que postou a imagem</param>
        /// <returns>Imagem buscada em base64</returns>
        string ConsultarPerfilDir(int idUsuario);
    }
}
