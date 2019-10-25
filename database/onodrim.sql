-- CREATE DATABASE Onodrim;
-- DROP TABLE Usuario;

USE Onodrim;

CREATE TABLE Usuario (
    email varchar(100) NOT NULL,
	nome varchar(100) NOT NULL,
	senha varchar(100) NOT NULL,
	grau_permissao int(1) NOT NULL,
    CONSTRAINT pk_usuario PRIMARY KEY (email)
);

CREATE TABLE Tipo (
	nome_cientifico varchar(100) NOT NULL,
    nome_popular varchar(100) NOT NULL,
    fruto varchar(100),
    utilidade varchar(1000),
    CONSTRAINT pk_tipo PRIMARY KEY (nome_cientifico)
);

CREATE TABLE Localizacao (
	latitude float NOT NULL,
    longitude float NOT NULL,
    cep int(8),
    rua varchar(100),
    bairro varchar(100),
    cidade varchar(100),
    CONSTRAINT pk_localizacao PRIMARY KEY (latitude, longitude)
);

CREATE TABLE Arvore (
	id_arvore int auto_increment NOT NULL,
    nome_cientifico varchar(100) NOT NULL,
    latitude float NOT NULL,
    longitude float NOT NULL,
    altura float,
    largura float, 
    ano_plantio date,
    data_cadastro date NOT NULL,
    fotos varchar(200) NOT NULL,
    CONSTRAINT pk_arvore PRIMARY KEY (id_arvore),
    CONSTRAINT fk_tipo FOREIGN KEY (nome_cientifico) REFERENCES Tipo (nome_cientifico),
    CONSTRAINT fk_localizacao FOREIGN KEY (latitude, longitude) REFERENCES Localizacao (latitude, longitude)
);

CREATE TABLE Tombamento (
	id_arvore int NOT NULL,
	motivo varchar(1000),
    decreto varchar(20),
    CONSTRAINT fk_arvore FOREIGN KEY (id_arvore) REFERENCES Arvore (id_arvore)
);

INSERT INTO Usuario(email, nome, senha, grau_permissao) VALUES ('otavio.leite@unesp.br', 'Otávio Leite dos Santos', MD5('otavio123'), 3);

INSERT INTO Usuario(email, nome, senha, grau_permissao) VALUES ('leonardo.higuti@unesp.br', 'Leonardo Yudi Higuti', MD5('leo123'), 3);

