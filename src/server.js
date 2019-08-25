const express = require('express');
const routes = require('./rotas');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'onodrim'
});

const server = express();

server.get('/users', function (req, res) {
    // Conectando ao banco.
    connection.getConnection(function (err, connection) {

        // Executando a query MySQL (selecionar todos os dados da tabela usuário).
        connection.query('SELECT * FROM usuario', function (error, results, fields) {
            // Caso ocorra algum erro, não irá executar corretamente.if (error) throw error;

            // Pegando a 'resposta' do servidor pra nossa requisição. Ou seja, aqui ele vai mandar nossos dados.
            res.send(results)
        });
    });
});

server.use(express.json());
server.use(routes);

server.listen(3333);

