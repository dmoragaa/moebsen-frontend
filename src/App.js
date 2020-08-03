import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

//Componentes de las pags de sillones
import AddSillon from "./components/AddSillon";
import Sillon from "./components/Sillon";
import SillonList from "./components/SillonList";

/*
Esta funcion es la original de React

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
 */

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/sillones" className="navbar-brand">
            Sillones
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/sillones"} className="nav-link">
                Ver Sillones
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Nuevo Sillón
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/sillones"]} component={SillonList} />
            <Route exact path="/add" component={AddSillon} />
            <Route path="/sillones/:id" component={Sillon} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}


export default App;
