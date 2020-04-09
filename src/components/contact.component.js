import React from 'react'
import { Link } from 'react-router-dom';

// Functional Component que acepta props (objeto contacto) y monta una fila de la lista de contactos
const Contact = props => (
    <tr>
        <td>{props.contact.f_name}</td>
        <td>{props.contact.l_name}</td>
        <td>{props.contact.email}</td>
        <td>{props.contact.phone_num}</td>
        <td>
            <Link to={"/edit/" + props.contact._id}> <button> editar </button></Link>  {/*  */}
            &nbsp; &nbsp;
            <button onClick={() => { props.deleteContact(props.contact._id) }}>  borrar  </button> {/* boton que llama a la función interna de la contact-list para eliminarlos  */}
        </td>
    </tr>
)

export default Contact;
