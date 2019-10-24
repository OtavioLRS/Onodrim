const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const routes = express.Router();

const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'onodrim'
});

routes.get('/users', function (req, res) {
    connection.getConnection(function (err, connection) {
        connection.query('SELECT * FROM usuario;', function (error, results, fields) {
            if(error !== null) console.log(error);
            res.send(results);
        });
    });
});

routes.post('/signup', (req, res) => {
    connection.getConnection(function (err, connection) {
        connection.query(`CALL insertUser('${req.body.nome}', '${req.body.email}', '${req.body.senha}', 1);`, function (error, results, fields) {
            return res.json(results);
        });
    });
})

routes.post('/signin', (req, res) => {
    connection.getConnection(function (err, connection) {
        connection.query(`CALL loginUser('${req.body.email}', MD5('${req.body.senha}'));`, (error, results, fields) => {
            return res.json(results);
        });
    });
})

module.exports = routes;
