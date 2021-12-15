using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using spmedgroup.webAPI.Domains;
using spmedgroup.webAPI.Interfaces;
using spmedgroup.webAPI.Repositories;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace spmedgroup.webAPI.Controllers
{
    [Produces("application/json")]

    [Route("api/[controller]")]
    [ApiController]
    public class ConsultasController : ControllerBase
    {
        private IConsultaRepository consultaRepository { get; set; }

        public ConsultasController()
        {
            consultaRepository = new ConsultaRepository();
        }

        [Authorize(Roles = "2,3")]
        [HttpGet("minhas")]
        public IActionResult ListarMinhas()
        {
            try
            {
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(o => o.Type == JwtRegisteredClaimNames.Jti).Value);
                return Ok(consultaRepository.ListarMinhas(idUsuario));
            }
            catch (Exception error)
            {
                return BadRequest(new
                {
                    mensagem = "O usuário precisa estar logado para ver suas consultas.",
                    error
                });
            }
        }

        [Authorize(Roles = "1")]
        [HttpGet]
        public IActionResult ListarTodas()
        {
            return Ok(consultaRepository.ListarTodos());
        }

        [Authorize(Roles = "1")]
        [HttpGet("{id}")]
        public IActionResult BuscarPorId(int id)
        {
            Consultum consultaBuscada = consultaRepository.BuscarPorId(id);

            if (consultaBuscada != null)
            {
                return Ok(consultaBuscada);
            }

            return NotFound(new
            {
                mensagem = "A consulta não foi encontrada."
            });
        }

        [Authorize(Roles = "1")]
        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            Consultum consultaBuscada = consultaRepository.BuscarPorId(id);

            if (consultaBuscada != null)
            {
                consultaRepository.Deletar(id);
                return Ok();
            }

            return NotFound(new
            {
                mensagem = "A consulta não foi encontrada."
            });
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult Cadastrar(Consultum consulta)
        {
            if (consulta.IdMedico == 0 || consulta.IdPaciente == 0 || consulta.IdSituacao == 0)
            {
                return BadRequest(new
                {
                    mensagem = "Algumas informações não foram inseridas."
                });
            }

            consultaRepository.Cadastrar(consulta);
            return StatusCode(201);
        }

        [Authorize(Roles = "1")]
        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, Consultum consulta)
        {
            if (consulta.IdMedico == 0 || consulta.IdPaciente == 0 || consulta.IdSituacao == 0)
            {
                return BadRequest(new
                {
                    mensagem = "Algumas informações não foram inseridas."
                });
            }

            Consultum consultaBuscada = consultaRepository.BuscarPorId(id);

            try
            {
                consultaRepository.Atualizar(id, consulta);
                return Ok();
            }
            catch (Exception error)
            {
                return BadRequest(new
                {
                    mensagem = "A consulta indicada não foi encontrada.",
                    error
                });
            }
        }

        [Authorize(Roles = "1")]
        [HttpPatch("{id}")]
        public IActionResult Aprovacao(int id, Consultum status)
        {
            try
            {
                consultaRepository.Aprovacao(id, status.IdSituacao.ToString());
                return Ok();
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        [Authorize(Roles = "3")]
        [HttpPatch("descricao/{id}")]
        public IActionResult InserirDesc(int id, Consultum consulta)
        {
            try
            {
                consultaRepository.InserirDesc(id, consulta.ConsultaDesc);
                return Ok();
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }
    }
}
