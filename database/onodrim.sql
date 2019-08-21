CREATE DATABASE Onodrim;

CREATE TABLE Usuario (
	email_usuario varchar(30) NOT NULL,
	nome_usuario varchar(50) NOT NULL,
	senha_usuario varchar(50) NOT NULL,
	grau_permissao int(2) NOT NULL,
	CONSTRAINT pk_email PRIMARY KEY (email_usuario)
);