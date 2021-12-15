using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace spmedgroup.webAPI.Domains
{
    public partial class Consultum
    {
        public int IdConsulta { get; set; }
        public int IdPaciente { get; set; }

        [Required(ErrorMessage = "O médico é obrigatório para cadastrar uma consulta")]
        public short IdMedico { get; set; }
        public byte IdSituacao { get; set; }
        public string ConsultaDesc { get; set; }
       
        [Required(ErrorMessage = "O médico é obrigatório para cadastrar uma consulta")]
        public DateTime DataConsulta { get; set; }

        public virtual Medico IdMedicoNavigation { get; set; }
        public virtual Paciente IdPacienteNavigation { get; set; }
        public virtual Situacao IdSituacaoNavigation { get; set; }
    }
}
