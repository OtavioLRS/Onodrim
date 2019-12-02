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
    CONSTRAINT fk_usuario FOREIGN KEY (usuario) REFERENCES Usuario(email)
);

CREATE TABLE Localizacao (
	latitude DOUBLE(18,15) NOT NULL,
    longitude DOUBLE(18,15) NOT NULL,
    cep INT(8),
    rua VARCHAR(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    CONSTRAINT pk_localizacao PRIMARY KEY (latitude, longitude)
);

CREATE TABLE Arvore (
	id_arvore INT AUTO_INCREMENT NOT NULL,
    id_tipo INT NOT NULL,
    latitude DOUBLE(18,15) NOT NULL,
    longitude DOUBLE(18,15) NOT NULL,
    altura FLOAT,
    largura FLOAT,
    data_plantio VARCHAR(10),
    data_cadastro DATE NOT NULL,
    fotos VARCHAR(1000),
    CONSTRAINT pk_arvore PRIMARY KEY (id_arvore),
    CONSTRAINT fk_tipo FOREIGN KEY (id_tipo) REFERENCES Tipo (id_tipo) ON UPDATE CASCADE,
    CONSTRAINT fk_localizacao FOREIGN KEY (latitude, longitude) REFERENCES Localizacao (latitude, longitude) ON DELETE CASCADE
);

INSERT INTO `Usuario` (`email`, `nome`, `senha`, `grau_permissao`) VALUES
('adm', 'adm', 'b09c600fddc573f117449b3723f23d64', 3),
('leonardo.higuti@unesp.br', 'Leonardo Yudi Higuti', '657b298b04e033810343842f993c9817', 3),
('otavio.leite@unesp.br', 'Otávio Leite dos Santos', 'fff37b8bf4af5f8c7a2e6473709018e7', 3);