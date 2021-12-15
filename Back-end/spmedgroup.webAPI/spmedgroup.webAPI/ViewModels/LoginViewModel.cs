using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace spmedgroup.webAPI.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "O campo de email é obrigatório")]
        public string email { get; set; }

        [Required(ErrorMessage = "O campo senha é obrigatória")]
        public string senha { get; set; }
    }
}
