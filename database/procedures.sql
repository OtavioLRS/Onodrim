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
	DECLARE real_email, real_nome_cientifico VARCHAR(100);
	SELECT email INTO real_email FROM Usuario WHERE email = v_usuario;
    SELECT nome_cientifico INTO real_nome_cientifico FROM Tipo WHERE nome_cientifico = v_nome_cientifico;
    IF(real_email IS NULL) THEN 
		SELECT 'Email não cadastrado!' AS erro;
	ELSE IF (real_nome_cientifico IS NULL) THEN
			INSERT INTO Tipo(nome_cientifico, nome_popular, fruto, utilidade, usuario, data_sugestao, checado) VALUES (v_nome_cientifico, v_nome_popular, v_fruto, v_utilidade, v_usuario, current_date(), 1);
		ELSE
			SELECT 'Tipo já cadastrado!' AS erro;
        END IF;
    END IF;
END//

DROP PROCEDURE IF EXISTS checaTipo//
CREATE PROCEDURE checaTipo(v_nome_cientifico VARCHAR(100), v_checado INT(1))
BEGIN
    IF(v_checado = 0) THEN
		DELETE FROM Tipo WHERE nome_cientifico = v_nome_cientifico;
	ELSE IF(v_checado = 2) THEN
			UPDATE Tipo SET checado = 2, data_checagem = current_date() 
            WHERE nome_cientifico = v_nome_cientifico;
		END IF;
    END IF;
END//

DROP PROCEDURE IF EXISTS insertLocalizacao//
CREATE PROCEDURE insertLocalizacao(v_latitude FLOAT, v_longitude FLOAT, v_cep INT(8), v_rua VARCHAR(100), v_bairro VARCHAR(100), v_cidade VARCHAR(100))
BEGIN
	DECLARE real_latitude, real_longitude FLOAT;
    SELECT latitude, longitude INTO real_latitude, real_longitude FROM Localizacao WHERE latitude = v_latitude AND longitude = v_longitude;
    IF(real_latitude IS NULL) THEN
		INSERT INTO Localizacao (latitude, longitude, cep, rua, bairro, cidade) VALUES (v_latitude, v_longitude, v_cep, v_rua, v_bairro, v_cidade);
	ELSE IF (real_longitude IS NOT NULL) THEN
		SELECT ('Localizacao já cadastrada') AS erro;
        END IF;
	END IF;
END//

DROP PROCEDURE if exists insertArvore//
CREATE PROCEDURE insertArvore()
BEGIN
	
END//

DROP PROCEDURE if exists insertTombamento//
CREATE PROCEDURE insertTombamento(id_arvore INT(11), motivo VARCHAR(1000), decreto VARCHAR(20))
BEGIN
	
END//