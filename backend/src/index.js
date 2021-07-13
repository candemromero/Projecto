const express = require('express');
const cors = require('cors');
const session = require('express-session');
const fileupload = require('express-fileupload');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(fileupload());

app.use(
  session({
    secret: 'dhn%fgf3hfj',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static('public'));

app.use(express.json());

const sessionRoute = require('./routes/session');
const usuariosRoute = require('./routes/usuarios');
const paisesRoute = require('./routes/paises');
const favoritosRoute = require('./routes/favoritos');
const comentariosRoute = require('./routes/comentarios');

app.use('/session', sessionRoute); 
app.use('/usuarios', usuariosRoute);
app.use('/paises', paisesRoute);
app.use('/comentarios', comentariosRoute);
app.use('/favoritos', favoritosRoute);


app.listen(8000, () => {
  console.log('Servidor escuchando');
});
