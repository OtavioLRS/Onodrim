DELIMITER //

DROP PROCEDURE if exists insertUser//
CREATE PROCEDURE insertUser(v_nome VARCHAR(100), v_email VARCHAR(100), v_senha VARCHAR(100), permissao INT)
BEGIN
    DECLARE EXIT HANDLER FOR SQLSTATE '23000'
    BEGIN
        SELECT 'O e-mail inserido já é cadastrado!' AS erro;
	END;
	INSERT INTO Usuario(nome, email, senha, grau_permissao) VALUES (v_nome, v_email, MD5(v_senha), permissao);
    SELECT * FROM Usuario WHERE email = v_email;
END//

DROP PROCEDURE if exists loginUser//
CREATE PROCEDURE loginUser(IN v_email VARCHAR(100), IN v_senha VARCHAR(100))
BEGIN
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
END//

DROP PROCEDURE if exists insertTipo//
CREATE PROCEDURE insertTipo(v_nome_cientifico VARCHAR(100), v_nome_popular VARCHAR(100), v_fruto VARCHAR(100), v_utilidade VARCHAR(1000), v_usuario VARCHAR(100))
BEGIN
  DECLARE real_nome_cientifico VARCHAR(100);
  SELECT nome_cientifico INTO real_nome_cientifico FROM Tipo WHERE nome_cientifico = v_nome_cientifico;
	IF (real_nome_cientifico IS NULL) THEN
			INSERT INTO Tipo(nome_cientifico, nome_popular, fruto, utilidade, usuario, data_sugestao, checado) 
				VALUES (v_nome_cientifico, v_nome_popular, v_fruto, v_utilidade, v_usuario, current_date(), 1);
		ELSE
			SELECT 'Esta espécie já foi cadastrada!' AS erro;
        END IF;
END//

DROP PROCEDURE IF EXISTS checaTipo//
CREATE PROCEDURE checaTipo(v_nome_cientifico VARCHAR(100), v_checado INT(1))
BEGIN
  CASE v_checado 
   WHEN 0 THEN DELETE FROM Tipo WHERE nome_cientifico = v_nome_cientifico;
   WHEN 2 THEN UPDATE Tipo SET checado = 2, data_checagem = current_date() 
      WHERE nome_cientifico = v_nome_cientifico;
  END CASE;
END//

DROP PROCEDURE if exists insertArvore//
CREATE PROCEDURE insertArvore(v_id_tipo INT, v_latitude DOUBLE(18,15), v_longitude DOUBLE(18,15), v_cep INT(8), v_rua VARCHAR(100), v_bairro VARCHAR(100), v_cidade VARCHAR(100), v_altura FLOAT, v_largura FLOAT, v_data_plantio VARCHAR(10), v_fotos VARCHAR(1000))
BEGIN
	DECLARE EXIT HANDLER FOR SQLSTATE '23000' BEGIN
		SELECT 'Já existe uma árvore cadastrada neste local!' AS erro;
    END;
    INSERT INTO Localizacao(latitude, longitude, cep, rua, bairro, cidade) VALUES (v_latitude, v_longitude, v_cep, v_rua, v_bairro, v_cidade);
	INSERT INTO Arvore(id_tipo, latitude, longitude, altura, largura, data_plantio, data_cadastro, fotos) VALUES (v_id_tipo, v_latitude, v_longitude, v_altura, v_largura, v_data_plantio, current_date(), v_fotos);
END//

DROP PROCEDURE IF EXISTS updateArvore//
CREATE PROCEDURE updateArvore(v_id_arvore INT, v_id_tipo INT, v_altura FLOAT, v_largura FLOAT, v_ano_plantio DATE, v_fotos VARCHAR(1000))
BEGIN
	UPDATE Arvore SET id_tipo = v_id_tipo, altura = v_altura, largura = v_largura, ano_plantio = v_ano_plantio, fotos = v_fotos WHERE id_arvore = v_id_arvore;
END//

DROP PROCEDURE IF EXISTS getArvores;
CREATE PROCEDURE getArvores()
BEGIN
	SELECT id_arvore, Arvore.id_tipo, nome_cientifico, nome_popular, Arvore.latitude, Arvore.longitude, 
		altura, largura, data_plantio, data_cadastro, 
		fotos, cep, rua, bairro, cidade 
    FROM Arvore INNER JOIN Localizacao INNER JOIN Tipo 
    ON Arvore.latitude=Localizacao.latitude 
    AND Arvore.longitude=Localizacao.longitude
    AND Arvore.id_tipo = Tipo.id_tipo
    ORDER BY Arvore.latitude ASC;
END//