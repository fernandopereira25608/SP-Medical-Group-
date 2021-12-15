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
    public class EspecialidadesController : ControllerBase
    {
        private IEspecialidadeRepository especialidadeRepository { get; set; }

        public EspecialidadesController()
        {
            especialidadeRepository = new EspecialidadeRepository();
        }

        [HttpPost]
        public IActionResult Cadastrar(Especialidade especialidade)
        {
            if (especialidade.NomeEspecialidade == null)
            {
                return BadRequest(new
                {
                    mensagem = "Algumas informações não foram inseridas."
                });
            }

            especialidadeRepository.Cadastrar(especialidade);
            return StatusCode(201);
        }

        [HttpGet]
        public IActionResult ListarTodas()
        {
            return Ok(especialidadeRepository.ListarTodos());
        }

        [HttpGet("{id}")]
        public IActionResult BuscarPorId(int id)
        {
            Especialidade especialidadeBuscada = especialidadeRepository.BuscarPorId(id);

            if (especialidadeBuscada != null)
            {
                return Ok(especialidadeBuscada);
            }

            return NotFound(new
            {
                mensagem = "A especialidade não foi encontrada."
            });
        }

        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, Especialidade especialidade)
        {
            if (especialidade.NomeEspecialidade == null)
            {
                return BadRequest(new
                {
                    mensagem = "Algumas informações não foram inseridas."
                });
            }

            Especialidade especialidadeBuscada = especialidadeRepository.BuscarPorId(id);

            try
            {
                especialidadeRepository.Atualizar(id, especialidade);
                return Ok();
            }
            catch (Exception error)
            {
                return BadRequest(new
                {
                    mensagem = "A especialidade indicada não foi encontrada.",
                    error
                });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            Especialidade especialidadeBuscada = especialidadeRepository.BuscarPorId(id);

            if (especialidadeBuscada != null)
            {
                especialidadeRepository.Deletar(id);
                return Ok();
            }

            return NotFound(new
            {
                mensagem = "A especialidade não foi encontrada."
            });
        }
    }
}
