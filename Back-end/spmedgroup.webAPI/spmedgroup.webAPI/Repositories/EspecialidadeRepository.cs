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
    /// Repositório responsável pelas especialidades
    /// </summary>
    public class EspecialidadeRepository : IEspecialidadeRepository
    {
        SpMedGroupContext ctx = new SpMedGroupContext();
        public void Atualizar(int idEspecialidade, Especialidade novaEspecialidade)
        {
            Especialidade especialidade = BuscarPorId(idEspecialidade);

            if (especialidade != null)
            {
                especialidade.NomeEspecialidade = novaEspecialidade.NomeEspecialidade;
            }
            ctx.Especialidades.Update(especialidade);
            ctx.SaveChanges();
        }

        public Especialidade BuscarPorId(int idEspecialidade)
        {
            return ctx.Especialidades.Include(x => x.Medicos).FirstOrDefault(x => x.IdEspecialidade == idEspecialidade);
        }

        public void Cadastrar(Especialidade especialidade)
        {
            ctx.Especialidades.Add(especialidade);
            ctx.SaveChanges();
        }

        public void Deletar(int idEspecialidade)
        {
            Especialidade especialidade = BuscarPorId(idEspecialidade);

            if (especialidade != null)
            {
                ctx.Especialidades.Remove(especialidade);
                ctx.SaveChanges();
            }
        }

        public List<Especialidade> ListarTodos()
        {
            return ctx.Especialidades.Include(x => x.Medicos).ToList();
        }
    }
}
