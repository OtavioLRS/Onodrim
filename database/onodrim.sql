CREATE DATABASE Onodrim;

CREATE TABLE usuario (
	email varchar(100) NOT NULL,
	nome varchar(100) NOT NULL,
	senha varchar(100) NOT NULL,
	grau_permissao int(1) NOT NULL,
	CONSTRAINT pk_email PRIMARY KEY (email)
);

INSERT INTO Usuario VALUES ('leonardo.higuti@unesp.br', 'Leonardo Yudi Higuti', MD5('leo123'), 3);

INSERT INTO Usuario VALUES ('otavio.leite@unesp.br', 'Otávio Leite dos Santos', MD5('otavio123'), 3);