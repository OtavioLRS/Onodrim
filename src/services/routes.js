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
        connection.query(`CALL insertUser('${req.body.nome}','${req.body.email}','${req.body.senha}');`, function (error, results, fields) {
            if (error === null) 
                return res.json({ ok: true });
            else
                return res.json({ ok: false });
        });
    });
})

routes.post('/signin', (req, res) => {
    connection.getConnection(function (err, connection) {
        connection.query(`SELECT * FROM usuario WHERE email = '${req.body.email}' AND senha = MD5('${req.body.senha}');`, function (error, results, fields) {
            return res.json(results);
        });
    });
})

module.exports = routes;
