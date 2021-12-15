-- DDL

CREATE DATABASE Sp_Medical_Group
GO

USE Sp_Medical_Group
GO

CREATE TABLE tiposUsuarios(
	IdTiposUsuario INT PRIMARY KEY IDENTITY
	,TiposUsuario VARCHAR(20) UNIQUE NOT NULL
);
GO

CREATE TABLE usuarios(
	IdUsuario INT PRIMARY KEY IDENTITY
	,IdTiposUsuario INT FOREIGN KEY REFERENCES tiposUsuarios(IdTiposUsuario)
	,Senha VARCHAR(20) NOT NULL
	,Email VARCHAR(50) NOT NULL
);
GO

CREATE TABLE especialidades(
	IdEspecialidade INT PRIMARY KEY IDENTITY
	,Especialidade VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE clinicas(
	IdClinica INT PRIMARY KEY IDENTITY
	,CNPJ CHAR(18) UNIQUE NOT NULL
	,NomeFantasia VARCHAR(50) NOT NULL
	,RazaoSocial VARCHAR(50) NOT NULL
	,Endereco VARCHAR(150)
	,HorarioAbertura DATETIME NOT NULL
	,HorarioFechamento DATETIME NOT NULL
);
GO

CREATE TABLE medicos(
	IdMedico INT PRIMARY KEY IDENTITY
	,IdUsuario INT FOREIGN KEY REFERENCES usuarios(IdUsuario)
	,IdEspecialidade INT FOREIGN KEY REFERENCES especialidades(IdEspecialidade)
	,IdClinica INT FOREIGN KEY REFERENCES clinicas(IdClinica)
	,Nome VARCHAR(100) NOT NULL
	,Crm CHAR(8) UNIQUE NOT NULL
);
GO

CREATE TABLE pacientes(
	IdPaciente INT PRIMARY KEY IDENTITY
	,IdUsuario INT FOREIGN KEY REFERENCES usuarios(IdUsuario)
	,Nome VARCHAR(155) NOT NULL
	,DataNasc DATE NOT NULL
	,Telefone INT 
	,RG VARCHAR (15) UNIQUE
	,CPF VARCHAR (15) UNIQUE
	,Endereco VARCHAR (100)
);
GO

CREATE TABLE situacaoConsultas(
	IdSituacao INT PRIMARY KEY IDENTITY
	,Situacao VARCHAR(50) UNIQUE DEFAULT('Agendada')
);
GO

CREATE TABLE consultas(
	IdConsulta INT PRIMARY KEY IDENTITY
	,IdPaciente INT FOREIGN KEY REFERENCES pacientes(IdPaciente)
	,IdMedico INT FOREIGN KEY REFERENCES medicos(IdMedico)
	,IdSituacao INT FOREIGN KEY REFERENCES situacaoConsultas(IdSituacao) DEFAULT(1)
	,DataConsulta DATETIME NOT NULL
	,Descricao VARCHAR(255)
);
GO