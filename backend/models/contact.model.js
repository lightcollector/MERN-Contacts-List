

const mongoose = require('mongoose');

// definimos la estructura de la colección de datos -> los objetos de la DB
const Schema = mongoose.Schema;
const contactSchema = new Schema({
    f_name: { type: String, required: true },
    l_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_num: { type: String, required: true },
  });
  
  // definimos (compilamos) el modelo de datos que creará (construirá) los documentos de mongoDB. Cada documento es un objeto.
  const Contact = mongoose.model('Contact', contactSchema);

  module.exports = Contact;