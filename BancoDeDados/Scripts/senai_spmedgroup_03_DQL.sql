-- DQL

USE Sp_Medical_Group
GO

-- Função que calcula a quantidade de médicos dado certa especialidade.
CREATE FUNCTION CalcularMedicos(
	@NomeEspecialidade VARCHAR(50)
)
RETURNS INT
	AS
		BEGIN
			DECLARE @QuantMedicos AS INT
			SET @QuantMedicos = (SELECT COUNT(medicos.Nome)
			FROM medicos
			INNER JOIN especialidades
			ON especialidades.IdEspecialidade = medicos.IdEspecialidade
			WHERE especialidades.Especialidade = @NomeEspecialidade)
			RETURN @QuantMedicos
		END
GO
SELECT NumeroMedicos = dbo.CalcularMedicos('Anestesiologia')

-- Select simples que mostra a idade de todos os pacientes.
SELECT pacientes.Nome, pacientes.DataNasc, DATEDIFF(YEAR, pacientes.DataNasc, GETDATE())
AS IdadeAtual FROM pacientes;
GO

-- Stored procedure que calcula e mostra a idade dado o nome do paciente.
CREATE PROCEDURE CalcularIdade @NomePaciente VARCHAR(50)
	AS
	SELECT pacientes.Nome, pacientes.DataNasc, DATEDIFF(YEAR, pacientes.DataNasc, GETDATE())
	AS IdadeAtual FROM pacientes WHERE Nome = @NomePaciente
EXEC CalcularIdade @NomePaciente = 'Alexandre'

-- Selects universais.
SELECT * FROM tiposUsuarios
SELECT * FROM usuarios
SELECT * FROM especialidades
SELECT * FROM clinicas
SELECT * FROM medicos
SELECT * FROM pacientes
SELECT * FROM situacaoConsultas
SELECT * FROM consultas

-- Select mostrando todas as informações dos usuários.
SELECT tiposUsuarios.TiposUsuario, usuarios.Email, usuarios.Senha FROM usuarios
INNER JOIN tiposUsuarios 
ON usuarios.IdTiposUsuario = tiposUsuarios.IdTiposUsuario

-- Select mostrando todas as informações dos médicos.
SELECT usuarios.Email, especialidades.Especialidade, clinicas.NomeFantasia, medicos.Nome, medicos.Crm FROM medicos
INNER JOIN clinicas
ON clinicas.IdClinica = medicos.IdClinica
INNER JOIN especialidades
ON especialidades.IdEspecialidade = medicos.IdEspecialidade
INNER JOIN usuarios
ON usuarios.IdUsuario = medicos.IdUsuario

-- Select mostrando todas as informações dos pacientes.
SELECT usuarios.Email, pacientes.Nome, pacientes.DataNasc, pacientes.Telefone, pacientes.RG, pacientes.CPF, pacientes.Endereco FROM pacientes
INNER JOIN usuarios 
ON usuarios.IdUsuario = pacientes.IdUsuario

-- Select mostrando todas as informações das consultas.
SELECT pacientes.Nome, medicos.Nome, situacaoConsultas.Situacao, consultas.DataConsulta, consultas.Descricao FROM consultas
INNER JOIN situacaoConsultas 
ON situacaoConsultas.IdSituacao = consultas.IdSituacao
INNER JOIN medicos
ON medicos.IdMedico = consultas.IdMedico
INNER JOIN pacientes
ON pacientes.IdPaciente = consultas.IdPaciente