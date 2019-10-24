-- CREATE DATABASE Onodrim;

-- DROP TABLE Usuario;

CREATE TABLE Usuario (
    email varchar(100) NOT NULL,
	nome varchar(100) NOT NULL,
	senha varchar(100) NOT NULL,
	grau_permissao int(1) NOT NULL,
    CONSTRAINT pk_email PRIMARY KEY (email)
);

INSERT INTO Usuario(email, nome, senha, grau_permissao) VALUES ('otavio.leite@unesp.br', 'Otávio Leite dos Santos', MD5('otavio123'), 3);

INSERT INTO Usuario(email, nome, senha, grau_permissao) VALUES ('leonardo.higuti@unesp.br', 'Leonardo Yudi Higuti', MD5('leo123'), 3);

