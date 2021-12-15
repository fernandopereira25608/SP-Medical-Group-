using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using spmedgroup.webAPI.Domains;
using spmedgroup.webAPI.Interfaces;
using spmedgroup.webAPI.Repositories;
using System;

namespace spmedgroup.webAPI.Controllers
{
    [Produces("application/json")]
    [Authorize(Roles = "1")]
    [Route("api/[controller]")]
    [ApiController]
    public class TiposUsuarioController : ControllerBase
    {
        private ITipoUsuarioRepository tipoUsuarioRepository { get; set; }

        public TiposUsuarioController()
        {
            tipoUsuarioRepository = new TipoUsuarioRepository();
        }

        [HttpPost]
        public IActionResult Cadastrar(TipoUsuario tipoUsuario)
        {
            if (tipoUsuario.NomeTipoUsuario == null)
            {
                return BadRequest(new
                {
                    mensagem = "Algumas informações não foram inseridas."
                });
            }

            tipoUsuarioRepository.Cadastrar(tipoUsuario);
            return StatusCode(201);
        }

        [HttpGet]
        public IActionResult ListarTodas()
        {
            return Ok(tipoUsuarioRepository.ListarTodos());
        }

        [HttpGet("{id}")]
        public IActionResult BuscarPorId(int id)
        {
            TipoUsuario tipoUsuarioBuscado = tipoUsuarioRepository.BuscarPorId(id);

            if (tipoUsuarioBuscado != null)
            {
                return Ok(tipoUsuarioBuscado);
            }

            return NotFound(new
            {
                mensagem = "O tipo de usuário buscado não foi encontrado."
            });
        }

        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, TipoUsuario tipoUsuario)
        {
            if (tipoUsuario.NomeTipoUsuario == null)
            {
                return BadRequest(new
                {
                    mensagem = "Algumas informações não foram inseridas."
                });
            }

            TipoUsuario tipoUsuarioBuscado = tipoUsuarioRepository.BuscarPorId(id);

            try
            {
                tipoUsuarioRepository.Atualizar(id, tipoUsuario);
                return Ok();
            }
            catch (Exception error)
            {
                return BadRequest(new
                {
                    mensagem = "O tipo de usuário indicado não foi encontrado.",
                    error
                });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            TipoUsuario tipoUsuarioBuscado = tipoUsuarioRepository.BuscarPorId(id);

            if (tipoUsuarioBuscado != null)
            {
                tipoUsuarioRepository.Deletar(id);
                return Ok();
            }

            return NotFound(new
            {
                mensagem = "O tipo de usuário não foi encontrado."
            });
        }
    }
}
