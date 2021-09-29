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
    public class ClinicasController : ControllerBase
    {
        private IClinicaRepository clinicaRepository { get; set; }

        public ClinicasController()
        {
            clinicaRepository = new ClinicaRepository();
        }

        [HttpPost]
        public IActionResult Cadastrar(Clinica clinica)
        {
            if (clinica.Cnpj == null || clinica.EndClinica == null || clinica.NomeFantasia == null || clinica.RazaoSocial == null)
            {
                return BadRequest(new
                {
                    mensagem = "Algumas informações não foram inseridas."
                });
            }

            clinicaRepository.Cadastrar(clinica);
            return StatusCode(201);
        }

        [HttpGet]
        public IActionResult ListarTodas()
        {
            return Ok(clinicaRepository.ListarTodos());
        }

        [HttpGet("{id}")]
        public IActionResult BuscarPorId(int id)
        {
            Clinica clinicaBuscada = clinicaRepository.BuscarPorId(id);

            if (clinicaBuscada != null)
            {
                return Ok(clinicaBuscada);
            }

            return NotFound(new
            {
                mensagem = "A clínica não foi encontrada."
            });
        }

        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, Clinica clinica)
        {
            if (clinica.Cnpj == null || clinica.EndClinica == null || clinica.NomeFantasia == null || clinica.RazaoSocial == null)
            {
                return BadRequest(new
                {
                    mensagem = "Algumas informações não foram inseridas."
                });
            }

            Clinica clinicaBuscada = clinicaRepository.BuscarPorId(id);

            try
            {
                clinicaRepository.Atualizar(id, clinica);
                return Ok();
            }
            catch (Exception error)
            {
                return BadRequest(new
                {
                    mensagem = "A clínica indicada não foi encontrada.",
                    error
                });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            Clinica clinicaBuscada = clinicaRepository.BuscarPorId(id);

            if (clinicaBuscada != null)
            {
                clinicaRepository.Deletar(id);
                return Ok();
            }

            return NotFound(new
            {
                mensagem = "A clínica não foi encontrada."
            });
        }
    }
}
