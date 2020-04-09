import React, { Component } from 'react';
import axios from 'axios';

export default class EditContact extends Component {
  constructor(props) {
    super(props);
    // creamos variables con campos del objeto en la base de datos
    this.state = {
      f_name: '',
      l_name: '',
      email: '',
      phone_num: ''
    };

    // linkamos las funciones para que this apunte a la clases
    this.onChangeContactName = this.onChangeContactName.bind(this);
    this.onChangeContactSurname = this.onChangeContactSurname.bind(this);
    this.onChangeContactEmail = this.onChangeContactEmail.bind(this);
    this.onChangeContactPhone = this.onChangeContactPhone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeContactName(e) {
    this.setState({ f_name: e.target.value });
  }
  onChangeContactSurname(e) {
    this.setState({ l_name: e.target.value });
  }
  onChangeContactEmail(e) {
    this.setState({ email: e.target.value });
  }
  onChangeContactPhone(e) {
    this.setState({ phone_num: e.target.value });
  }

  
  // Para editar tomaremos el id de usuario que nos pase el contacto (por props) al pulsar su botón de edit,
  // extraemos sus datos y los guardamos en el estado actual
  componentDidMount() {
    axios.get('http://localhost:8001/contacts/' + this.props.match.params.id) //usamos match para tomar el id directamente del placeholder de la url
      .then(response => {
        this.setState({
          f_name: response.data.f_name,
          l_name: response.data.l_name,
          email: response.data.email,
          phone_num: response.data.phone_num
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  // evento para el submit del formulario
  onSubmit(e) {
    e.preventDefault(); //impedimos que el formulario HTTP haga su POST por defecto
    const contact = {
      f_name: this.state.f_name,
      l_name: this.state.l_name,
      email: this.state.email,
      phone_num: this.state.phone_num
    }
    console.log(contact);

    // actualizamos el usuario en el backend.
    axios.post('http://localhost:8001/contacts/update/' + this.props.match.params.id, contact)
      .then(res => {
        console.log(res.data)
        // una vez cargado en la DB, resetamos los campos por si se quieren añadir más usuarios
        this.setState({
          f_name: '',
          l_name: '',
          email: '',
          phone_num: ''
        });
        // volvemos a la página principal
        window.location = '/';

      })
      .catch((error) => {
        if (error.response) {

          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          // Avisamos si no se puede ejecutar la edición porque se incumple el "unique" de la dirección de correo.
          let str = error.response.data;
          let errIdentifier = str.includes("E11000 duplicate key");
          if (errIdentifier) {
            alert("Ya existe un contacto con esta dirección de correo");
          }
        } else if (error.request) {
          // request hecho, pero sin respuesta
          console.log(error.request);
        } else {
          // Algun problema la montar el request
          console.log("error else");
          console.log('Error', error.message);
        }
        console.log(error.config);
      })
      ;


  }

  render() {
    return (
      <div>
        <h3>Editar Contacto</h3>
        {/* actualizamos los datos de las variables de estado según se modifican
                y con el submit creamos el contacto */}
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Nombre: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.f_name}
              onChange={this.onChangeContactName}
            />
          </div>
          <div className="form-group">
            <label>Apellido: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.l_name}
              onChange={this.onChangeContactSurname}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input type="email"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeContactEmail}
            />
          </div>
          <div className="form-group">
            <label>Telefono </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.phone_num}
              onChange={this.onChangeContactPhone}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Actualizar contacto" className="btn btn-primary" id="submitBtn"/>
          </div>
        </form>
      </div>
    )
  }
}