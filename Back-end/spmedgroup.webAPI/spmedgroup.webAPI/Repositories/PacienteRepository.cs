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
    /// Repositório responsável pelos pacientes
    /// </summary>
    public class PacienteRepository : IPacienteRepository
    {
        SpMedGroupContext ctx = new SpMedGroupContext();
        public void Atualizar(int idPaciente, Paciente novoPaciente)
        {
            Paciente paciente = BuscarPorId(idPaciente);

            if (paciente != null)
            {
                paciente.CpfPaciente = novoPaciente.CpfPaciente;
                paciente.DataNascPaciente = novoPaciente.DataNascPaciente;
                paciente.EndPaciente = novoPaciente.EndPaciente;
                paciente.IdUsuario = novoPaciente.IdUsuario;
                paciente.NomePaciente = novoPaciente.NomePaciente;
                paciente.RgPaciente = novoPaciente.RgPaciente;
                paciente.TelPaciente = novoPaciente.TelPaciente;
            }
            ctx.Pacientes.Update(paciente);
            ctx.SaveChanges();
        }

        public Paciente BuscarPorId(int idPaciente)
        {
            return ctx.Pacientes.Include(x => x.IdUsuarioNavigation).Include(x => x.Consulta).FirstOrDefault(x => x.IdPaciente == idPaciente);
        }

        public void Cadastrar(Paciente paciente)
        {
            ctx.Pacientes.Add(paciente);
            ctx.SaveChanges();
        }

        public void Deletar(int idPaciente)
        {
            Paciente paciente = BuscarPorId(idPaciente);

            if (paciente != null)
            {
                ctx.Pacientes.Remove(paciente);
                ctx.SaveChanges();
            }
        }

        public List<Paciente> ListarTodos()
        {
            return ctx.Pacientes
                .Include(x => x.IdUsuarioNavigation)
                .Include(x => x.Consulta)
                .ToList();
        }
    }
}
