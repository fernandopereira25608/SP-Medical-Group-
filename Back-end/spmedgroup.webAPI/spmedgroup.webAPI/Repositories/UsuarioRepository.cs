using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using spmedgroup.webAPI.Contexts;
using spmedgroup.webAPI.Domains;
using spmedgroup.webAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace spmedgroup.webAPI.Repositories
{
    /// <summary>
    /// Repositório responsável pelos usuários
    /// </summary>
    public class UsuarioRepository : IUsuarioRepository
    {
        SpMedGroupContext ctx = new SpMedGroupContext();
        public void Atualizar(int idUsuario, Usuario novoUsuario)
        {
            Usuario usuario = BuscarPorId(idUsuario);

            if (usuario != null)
            {
                usuario.Email = novoUsuario.Email;
                usuario.IdTipoUsuario = novoUsuario.IdTipoUsuario;
                usuario.Senha = novoUsuario.Senha;
            }
            ctx.Usuarios.Update(usuario);
            ctx.SaveChanges();
        }

        public Usuario BuscarPorId(int idUsuario)
        {
            return ctx.Usuarios
                .Include(x => x.Medico)
                .Include(x => x.Paciente)
                .Include(x => x.IdTipoUsuarioNavigation)
                .Include(x => x.ImagemPerfil)
                .FirstOrDefault(x => x.IdUsuario == idUsuario);
        }

        public void Cadastrar(Usuario usuario)
        {
            ctx.Usuarios.Add(usuario);
            ctx.SaveChanges();
        }

        public string ConsultarPerfilBD(int idUsuario)
        {
            ImagemPerfil imagemPerfil = ctx.ImagemPerfils.FirstOrDefault(x => x.IdUsuario == idUsuario);

            if (imagemPerfil != null)
            {
                return Convert.ToBase64String(imagemPerfil.Binario);
            }

            return null;
        }

        public string ConsultarPerfilDir(int idUsuario)
        {
            string novoNome = idUsuario.ToString() + ".png";
            string caminho = Path.Combine("Perfil", novoNome);

            if (File.Exists(caminho))
            {
                byte[] bytesArquivo = File.ReadAllBytes(caminho);
                return Convert.ToBase64String(bytesArquivo);
            }
            return null;
        }

        public void Deletar(int idUsuario)
        {
            Usuario usuario = BuscarPorId(idUsuario);

            if (usuario != null)
            {
                ctx.Usuarios.Remove(usuario);
                ctx.SaveChanges();
            }
        }

        public List<Usuario> ListarTodos()
        {
            return ctx.Usuarios
                .Include(x => x.Medico)
                .Include(x => x.Paciente)
                .Include(x => x.IdTipoUsuarioNavigation)
                .Include(x => x.ImagemPerfil)
                .ToList();
        }

        public Usuario Login(string email, string senha)
        {
            return ctx.Usuarios
                .Include(x => x.Medico)
                .Include(x => x.Paciente)
                .Include(x => x.IdTipoUsuarioNavigation)
                .Include(x => x.ImagemPerfil)
                .FirstOrDefault(x => x.Email == email && x.Senha == senha);
        }

        public void SalvarPerfilBD(IFormFile foto, int id)
        {
            ImagemPerfil imagemPerfil = new ImagemPerfil();

            using (var ms = new MemoryStream())
            {
                foto.CopyTo(ms);
                imagemPerfil.NomeArquivo = foto.FileName;
                imagemPerfil.MimeType = foto.FileName.Split('.').Last();
                imagemPerfil.Binario = ms.ToArray();
                imagemPerfil.IdUsuario = id;
            }

            ImagemPerfil fotoexistente = new ImagemPerfil();
            fotoexistente = ctx.ImagemPerfils.FirstOrDefault(i => i.IdUsuario == id);

            if (fotoexistente != null)
            {
                fotoexistente.Binario = imagemPerfil.Binario;
                fotoexistente.NomeArquivo = imagemPerfil.NomeArquivo;
                fotoexistente.MimeType = imagemPerfil.MimeType;
                fotoexistente.IdUsuario = id;

                ctx.ImagemPerfils.Update(fotoexistente);
            }
            else
            {
                ctx.ImagemPerfils.Add(imagemPerfil);
            }

            ctx.SaveChanges();
        }

        public void SalvarPerfilDir(IFormFile foto, int id)
        {
            string nome_novo = id.ToString() + ".png";

            using (var stream = new FileStream(Path.Combine("perfil", nome_novo), FileMode.Create))
            {
                foto.CopyTo(stream);
            }
        }
    }
}
