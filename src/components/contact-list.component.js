import React, { Component } from 'react';
import axios from 'axios';
import Contact from './contact.component'

export default class ContactList extends Component {
  constructor(props) {
    super(props);
    // array donde guardaremos los contactos para mostrarlos en pantalla
    this.state = {
      contacts: []
    };

    this.deleteContact = this.deleteContact.bind(this);
    this.contactList = this.contactList.bind(this);
  }

  // al cargar la página, antes de renderizarla,s consultamos y guardamos todos los contactos que existan en la base de datos
  componentDidMount() {
    axios.get('http://localhost:8001/contacts/')
      .then(response => {
        this.setState({ contacts: response.data });
        console.log(this.state.contacts);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // método para borrar los contactos directamente desde la lista que los muestra todos
  deleteContact(id) {
    axios.delete('http://localhost:8001/contacts/' + id)
      .then(res => console.log(res.data));
    this.setState({
      contacts: this.state.contacts.filter(elem => elem._id !== id) // actualizamos la lista de contactos con aquellos que no son el que hemos eliminado
    })
  }

  // método para montar la tabla de contactos
  contactList() {
    return this.state.contacts.map(currentContact => { // loop por todos los contactos
      // rendeiramos los contactos, pansando props del objeto Contacto, la función de eliminar para "linkarla", y el id del contacto para llamar a su edición
      return <Contact contact={currentContact} deleteContact={this.deleteContact} key={currentContact._id}/>; 
    })
  }

  render() {
    return (
      <div>
        <h3>Contactos</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.contactList() /* filas de la tabla con la info de los contactos */} 
          </tbody>
        </table>
      </div>
    )
  }
}