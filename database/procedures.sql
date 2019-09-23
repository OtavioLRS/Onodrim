
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
 

 
DELIMITER //
drop procedure if exists sp_repeat//
create procedure sp_repeat(in var1 integer)
begin
 REPEAT
 SELECT var1;
 set var1 = var1 + 1;
 UNTIL var1 > 10
 END REPEAT;
END//

call sp_repeat(1)//


call manipula1()//

drop procedure if exists manipula1//
CREATE PROCEDURE manipula1()
BEGIN
 DECLARE coluna_desconhecida CONDITION FOR SQLSTATE '42S22';
 DECLARE EXIT HANDLER FOR coluna_desconhecida
 BEGIN
   SELECT 'erro de coluna desconhecida' AS erro;
 END;
 SELECT coluna;
 SELECT 'continua';
END //







DROP procedure IF EXISTS exemplo_cursor2//
CREATE PROCEDURE exemplo_cursor2 (OUT rid VARCHAR(60), OUT rnome VARCHAR(60))
BEGIN
 DECLARE z INT;
 DECLARE x, y VARCHAR(60);
 DECLARE sp1_cursor CURSOR
 FOR SELECT email, nome FROM usuario;
 DECLARE CONTINUE HANDLER FOR NOT FOUND SET z = 1;
 OPEN sp1_cursor;
  REPEAT
   FETCH sp1_cursor INTO x, y;
   UNTIL (z=1)
  END REPEAT;
 CLOSE sp1_cursor;
 SET rid = x;
 SET rnome = y;
END//

CALL exemplo_cursor2(@email, @nome)//

SELECT @email, @nome//

















DROP procedure IF EXISTS exemplo_cursor3//
CREATE PROCEDURE exemplo_cursor3 (OUT rid VARCHAR(60), OUT rnome VARCHAR(60))
BEGIN
 DECLARE z INT;
 DECLARE x, y VARCHAR(60);
 DECLARE sp1_cursor CURSOR
 FOR SELECT email, nome FROM usuario;
 DECLARE CONTINUE HANDLER FOR NOT FOUND SET z = 1;
 SET z =0;
 OPEN sp1_cursor;
  REPEAT
   FETCH sp1_cursor INTO x, y;
   if (z=0) then
   select x, y;
   INSERT INTO usuario2(email, nome) VALUES (x, y);
   end if;
   UNTIL (z=1)
  END REPEAT;
 CLOSE sp1_cursor;
 SET rid = x;
 SET rnome = y;
END//

CALL exemplo_cursor3(@email, @nome)//

SELECT @email, @nome//