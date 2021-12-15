using System;
using System.Collections.Generic;

#nullable disable

namespace spmedgroup.webAPI.Domains
{
    public partial class Medico
    {
        public Medico()
        {
            Consulta = new HashSet<Consultum>();
        }

        public short IdMedico { get; set; }
        public int IdUsuario { get; set; }
        public short IdClinica { get; set; }
        public byte IdEspecialidade { get; set; }
        public string Crm { get; set; }
        public string NomeMedico { get; set; }

        public virtual Clinica IdClinicaNavigation { get; set; }
        public virtual Especialidade IdEspecialidadeNavigation { get; set; }
        public virtual Usuario IdUsuarioNavigation { get; set; }
        public virtual ICollection<Consultum> Consulta { get; set; }
    }
}
