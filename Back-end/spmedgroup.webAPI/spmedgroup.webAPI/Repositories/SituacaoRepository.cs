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
    /// Repositório responsável pelas situações
    /// </summary>
    public class SituacaoRepository : ISituacaoRepository
    {
        SpMedGroupContext ctx = new SpMedGroupContext();
        public void Atualizar(int idSituacao, Situacao novaSituacao)
        {
            Situacao situacao = BuscarPorId(idSituacao);

            if (situacao != null)
            {
                situacao.SituacaoDesc = novaSituacao.SituacaoDesc;
            }

            ctx.Situacaos.Update(situacao);
            ctx.SaveChanges();
        }

        public Situacao BuscarPorId(int idSituacao)
        {
            return ctx.Situacaos.Include(x => x.Consulta).FirstOrDefault(x => x.IdSituacao == idSituacao);
        }

        public void Cadastrar(Situacao situacao)
        {
            ctx.Situacaos.Add(situacao);
            ctx.SaveChanges();
        }

        public void Deletar(int idSituacao)
        {
            Situacao situacao = BuscarPorId(idSituacao);

            if (situacao != null)
            {
                ctx.Situacaos.Remove(situacao);
                ctx.SaveChanges();
            }
        }

        public List<Situacao> ListarTodos()
        {
            return ctx.Situacaos.Include(x => x.Consulta).ToList();
        }
    }
}
