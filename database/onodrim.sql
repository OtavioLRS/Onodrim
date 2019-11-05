-- CREATE DATABASE Onodrim;
-- DROP DATABASE Onodrim;

-- USE Onodrim;

CREATE TABLE Usuario (
    email VARCHAR(100) NOT NULL,
	nome VARCHAR(100) NOT NULL,
	senha VARCHAR(100) NOT NULL,
	grau_permissao INT(1) NOT NULL,
    CONSTRAINT pk_usuario PRIMARY KEY (email)
);

CREATE TABLE Tipo (
	id_tipo INT AUTO_INCREMENT NOT NULL,
	nome_cientifico VARCHAR(100) NOT NULL,
    nome_popular VARCHAR(100) NOT NULL,
    fruto VARCHAR(100),
    utilidade VARCHAR(1000),
    usuario VARCHAR(100) NOT NULL,
    data_sugestao DATE NOT NULL,
    checado INT(1) NOT NULL,
    data_checagem DATE,
    CONSTRAINT pk_tipo PRIMARY KEY (id_tipo),
    CONSTRAINT fk_usuario FOREIGN KEY (usuario) REFERENCES Usuario(email) ON UPDATE CASCADE
);

CREATE TABLE Localizacao (
	latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    cep INT(8),
    rua VARCHAR(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    CONSTRAINT pk_localizacao PRIMARY KEY (latitude, longitude)
);

CREATE TABLE Arvore (
	id_arvore INT AUTO_INCREMENT NOT NULL,
    id_tipo INT NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    altura FLOAT,
    largura FLOAT,
    ano_plantio DATE,
    data_cadastro DATE NOT NULL,
    fotos VARCHAR(1000),
    CONSTRAINT pk_arvore PRIMARY KEY (id_arvore),
    CONSTRAINT fk_tipo FOREIGN KEY (id_tipo) REFERENCES Tipo (id_tipo) ON UPDATE CASCADE,
    CONSTRAINT fk_localizacao FOREIGN KEY (latitude, longitude) REFERENCES Localizacao (latitude, longitude) ON UPDATE CASCADE
);

CREATE TABLE Tombamento (
	id_arvore INT NOT NULL,
	motivo VARCHAR(1000),
    decreto VARCHAR(20),
    CONSTRAINT fk_arvore FOREIGN KEY (id_arvore) REFERENCES Arvore (id_arvore) ON UPDATE CASCADE
);

INSERT INTO Usuario(email, nome, senha, grau_permissao) VALUES ('otavio.leite@unesp.br', 'Otávio Leite dos Santos', MD5('otavio123'), 3);

INSERT INTO Usuario(email, nome, senha, grau_permissao) VALUES ('leonardo.higuti@unesp.br', 'Leonardo Yudi Higuti', MD5('leo123'), 3);