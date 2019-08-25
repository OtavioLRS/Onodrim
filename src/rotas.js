const express = require('express');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.json({ message: `Hey ${req.query.name}` });
});

routes.post('/devs', (req, res) => {
    console.log(req.body);  // pega a req q mando e imprime
    return res.json({ ok: true});
})

module.exports = routes;
