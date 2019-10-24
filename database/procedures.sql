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