const express = require('express');
const connection = require('../connection');

const router = express.Router();

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM paises';

  connection.query(sql, (err, result) => {
    if (err) {
      res.send('Error al obtener los paises');
    } else {
      res.json(result);
    }
  });
});

router.get('/:id', (req, res) => {
  const idcountry = req.params.id;

  const sql = 'SELECT * FROM paises WHERE id = ?';

  connection.query(sql, [idcountry], (err, result) => {
    if (err) {
      res.send('Error al obtener el país');
    } else {
      res.json(result);
    }
  });
});

module.exports = router;