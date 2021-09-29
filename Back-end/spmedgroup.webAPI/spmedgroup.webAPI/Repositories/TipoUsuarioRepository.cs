using Microsoft.EntityFrameworkCore;
using spmedgroup.webAPI.Contexts;
using spmedgroup.webAPI.Domains;
using spmedgroup.webAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace spmedgroup.webAPI.Repositories
{
    /// <summary>
    /// Repositório responsável pelos tipos de usuário
    /// </summary>
    public class TipoUsuarioRepository : ITipoUsuarioRepository
    {
        SpMedGroupContext ctx = new SpMedGroupContext();
        public void Atualizar(int idTipoUsuario, TipoUsuario novoTipoUsuario)
        {
            TipoUsuario tipoUsuario = BuscarPorId(idTipoUsuario);

            if (tipoUsuario != null)
            {
                tipoUsuario.NomeTipoUsuario = novoTipoUsuario.NomeTipoUsuario;
            }
            ctx.TipoUsuarios.Update(tipoUsuario);
            ctx.SaveChanges();
        }

        public TipoUsuario BuscarPorId(int idTipoUsuario)
        {
            return ctx.TipoUsuarios.Include(x => x.Usuarios).FirstOrDefault(x => x.IdTipoUsuario == idTipoUsuario);
        }

        public void Cadastrar(TipoUsuario tipoUsuario)
        {
            ctx.TipoUsuarios.Add(tipoUsuario);
            ctx.SaveChanges();
        }

        public void Deletar(int idTipoUsuario)
        {
            TipoUsuario tipoUsuario = BuscarPorId(idTipoUsuario);

            if (tipoUsuario != null)
            {
                ctx.TipoUsuarios.Remove(tipoUsuario);
                ctx.SaveChanges();
            }
        }

        public List<TipoUsuario> ListarTodos()
        {
            return ctx.TipoUsuarios.Include(x => x.Usuarios).ToList();
        }
    }
}
