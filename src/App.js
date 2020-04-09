import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom" 
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

//Importamos los componentes que manejarán la lista de contactos
import Navbar from "./components/navbar.component"
import ContactList from "./components/contact-list.component";
import EditContact from "./components/edit-contact.component";
import CreateContact from "./components/create-contact.component";

function App() {
  return (
    <Router> {/*facilitar rutear link facilmente, que usaremos para el REST*/}
      <div className="container mainContainer">
        <Navbar />
        <br/>
        <Route path="/" exact component={ContactList} />
        <Route path="/edit/:id" component={EditContact} />
        <Route path="/create" component={CreateContact} />
      </div>
    </Router>
  );
}

export default App;
