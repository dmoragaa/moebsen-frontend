import React from 'react';
import './App.css';
import Nav from "./Nav";
import Contexto from "./Contexto";
import Personal from "./Contexto_Equipo/Personal";
import NewPersonal from "./Contexto_Equipo/NewPersonal";
import EditPersonal from "./Contexto_Equipo/EditPersonal";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {MainEquipamiento} from './Contexto_Equipamiento/Main_view_equipamiento';
import AddSillon from "./Contexto_Sillones/components/AddSillon";
import Reservas from "./Contexto_Reserva/Reserva.js";
import Sillon from "./Contexto_Sillones/components/Sillon";
import SillonList from "./Contexto_Sillones/components/SillonList";
import 'bootstrap/dist/css/bootstrap.min.css';
import SalasPage from './Contexto_Salas/pages/SalasPage';
import SalasFormPage from './Contexto_Salas/pages/SalasFormPage';
// RECUERDEN HACER LOS IMPORT DE SUS COMPONENTES, DESDE SUS CARPETAS

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          {/*Main Comun*/}
          <Route exact path="/" component={Home} />     
          <Route path="/contexto" component={Contexto} />
          {/*Contexto Equipo*/}
          <Route path="/personal" component={Personal} />
          <Route path="/new_personal" component={NewPersonal} />
          <Route path="/edit_personal/:id" component={EditPersonal} />
          {/*Contexto Equipamiento*/}
          <Route path="/equipamiento" component={MainEquipamiento} />
          {/*Contexto Sillones*/}
          <Route exact path="/sillones" component={SillonList} />
          <Route exact path="/sillones/add" component={AddSillon} />
          <Route path="/sillones/:id" component={Sillon} />
          <Route path ="/reservas" component={Reservas} />
          
          {/*AQUI ABAJO PONER LAS RUTAS A SUS COMPONENTES DE LOS CONTEXTOS FALTANTES*/}
          {/*Contexto Salas*/}
          <Route exact path="/salas" component={SalasPage}></Route>
          <Route exact path="/salasForm" component={SalasFormPage}></Route>



        </Switch>
      </div>
    </Router>
  );
}
const Home = () => (
  <div>
    <h1>Inicio</h1>
  </div>
)
export default App;
