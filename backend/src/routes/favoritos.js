const express = require('express');
const connection = require('../connection');

const router = express.Router();

router.get('/', (req, res) => {
  const sql = `SELECT * 
               FROM favoritos
               WHERE iduser = ?`;

  connection.query(sql, [req.session.user.id], (err, result) => {
    if (err) {
      res.send('Error al obtener los favoritos del usuario');
    } else {
      res.json(result)
    }
  });
});
router.post('/', (req, res) => {
    const sql = 'INSERT INTO favoritos(iduser, idcountry) VALUES (?, ?)';

    const country = req.body.id;
    const user = req.session.user.id;
    connection.query(sql, [user, country], (err, result)=>{
        if (err) {
            console.log(err);
            res.json({
              status: 401,
              message: 'Error al agregar el favorito',
            });
          } else {
            res.json({
              status: 200,
              message: 'favorito agregado correctamente',
            });
          }
    });
});
router.delete('/', (req, res) => {
    const sql = 'DELETE FROM favoritos WHERE iduser = ? AND idcountry = ?';
    const country = req.body.id;
    const user = req.session.user.id;
    connection.query(sql, [country, user], (err, result)=>{
        if (err) {
            console.log(err);
            res.json({
              status: 401,
              message: 'Error al eliminar el favorito',
            });
          } else {
            res.json({
              status: 200,
              message: 'favorito eliminado correctamente',
            });
          }
    })
});


module.exports = router;