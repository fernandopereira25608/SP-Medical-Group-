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
    /// Repositório responsável pelos médicos
    /// </summary>
    public class MedicoRepository : IMedicoRepository
    {
        SpMedGroupContext ctx = new SpMedGroupContext();

        public void Atualizar(int idMedico, Medico novoMedico)
        {
            Medico medico = BuscarPorId(idMedico);

            if(medico != null)
            {
                medico.Crm = novoMedico.Crm;
                medico.IdClinica = novoMedico.IdClinica;
                medico.IdEspecialidade = novoMedico.IdEspecialidade;
                medico.IdUsuario = novoMedico.IdUsuario;
                medico.NomeMedico = novoMedico.NomeMedico;
            }
            ctx.Medicos.Update(medico);
            ctx.SaveChanges();
        }

        public Medico BuscarPorId(int idMedico)
        {
            return ctx.Medicos
                .Include(x => x.Consulta)
                .Include(x => x.IdClinicaNavigation)
                .Include(x => x.IdEspecialidadeNavigation)
                .Include(x => x.IdUsuarioNavigation)
                .FirstOrDefault(x => x.IdMedico == idMedico);
        }

        public void Cadastrar(Medico medico)
        {
            ctx.Medicos.Add(medico);
            ctx.SaveChanges();
        }

        public void Deletar(int idMedico)
        {
            Medico medico = BuscarPorId(idMedico);

            if (medico != null)
            {
                ctx.Medicos.Remove(medico);
                ctx.SaveChanges();
            }
        }

        public List<Medico> ListarTodos()
        {
            return ctx.Medicos
                .Include(x => x.Consulta)
                .Include(x => x.IdClinicaNavigation)
                .Include(x => x.IdEspecialidadeNavigation)
                .Include(x => x.IdUsuarioNavigation)
                .ToList();
        }
    }
}
