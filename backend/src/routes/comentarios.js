const express = require('express');
const connection = require('../connection');

const router = express.Router();

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM comentarios';

  connection.query(sql, (err, result) => {
    if (err) {
      res.send('Error al obtener los comentarios');
    } else {
      res.json(result);
    }
  });
});

router.get('/userpubs', (req, res) => {
  console.log(req.session.user.id);

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
  const sql = 'SELECT * FROM comentarios WHERE idcountry=?';

  connection.query(sql, [req.params.id], (err, result) => {
    if (err) {
      res.send('Error al obtener comentarios del país');
    } else {
      res.json(result[0]);
    }
  });
});

router.post('/', (req, res) => {
  const sql = `INSERT INTO comentarios(iduser, idcountry, descripcin, imagen)
             VALUES(?, ?, ?, ?)`;

  const values = [
    req.session.user.id,
    req.body.idcountry,
    req.body.descripcion,
    req.body.imagen,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        status: 'error',
        message: 'Error al realizar el comentario',
      });
    } else {
      res.json({
        status: 'OK',
        message: 'comentario realizado correctamente',
      });
    }
  });
});

router.put('/:id', (req, res) => {
  let sqlUpdate = `UPDATE comentarios
                   SET descripcion = ? `;

  let values = [req.body.descripcion];

  if (req.files) {
// Con esto obtenemos el nombre de la imagen actual
    const sqlCurrentImage = `SELECT imagen
                             FROM comentarios
                             WHERE id = ?`;
    connection.query(sqlCurrentImage, [req.params.id], (err, result) => {
      if (err) {
        console.error(err);
      } else {
        //Borramos el archivo anterior
        const fileToDelete = `./public/images/${result[0].imagen}`;
        fs.unlink(fileToDelete, (err) => {
          if (err) {
            console.log('Error al borrar la imagen');
          } else {
            console.log('Imagen borrada');
          }
        });
      }
    });

    //Obtenemos la nueva imagen
    const comImage = req.files.comImage;

    imageFileName = Date.now() + path.extname(comImage.name);

    console.log(imageFileName);

    comImage.mv(`./public/images/${imageFileName}`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    sqlUpdate += ', imagen = ?';
    values.push(imageFileName);
  }

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
        status: 'OK',
        message: 'El comentario ha sido eliminada correctamente',
      });
    }
  });
});

module.exports = router;
