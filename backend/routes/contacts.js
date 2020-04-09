
const router = require('express').Router();
let Contact = require('../models/contact.model');

// Solicitamos la información de todos los contactos de la DB
router.route('/').get((req, res) => {
    Contact.find(function (err, contacts) {
      if (err) return console.error(err);
      console.log('Todos los contactos: ');
      console.log(contacts);
      res.send(contacts);
    })
});

// Solicitamos información solo sobre un contacto
router.route('/:id').get((req, res) => {
  Contact.findById(req.params.id)
    .then(contact => res.json(contact))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Añadimos un contacto
router.route('/add').post((req, res) => {  
  const newContact = new Contact({ 
    f_name: req.body.f_name,
    l_name: req.body.l_name,
    email: req.body.email,
    phone_num: req.body.phone_num,
  });

   newContact.save()
     .then(() => res.json('Contacto añadido!'))
     .catch(err => res.status(400).json('Error: ' + err));
});

// Eliminamos un contacto
router.route('/:id').delete((req, res) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(() => res.json('Contacto eliminado.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Actualizamos un contacto
router.route('/update/:id').post((req, res) => {
  Contact.findById(req.params.id)
    .then(contact => {
      contact.f_name = req.body.f_name,
      contact.l_name = req.body.l_name,
      contact.email = req.body.email,
      contact.phone_num = req.body.phone_num,

      contact.save()
        .then(() => res.json('Contact actualizado!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;