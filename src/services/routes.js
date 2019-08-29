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
        connection.query('SELECT * FROM usuario', function (error, results, fields) {
            if(error !== null) console.log(error);
            res.send(results);
        });
    });
});

routes.post('/users', (req, res) => {
    connection.getConnection(function (err, connection) {
        connection.query(`CALL insertUser('${req.body.nome}','${req.body.email}','${req.body.senha}');`, function (error, results, fields) {
        //connection.query(`INSERT INTO usuario VALUES('${req.body.email}', '${req.body.nome}', MD5('${req.body.senha}'), ${req.body.grau_permissao});`, function (error, results, fields) {
            if (error !== null && error.errno == 1062) console.log("E-mail ja cadastrado!");
            res.send(results);
        });
    });
    res.send({ "ok": true })
    //return res.json({ "ok": true });
})

module.exports = routes;
