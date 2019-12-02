require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
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
        connection.query(`CALL insertUser('${req.body.nome}', '${req.body.email}', '${req.body.senha}', 1);`, (error, results, fields) => {
            return res.json(results);
        });
    });
});

routes.post('/signin', (req, res) => {
    connection.getConnection(function (err, connection) {
        connection.query(`CALL loginUser('${req.body.email}', MD5('${req.body.senha}'));`, (error, results, fields) => {
            return res.json(results);
        });
    });
});

routes.post('/sugerir', (req, res) => {
    connection.getConnection(function (err, connection) {
        connection.query(`CALL insertTipo('${req.body.nome_cientifico}', '${req.body.nome_popular}', '${req.body.fruto}', '${req.body.utilidade}', '${req.body.usuario}');`, (error, results, fields) => {
            return res.json(results);
        });
    });
});

routes.get('/tipos', (req, res) => {
    connection.getConnection(function (err, connection) {
        connection.query(`SELECT * FROM Tipo WHERE checado = 2;`, (error, results, fields) => {
            return res.json(results);
        });
    });
});

routes.get('/sugestoes', (req, res) => {
    console.log(req);
    connection.getConnection(function (err, connection) {
        connection.query(`SELECT * FROM Tipo WHERE checado = 1;`, (error, results, fields) => {
            console.log(results, error);
            return res.json(results);
        });
    });
});

routes.post('/checar', (req, res) => {
    connection.getConnection(function (err, connection) {
        connection.query(`CALL checaTipo('${req.body.nome_cientifico}', ${req.body.checado});`, (error, results, fields) => {
            return res.json(results);
        });
    });
});

routes.get('/arvore', (req, res) => {
    connection.getConnection(function (err, connection) {
        connection.query(`CALL getArvores();`, (error, results, fields) => {
            return res.json(results);
        });
    })
});

routes.post('/arvore', multer(multerConfig).single('fotos'), (req, res) => {
    connection.getConnection(function (err, connection) {
        connection.query(`CALL insertArvore(${ req.body.id_tipo }, ${ req.body.latitude }, ${ req.body.longitude }, ${ req.body.cep }, '${req.body.rua}', '${req.body.bairro}', '${req.body.cidade}', ${ req.body.altura }, ${ req.body.largura }, '${req.body.data_plantio}', '${req.file.location}');`, (error, results, fields) => {
            return res.json(results);
        });
    });
});

routes.get('/arvore', (req, res) => {
    connection.getConnection(function (err, connection) {
        connection.query(`CALL getArvores();`, (error, results, fields) => {
            return res.json(results);
        });
    })
});

module.exports = routes;