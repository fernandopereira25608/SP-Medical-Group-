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
    /// Repositório responsável pelas consultas
    /// </summary>
    public class ConsultaRepository : IConsultaRepository
    {
        SpMedGroupContext ctx = new SpMedGroupContext();
        public void Aprovacao(int idConsulta, string status)
        {
            Consultum consulta = BuscarPorId(idConsulta);

            switch (status)
            {
                case "1":
                    consulta.IdSituacao = 1;
                    break;
                case "2":
                    consulta.IdSituacao = 2;
                    break;
                case "3":
                    consulta.IdSituacao = 3;
                    break;
                default:
                    break;
            }

            ctx.Consulta.Update(consulta);
            ctx.SaveChanges();
        }

        public void Atualizar(int idConsulta, Consultum novaConsulta)
        {
            Consultum consulta = BuscarPorId(idConsulta);

            if (consulta != null)
            {
                consulta.ConsultaDesc = novaConsulta.ConsultaDesc;
                consulta.DataConsulta = novaConsulta.DataConsulta;
                consulta.IdMedico = novaConsulta.IdMedico;
                consulta.IdPaciente = novaConsulta.IdPaciente;
                consulta.IdSituacao = novaConsulta.IdSituacao;
            }
            ctx.Consulta.Update(consulta);
            ctx.SaveChanges();
        }

        public Consultum BuscarPorId(int idConsulta)
        {
            return ctx.Consulta
                .Include(x => x.IdMedicoNavigation)
                .Include(x => x.IdPacienteNavigation)
                .Include(x => x.IdSituacaoNavigation)
                .FirstOrDefault(x => x.IdConsulta == idConsulta);
        }

        public void Cadastrar(Consultum consulta)
        {
            ctx.Consulta.Add(consulta);
            ctx.SaveChanges();
        }

        public void Deletar(int idConsulta)
        {
            Consultum consulta = BuscarPorId(idConsulta);

            if (consulta != null)
            {
                ctx.Consulta.Remove(consulta);
                ctx.SaveChanges();
            }
        }

        public void InserirDesc(int idConsulta, string descricao)
        {
            Consultum consultaAlteracao = BuscarPorId(idConsulta);
            consultaAlteracao.ConsultaDesc = descricao;
            ctx.Consulta.Update(consultaAlteracao);
            ctx.SaveChanges();
        }

        public List<Consultum> ListarMinhas(int id)
        {
            Usuario usuario = ctx.Usuarios.FirstOrDefault(x => x.IdUsuario == id);

            switch (usuario.IdTipoUsuario)
            {
                case 1:
                    return null;

                case 2:
                    Paciente paciente = ctx.Pacientes.FirstOrDefault(x => x.IdUsuario == id);
                    List<Consultum> listaPaciente = ctx.Consulta
                        .Include(x => x.IdMedicoNavigation)
                        .Include(x => x.IdSituacaoNavigation)
                        .Where(x => x.IdPaciente == paciente.IdPaciente)
                        .ToList();
                    return listaPaciente;

                case 3:
                    Medico medico = ctx.Medicos.FirstOrDefault(x => x.IdUsuario == id);
                    List<Consultum> listaMedico = ctx.Consulta
                        .Include(x => x.IdPacienteNavigation)
                        .Include(x => x.IdSituacaoNavigation)
                        .Include(x => x.IdSituacaoNavigation)
                        .Where(x => x.IdMedicoNavigation.IdUsuario == id || x.IdPacienteNavigation.IdUsuario == id)
                        .ToList();
                    return listaMedico;

                default:
                    return null;
            }
        }

        public List<Consultum> ListarTodos()
        {
            return ctx.Consulta
                .Include(x => x.IdMedicoNavigation)
                .Include(x => x.IdPacienteNavigation)
                .Include(x => x.IdSituacaoNavigation)
                .ToList();
        }
    }
}
