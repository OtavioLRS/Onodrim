-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 22-Nov-2019 às 20:49
-- Versão do servidor: 10.4.6-MariaDB
-- versão do PHP: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `onodrim`
--

DELIMITER $$
--
-- Procedimentos
--
CREATE PROCEDURE `checaTipo` (`v_nome_cientifico` VARCHAR(100), `v_checado` INT(1))  BEGIN
  CASE v_checado 
   WHEN 0 THEN DELETE FROM Tipo WHERE nome_cientifico = v_nome_cientifico;
   WHEN 2 THEN UPDATE Tipo SET checado = 2, data_checagem = current_date() 
      WHERE nome_cientifico = v_nome_cientifico;
  END CASE;
END$$

CREATE PROCEDURE `getArvores` ()  BEGIN
	SELECT id_arvore, Arvore.id_tipo, nome_cientifico, nome_popular, Arvore.latitude, Arvore.longitude, 
		altura, largura, data_plantio, data_cadastro, 
		fotos, cep, rua, bairro, cidade 
    FROM Arvore INNER JOIN Localizacao INNER JOIN Tipo 
    ON Arvore.latitude=Localizacao.latitude 
    AND Arvore.longitude=Localizacao.longitude
    AND Arvore.id_tipo = Tipo.id_tipo
    ORDER BY Arvore.latitude ASC;
END$$

CREATE PROCEDURE `insertArvore` (`v_id_tipo` INT, `v_latitude` DOUBLE(18,15), `v_longitude` DOUBLE(18,15), `v_cep` INT(8), `v_rua` VARCHAR(100), `v_bairro` VARCHAR(100), `v_cidade` VARCHAR(100), `v_altura` FLOAT, `v_largura` FLOAT, `v_data_plantio` VARCHAR(10), `v_fotos` VARCHAR(1000))  BEGIN
	DECLARE EXIT HANDLER FOR SQLSTATE '23000' BEGIN
		SELECT 'Já existe uma árvore cadastrada neste local!' AS erro;
    END;
    INSERT INTO Localizacao(latitude, longitude, cep, rua, bairro, cidade) VALUES (v_latitude, v_longitude, v_cep, v_rua, v_bairro, v_cidade);
	INSERT INTO Arvore(id_tipo, latitude, longitude, altura, largura, data_plantio, data_cadastro, fotos) VALUES (v_id_tipo, v_latitude, v_longitude, v_altura, v_largura, v_data_plantio, current_date(), v_fotos);
END$$

CREATE PROCEDURE `insertTipo` (`v_nome_cientifico` VARCHAR(100), `v_nome_popular` VARCHAR(100), `v_fruto` VARCHAR(100), `v_utilidade` VARCHAR(1000), `v_usuario` VARCHAR(100))  BEGIN
  DECLARE real_nome_cientifico VARCHAR(100);
  SELECT nome_cientifico INTO real_nome_cientifico FROM Tipo WHERE nome_cientifico = v_nome_cientifico;
	IF (real_nome_cientifico IS NULL) THEN
			INSERT INTO Tipo(nome_cientifico, nome_popular, fruto, utilidade, usuario, data_sugestao, checado) 
				VALUES (v_nome_cientifico, v_nome_popular, v_fruto, v_utilidade, v_usuario, current_date(), 1);
		ELSE
			SELECT 'Esta espécie já foi cadastrada!' AS erro;
        END IF;
END$$

CREATE PROCEDURE `loginUser` (IN `v_email` VARCHAR(100), IN `v_senha` VARCHAR(100))  BEGIN
	DECLARE real_email, real_senha VARCHAR(100);
	SELECT email, senha INTO real_email, real_senha FROM Usuario WHERE email = v_email;
	IF (real_email IS NULL) THEN
		SELECT 'E-mail não cadastrado!' AS erro;
	ELSE IF (v_senha != real_senha) THEN
		SELECT 'Senha incorreta!' AS erro;
	 ELSE
		 SELECT * FROM Usuario WHERE email = v_email AND senha = v_senha;
	 END IF;
	END IF;
END$$

CREATE PROCEDURE `updateArvore` (`v_id_arvore` INT, `v_id_tipo` INT, `v_altura` FLOAT, `v_largura` FLOAT, `v_ano_plantio` DATE, `v_fotos` VARCHAR(1000))  BEGIN
	UPDATE Arvore SET id_tipo = v_id_tipo, altura = v_altura, largura = v_largura, ano_plantio = v_ano_plantio, fotos = v_fotos WHERE id_arvore = v_id_arvore;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `arvore`
--

CREATE TABLE `arvore` (
  `id_arvore` int(11) NOT NULL,
  `id_tipo` int(11) NOT NULL,
  `latitude` double(18,15) NOT NULL,
  `longitude` double(18,15) NOT NULL,
  `altura` float DEFAULT NULL,
  `largura` float DEFAULT NULL,
  `data_plantio` varchar(10) DEFAULT NULL,
  `data_cadastro` date NOT NULL,
  `fotos` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `localizacao`
--

CREATE TABLE `localizacao` (
  `latitude` double(18,15) NOT NULL,
  `longitude` double(18,15) NOT NULL,
  `cep` int(8) DEFAULT NULL,
  `rua` varchar(100) DEFAULT NULL,
  `bairro` varchar(100) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tipo`
--

CREATE TABLE `tipo` (
  `id_tipo` int(11) NOT NULL,
  `nome_cientifico` varchar(100) NOT NULL,
  `nome_popular` varchar(100) NOT NULL,
  `fruto` varchar(100) DEFAULT NULL,
  `utilidade` varchar(1000) DEFAULT NULL,
  `usuario` varchar(100) NOT NULL,
  `data_sugestao` date NOT NULL,
  `checado` int(1) NOT NULL,
  `data_checagem` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tipo`
--

INSERT INTO `tipo` (`id_tipo`, `nome_cientifico`, `nome_popular`, `fruto`, `utilidade`, `usuario`, `data_sugestao`, `checado`, `data_checagem`) VALUES
(5, 'Laranjus', 'Laranjeiro', 'Laranjo', 'Figurinhas e memes', 'otavio.leite@unesp.br', '2019-11-09', 2, '2019-11-09');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `email` varchar(100) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `grau_permissao` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`email`, `nome`, `senha`, `grau_permissao`) VALUES
('adm', 'adm', 'b09c600fddc573f117449b3723f23d64', 3),
('leonardo.higuti@unesp.br', 'Leonardo Yudi Higuti', '657b298b04e033810343842f993c9817', 3),
('otavio.leite@unesp.br', 'Otávio Leite dos Santos', 'fff37b8bf4af5f8c7a2e6473709018e7', 3);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `arvore`
--
ALTER TABLE `arvore`
  ADD PRIMARY KEY (`id_arvore`),
  ADD KEY `fk_tipo` (`id_tipo`),
  ADD KEY `fk_localizacao` (`latitude`,`longitude`);

--
-- Índices para tabela `localizacao`
--
ALTER TABLE `localizacao`
  ADD PRIMARY KEY (`latitude`,`longitude`);

--
-- Índices para tabela `tipo`
--
ALTER TABLE `tipo`
  ADD PRIMARY KEY (`id_tipo`),
  ADD KEY `fk_usuario` (`usuario`);

--
-- Índices para tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `arvore`
--
ALTER TABLE `arvore`
  MODIFY `id_arvore` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT de tabela `tipo`
--
ALTER TABLE `tipo`
  MODIFY `id_tipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `arvore`
--
ALTER TABLE `arvore`
  ADD CONSTRAINT `fk_localizacao` FOREIGN KEY (`latitude`,`longitude`) REFERENCES `localizacao` (`latitude`, `longitude`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_tipo` FOREIGN KEY (`id_tipo`) REFERENCES `tipo` (`id_tipo`) ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tipo`
--
ALTER TABLE `tipo`
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
