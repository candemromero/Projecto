const express = require('express');
const cors = require('cors');
const session = require('express-session');

const app = express();

const usuariosRoute = require('./routes/usuarios');
const paisesRoute = require('./routes/paises');
const sessionRoute = require('./routes/session');
const favoritosRoute = require('./routes/favoritos');
const comentariosRoute = require('./routes/comentarios');


app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(
  session({
    secret: '123456',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static('public'));

app.use(express.json());


app.use('/usuarios', usuariosRoute);
app.use('/paises', paisesRoute);
app.use('/favoritos', favoritosRoute);
app.use('/comentarios', comentariosRoute);
app.use('/session', sessionRoute);



app.listen(8000, () => {
    console.log('Servidor escuchando');
  });
  