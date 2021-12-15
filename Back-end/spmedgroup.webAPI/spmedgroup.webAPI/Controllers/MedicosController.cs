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
    public class MedicosController : ControllerBase
    {
        private IMedicoRepository medicoRepository { get; set; }

        public MedicosController()
        {
            medicoRepository = new MedicoRepository();
        }

        [HttpPost]
        public IActionResult Cadastrar(Medico medico)
        {
            if (medico.Crm == null || medico.IdClinica == 0 || medico.IdEspecialidade == 0 || medico.IdUsuario == 0 || medico.NomeMedico == null)
            {
                return BadRequest(new
                {
                    mensagem = "Algumas informações não foram inseridas."
                });
            }

            medicoRepository.Cadastrar(medico);
            return StatusCode(201);
        }

        [HttpGet]
        public IActionResult ListarTodas()
        {
            return Ok(medicoRepository.ListarTodos());
        }

        [HttpGet("{id}")]
        public IActionResult BuscarPorId(int id)
        {
            Medico medicoBuscado = medicoRepository.BuscarPorId(id);

            if (medicoBuscado != null)
            {
                return Ok(medicoBuscado);
            }

            return NotFound(new
            {
                mensagem = "O médico não foi encontrado."
            });
        }

        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, Medico medico)
        {
            if (medico.Crm == null || medico.IdClinica == 0 || medico.IdEspecialidade == 0 || medico.IdUsuario == 0 || medico.NomeMedico == null)
            {
                return BadRequest(new
                {
                    mensagem = "Algumas informações não foram inseridas."
                });
            }

            Medico medicoBuscado = medicoRepository.BuscarPorId(id);

            try
            {
                medicoRepository.Atualizar(id, medico);
                return Ok();
            }
            catch (Exception error)
            {
                return BadRequest(new
                {
                    mensagem = "O médico indicado não foi encontrado.",
                    error
                });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            Medico medicoBuscado = medicoRepository.BuscarPorId(id);

            if (medicoBuscado != null)
            {
                medicoRepository.Deletar(id);
                return Ok();
            }

            return NotFound(new
            {
                mensagem = "O médico não foi encontrado."
            });
        }
    }
}
