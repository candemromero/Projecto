const express = require('express');
const connection = require('../connection');

const router = express.Router();

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM comentarios';

  connection.query(sql, (err, result) => {
    if (err) {
      res.send('Error al obtener los comentarios');
    } else {
      res.json(result)
      }
      
    })
  });

router.get('/usercom', (req, res) => {
  const sql = `SELECT * 
               FROM comentarios
               WHERE iduser = ?`;

  connection.query(sql, [req.session.user.id], (err, result) => {
    if (err) {
      res.send('Error al obtener los comentarios del usuario');
    } else {
      res.json(result);
    }
  });
});

router.get('/:id', (req, res) => {
  const idcountry = req.params.id;
  const sql = `SELECT * FROM comentarios WHERE country = ? `

  connection.query(sql, [idcountry] , (err, result) => {
    if (err) {
      res.send('Error al obtener comentarios del país');
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

router.post('/', (req, res) => {
  const sql = `INSERT INTO comentarios(iduser, country, descripcion)
             VALUES(?, ?, ?)`;

  const values = [
    req.session.user.id,
    req.body.country,
    req.body.descripcion,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        status: 401,
        message: 'Error al realizar el comentario',
      });
    } else {
      res.json({
        status: 200,
        message: 'comentario realizado correctamente',
      });
    }
  });
});

router.put('/:id', (req, res) => {
  let sqlUpdate = `UPDATE comentarios
                   SET descripcion = ? `;

  let values = [req.body.descripcion];

    sqlUpdate += ' WHERE id = ?';
    values.push(req.params.id);

  connection.query(sqlUpdate, values, (err, result) => {
    if (err) {
      res.json({
        status: 'error',
        message: 'Error al modificar el comentario',
      });
    } else {
      res.json({
        status: 'ok',
        message: 'Comentario modificada correctamente',
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  const sql = `DELETE
               FROM comentarios
               WHERE id = ?`;

  connection.query(sql, [req.params.id], (err, result) => {
    if (err) {
      res.json({
        status: 'error',
        message: 'Error al eliminar el comentario',
      });
    } else {
      res.json({
        status: 200,
        message: 'El comentario ha sido eliminada correctamente',
      });
    }
  });
});

module.exports = router;
