// expressJS
const express = require('express');
const cors = require('cors');
//var bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8001;
//var router = express.Router();

// cors y express para el envio y recepción de objetos JSON
app.use(cors());
app.use(express.json());

//mensaje de comprobación en la raiz
app.get('/', function (req, res) {
  res.send('<b>My</b> first express http server');
});

/*** Nos conectamos a la database ***/

// iniciamos moongose para conectar y tratar mongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/factorial_BD', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('conectados a la DB!'));;
mongoose.set('useCreateIndex', true); //* para permitir campos únicos en la db


/*** Routing CRUD ***/
// Routeamos la dirección url+/contacts al fichero contacts.js, que gestionara los métodos GET-POST-PUT-DELETE para los contactos.
const contactsRoutes = require('./routes/contacts');
app.use('/contacts', contactsRoutes);


// Iniciamos el servidor
app.listen(port);
console.log('Aplicación creada en el puerto: ' + port);



