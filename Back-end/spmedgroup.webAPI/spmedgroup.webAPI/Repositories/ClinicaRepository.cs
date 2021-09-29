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
    /// Repositório responsável pelas clínicas
    /// </summary>
    public class ClinicaRepository : IClinicaRepository
    {
        SpMedGroupContext ctx = new SpMedGroupContext();
        public void Atualizar(int idClinica, Clinica novaClinica)
        {
            Clinica clinica = BuscarPorId(idClinica);

            if (clinica != null)
            {
                clinica.Cnpj = novaClinica.Cnpj;
                clinica.EndClinica = novaClinica.EndClinica;
                clinica.HoraAbertura = novaClinica.HoraAbertura;
                clinica.HoraFechamento = novaClinica.HoraFechamento;
                clinica.NomeFantasia = novaClinica.NomeFantasia;
                clinica.RazaoSocial = clinica.RazaoSocial;
            }
            ctx.Clinicas.Update(clinica);
            ctx.SaveChanges();
        }

        public Clinica BuscarPorId(int idClinica)
        {
            return ctx.Clinicas.Include(x => x.Medicos).FirstOrDefault(x => x.IdClinica == idClinica);
        }

        public void Cadastrar(Clinica clinica)
        {
            ctx.Clinicas.Add(clinica);
            ctx.SaveChanges();
        }

        public void Deletar(int idClinica)
        {
            Clinica clinica = BuscarPorId(idClinica);

            if (clinica != null)
            {
                ctx.Clinicas.Remove(clinica);
                ctx.SaveChanges();
            }
        }

        public List<Clinica> ListarTodos()
        {
            return ctx.Clinicas.Include(x => x.Medicos).ToList();
        }
    }
}
