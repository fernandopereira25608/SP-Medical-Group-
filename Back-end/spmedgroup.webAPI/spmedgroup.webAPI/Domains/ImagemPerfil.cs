using System;
using System.Collections.Generic;

#nullable disable

namespace spmedgroup.webAPI.Domains
{
    public partial class ImagemPerfil
    {
        public int IdImagemPerfil { get; set; }
        public int IdUsuario { get; set; }
        public byte[] Binario { get; set; }
        public DateTime DataCriacao { get; set; }
        public string MimeType { get; set; }
        public string NomeArquivo { get; set; }

        public virtual Usuario IdUsuarioNavigation { get; set; }
    }
}
