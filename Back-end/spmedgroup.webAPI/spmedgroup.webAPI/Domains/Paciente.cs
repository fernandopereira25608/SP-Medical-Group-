using System;
using System.Collections.Generic;

#nullable disable

namespace spmedgroup.webAPI.Domains
{
    public partial class Paciente
    {
        public Paciente()
        {
            Consulta = new HashSet<Consultum>();
        }

        public int IdPaciente { get; set; }
        public int IdUsuario { get; set; }
        public string NomePaciente { get; set; }
        public string RgPaciente { get; set; }
        public string CpfPaciente { get; set; }
        public string EndPaciente { get; set; }
        public DateTime DataNascPaciente { get; set; }
        public string TelPaciente { get; set; }

        public virtual Usuario IdUsuarioNavigation { get; set; }
        public virtual ICollection<Consultum> Consulta { get; set; }
    }
}
