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
    public class PacientesController : ControllerBase
    {
        private IPacienteRepository pacienteRepository { get; set; }

        public PacientesController()
        {
            pacienteRepository = new PacienteRepository();
        }

        [HttpPost]
        public IActionResult Cadastrar(Paciente paciente)
        {
            if (paciente.CpfPaciente == null || paciente.EndPaciente == null || paciente.IdUsuario == 0 || paciente.NomePaciente == null || paciente.RgPaciente == null)
            {
                return BadRequest(new
                {
                    mensagem = "Algumas informações não foram inseridas."
                });
            }

            pacienteRepository.Cadastrar(paciente);
            return StatusCode(201);
        }

        [HttpGet]
        public IActionResult ListarTodas()
        {
            return Ok(pacienteRepository.ListarTodos());
        }

        [HttpGet("{id}")]
        public IActionResult BuscarPorId(int id)
        {
            Paciente pacienteBuscado = pacienteRepository.BuscarPorId(id);

            if (pacienteBuscado != null)
            {
                return Ok(pacienteBuscado);
            }

            return NotFound(new
            {
                mensagem = "O paciente não foi encontrado."
            });
        }

        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, Paciente paciente)
        {
            if (paciente.CpfPaciente == null || paciente.EndPaciente == null || paciente.IdUsuario == 0 || paciente.NomePaciente == null || paciente.RgPaciente == null)
            {
                return BadRequest(new
                {
                    mensagem = "Algumas informações não foram inseridas."
                });
            }

            Paciente pacienteBuscado = pacienteRepository.BuscarPorId(id);

            try
            {
                pacienteRepository.Atualizar(id, paciente);
                return Ok();
            }
            catch (Exception error)
            {
                return BadRequest(new
                {
                    mensagem = "O paciente indicado não foi encontrado.",
                    error
                });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            Paciente pacienteBuscado = pacienteRepository.BuscarPorId(id);

            if (pacienteBuscado != null)
            {
                pacienteRepository.Deletar(id);
                return Ok();
            }

            return NotFound(new
            {
                mensagem = "O paciente não foi encontrado."
            });
        }
    }
}
