using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using spmedgroup.webAPI.Domains;
using spmedgroup.webAPI.Interfaces;
using spmedgroup.webAPI.Repositories;
using spmedgroup.webAPI.ViewModels;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace spmedgroup.webAPI.Controllers
{
    [Produces("application/json")]

    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IUsuarioRepository usuarioRepository { get; set; }

        public LoginController()
        {
            usuarioRepository = new UsuarioRepository();
        }

        [HttpPost]
        public IActionResult Entrar(LoginViewModel login)
        {
            try
            {
                Usuario usuarioBuscado = usuarioRepository.Login(login.email, login.senha);

                if (usuarioBuscado == null)
                {
                    return BadRequest("Usuário não encontrado.");
                }

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, usuarioBuscado.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, usuarioBuscado.IdUsuario.ToString()),
                    new Claim(ClaimTypes.Role, usuarioBuscado.IdTipoUsuario.ToString()),
                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("senai-SpMedicalGroup-chave-autenticacao"));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var TokenGerado = new JwtSecurityToken(
                    issuer: "spmedgroup.webAPI",
                    audience: "spmedgroup.webAPI",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(TokenGerado)
                });
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
