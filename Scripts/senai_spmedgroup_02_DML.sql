-- DML

USE Sp_Medical_Group
GO

INSERT INTO tiposUsuarios(TiposUsuario)
VALUES			('Administrador')
				,('Medico')
				,('Paciente');
GO

INSERT INTO usuarios(IdTiposUsuario, Email, Senha)
VALUES				 (1, 'fernando.strada@spmedicalgroup.com.br', '1234')
					,(2, 'ricardo.lemos@spmedicalgroup.com.br', '1234m')
					,(2, 'roberto.possarle@spmedicalgroup.com.br', '1234m')
					,(2, 'helena.souza@spmedicalgroup.com.br', '1234m')
					,(3, 'ligia@gmail.com', '1234p')
					,(3, 'alexandre@gmail.com', '1234p')
					,(3, 'fernando@gmail.com', '1234p')
					,(3, 'henrique@gmail.com', '1234p')
					,(3, 'joao@hotmail.com', '1234p')
					,(3, 'bruno@gmail.com', '1234p')
					,(3, 'mariana@outlook.com', '1234p');
GO

INSERT INTO especialidades(Especialidade)
VALUES				('Acupuntura')
					,('Anestesiologia')
					,('Angiologia')
					,('Cardiologia')
					,('Cirurgia Cardiovascular')
					,('Cirurgia da Mão')
					,('Cirurgia do Aparelho Digestivo')
					,('Cirurgia Geral')
					,('Cirurgia Pediátrica')
					,('Cirurgia Plástica')
					,('Cirurgia Torácica')
					,('Cirurgia Vascular')
					,('Dermatologia')
					,('Radioterapia')
					,('Urologia')
					,('Pediatria')
					,('Psiquiatria');
GO

INSERT INTO clinicas(CNPJ, NomeFantasia, RazaoSocial, Endereco, HorarioAbertura, HorarioFechamento)
VALUES				('86.400.902/0001-30', 'Clinica Possarle', 'SP Medical Group',	'Av. Barão Limeira, 532, São Paulo, SP', '07:00:00', '19:00:00');
GO

INSERT INTO medicos(IdUsuario, IdEspecialidade, IdClinica, Nome, Crm)
VALUES				(2, 2, 1, 'Ricardo Lemos', '54356-SP')
					,(3, 17, 1, 'Roberto Possarle', '53452-SP')
					,(4, 16, 1, 'Helena Strada', '65463-SP');
GO

INSERT INTO pacientes(IdUsuario, Nome, DataNasc, Telefone, RG, CPF, Endereco)
VALUES				(5,'Ligia',	'13/10/1983',34567654,	'43522543-5',	'94839859000',	'Rua Estado de Israel 240, São Paulo, Estado de São Paulo, 04022-000')
					,(6,'Alexandre',	'23/07/2001',987656543,	'32654345-7',	'73556944057',	'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200')
					,(7,'Fernando',	'10/10/1978',972084453,	'54636525-3',	'16839338002',	'Av. Ibirapuera - Indianópolis, 2927,  São Paulo - SP, 04029-200')
					,(8,'Henrique',	'13/10/1985',34566543,	'54366362-5',	'14332654765',	'R. Vitória, 120 - Vila Sao Jorge, Barueri - SP, 06402-030')
					,(9,'João',	'27/08/1975',76566377,	't32544444-1',	'91305348010',	'R. Ver. Geraldo de Camargo, 66 - Santa Luzia, Ribeirão Pires - SP, 09405-380')
					,(10,'Bruno',	'21/03/1972',954368769,	'54566266-7',	'79799299004',	'Alameda dos Arapanés, 945 - Indianópolis, São Paulo - SP, 04524-001')
					,(11,'Mariana',	'05/03/2018',NULL,'54566266-8',	'13771913039',	'R Sao Antonio, 232 - Vila Universal, Barueri - SP, 06407-140');
GO

INSERT INTO situacaoConsultas(Situacao)
VALUES				('Agendada')
					,('Realizada')
					,('Cancelada');
GO

INSERT INTO consultas(IdPaciente, IdMedico, IdSituacao, DataConsulta, Descricao)
VALUES					(7,	3,	2,	'20/01/2020 15:00', '')	
						,(2,	2,	3,	'06/01/2020 10:00', '')	
						,(3,	2,	2,	'07/02/2020 11:00', '')	
						,(2,	2,	2,	'06/02/2018 10:00', '')	
						,(4,	1,	3,	'07/02/2019 11:00', '')	
						,(7,	3,	1,	'08/03/2020 15:00', '')	
						,(4,	1,	1,	'09/03/2020 11:00', '');
GO