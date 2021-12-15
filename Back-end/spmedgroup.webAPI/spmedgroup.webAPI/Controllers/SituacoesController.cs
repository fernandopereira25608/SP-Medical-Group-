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
    public class SituacoesController : ControllerBase
    {
        private ISituacaoRepository situacaoRepository { get; set; }

        public SituacoesController()
        {
            situacaoRepository = new SituacaoRepository();
        }

        [HttpPost]
        public IActionResult Cadastrar(Situacao situacao)
        {
            if (situacao.SituacaoDesc == null)
            {
                return BadRequest(new
                {
                    mensagem = "Algumas informações não foram inseridas."
                });
            }

            situacaoRepository.Cadastrar(situacao);
            return StatusCode(201);
        }

        [HttpGet]
        public IActionResult ListarTodas()
        {
            return Ok(situacaoRepository.ListarTodos());
        }

        [HttpGet("{id}")]
        public IActionResult BuscarPorId(int id)
        {
            Situacao situacaoBuscada = situacaoRepository.BuscarPorId(id);

            if (situacaoBuscada != null)
            {
                return Ok(situacaoBuscada);
            }

            return NotFound(new
            {
                mensagem = "A situação buscada não foi encontrada."
            });
        }

        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, Situacao situacao)
        {
            if (situacao.SituacaoDesc == null)
            {
                return BadRequest(new
                {
                    mensagem = "Algumas informações não foram inseridas."
                });
            }

            Situacao situacaoBuscada = situacaoRepository.BuscarPorId(id);

            try
            {
                situacaoRepository.Atualizar(id, situacao);
                return Ok();
            }
            catch (Exception error)
            {
                return BadRequest(new
                {
                    mensagem = "A situação indicada não foi encontrada.",
                    error
                });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            Situacao situacaoBuscada = situacaoRepository.BuscarPorId(id);

            if (situacaoBuscada != null)
            {
                situacaoRepository.Deletar(id);
                return Ok();
            }

            return NotFound(new
            {
                mensagem = "A situação não foi encontrada."
            });
        }
    }
}
