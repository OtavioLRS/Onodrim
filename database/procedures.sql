CREATE TABLE cliente (
 id int auto_increment primary key,
 nome varchar(60) not null,
 endereco varchar(40) not null,
 sexo varchar(1)
);


DELIMITER //
DROP PROCEDURE if exists insertUser//
CREATE PROCEDURE insertUser(v_nome VARCHAR(100), v_email VARCHAR(100), v_senha VARCHAR(100))
 BEGIN
  IF ((v_nome != '') && (v_email != '') && (v_senha != '')) THEN
	INSERT INTO usuario (nome, email, senha, grau_permissao) VALUES (v_nome, v_email, MD5(v_senha), 1);
  ELSE
	SELECT 'NOME, EMAIL e SENHA devem ser fornecidos para o cadastro!' AS Erro;
  END IF;
 END//
DELIMITER ;
CALL insertUser('admin', 'admin@admin', 'admin');




DELIMITER //
DROP PROCEDURE if exists deleteUser//
CREATE PROCEDURE deleteUser(v_email VARCHAR(100))
 BEGIN
	IF (v_email != '' ) THEN
		DELETE FROM usuario WHERE email = v_email;
	ELSE
		SELECT 'EMAIL não informado' AS Erro;
	END IF;
 END//
 DELIMITER ;
 CALL deleteUser('admin@admin');