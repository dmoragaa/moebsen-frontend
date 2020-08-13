import React from 'react';
import utfsm from './utfsm.png'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Solicitud from './Solicitud.js'
import Reserva from './Reserva.js'
import Index from "./Index.js"
import Navbar from 'react-bootstrap/Navbar'
import solicitudService from './services/solicitudService';
import Editar from './Editar.js'
import Nav from 'react-bootstrap/Nav'
import pacienteService from './services/pacientesService';
import sillonService from './services/sillonService';
import equipoService from './services/equipoService';
import equipamientoService from './services/equipamientoService';
import salaService from './services/salaService';

import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';



class Reservas extends React.Component {
  constructor(props){
    super(props);
    this.state = {solicitudes:"",reservas:"",pacientes:"",carga:"",ruts:"",reload:false,
    sillones:"",equipos:"",equipamiento:"",sala:"",sillonesoc:"",equiposoc:"",salasoc:"",equipamientosoc:""};

    this.get_solicitudes = this.get_solicitudes.bind(this)

  }


  get_sillones(){
    var listasillones = []
      sillonService.getAll().then (res=>{var pac=res.data;
        for (var i in pac){
        var obj1 = pac[i].codigo
        var obj2 = pac[i].tipo
        var obj3 = obj1+","+obj2
        listasillones.push(obj3)
        }
        this.setState({sillones:listasillones})
  })
}
get_sala(){
  var listasala = []
    salaService.getAll().then (res=>{var pac=res.data;
      for (var i in pac){
      var obj1 = pac[i].id
      var obj2 = pac[i].tipoSala
      var obj3 = obj1+","+obj2
      listasala.push(obj3)
      }
      this.setState({salas:listasala})
})
}
get_equipo(){
  var listaequipo = []
    equipoService.getAll().then (res=>{var pac=res.data;
      for (var i in pac){
      var obj1 = pac[i].nombre
      listaequipo.push(obj1)
      }
      this.setState({equipos:listaequipo})
})
}
get_equipamiento(){
  var listaequipamiento = []
    equipamientoService.getAll().then (res=>{var pac=res.data;
      for (var i in pac){
      var obj = pac[i]
      if (parseInt(obj.estado) === 200){
      var obj1 = pac[i].name

      listaequipamiento.push(obj1)
      }
      this.setState({equipamientos:listaequipamiento})
    }
    })
}



  get_solicitudes(){
    var listasol = []
    var listares = []
    var listaruts = []
    var listasill = []
    var listaequipa= []
    var listaequipo = []
    var listasal = []
    solicitudService.getAll().then
      (res=>{var pac=res.data;
            for (var i in pac){
            var obj = pac[i].reserva
            
            listasill.push(pac[i].sillon)
            listaequipa.push(pac[i].equipamiento)
            listaequipo.push(pac[i].equipo)
            listasal.push(pac[i].sala)
            
            if (obj === 1){ 
              listaruts.push(pac[i].paciente.rut)
              listares.push(pac[i])
            }
            else if (obj === 0){
              listaruts.push(pac[i].paciente.rut)
              listasol.push(pac[i])
            }
        
            
          }
          this.setState({solicitudes:listasol,reservas:listares,ruts:listaruts,sillonesoc:listasill,
            salasoc:listasal,equipamientosoc:listaequipa,equiposoc:listaequipo}) })

  }
  obtener_lista(){
    solicitudService.getAll()
    .then(res=>{this.res = res.data;
      var lista = res.data;
      this.setState({carga:lista})
    })
  }


 

  obtener_lista_pacientes(){
    var lista = []
    pacienteService.getAll().then
    (res=>{var pac=res.data;
          for (var i in pac){
          var obj = pac[i].rut
            lista.push(obj)
           
        }
        this.setState({pacientes:lista })
      }
    )
  }




  render(){

    if (this.state.carga === "" || this.state.pacientes === "" ||  this.state.sillones === "" 
    || this.state.solicitudes===  ""|| this.state.equipos===  ""|| this.state.equipamientos===  ""
    || this.state.salas===  ""){

      while (this.state.solicitudes === "" || this.state.solicitudes === [] || this.state.carga === "" || this.state.carga === [] 
      || this.state.pacientes === "" || this.state.pacientes ===[] || this.state.sillones === "" || this.state.sillones === [] ){
        this.obtener_lista()
        this.obtener_lista_pacientes()
        this.get_solicitudes()
        this.get_sillones()
        this.get_equipo()
        this.get_equipamiento()
        this.get_sala()
    

        return( <Spinner animation="border" variant="success" />)
      }
    }
  
  
    if (this.state.carga[0] === undefined && this.state.carga.length !== 0){
      return (  <Spinner animation="border" variant="success" />)
    }
 return (

<Container style = {{padding:"0",margin:"0"}} fluid>

        
<Row>
  <Col>
      <Router>
          <Switch>
                <Route path = "/reservas/dashboard">
                   <Index solicitudes = {this.state.solicitudes} reservas = {this.state.reservas}/>
                </Route>
                <Route path="/reservas/solicitud">
                    <Solicitud sillonesoc = {this.state.sillonesoc} equiposoc = {this.state.equiposoc} 
                    equipamientosoc = {this.state.equipamientosoc} salasoc = {this.state.salasoc}
                     sillones = {this.state.sillones}
                     equipamientos = {this.state.equipamientos} equipos = {this.state.equipos}
                     pacientes = {this.state.pacientes} salas = {this.state.salas} ruta = {this.state.ruts}/>
                </Route>
                <Route path = "/reservas/editar/:id" 
                render = {(props) => {
                return <Editar   {...props} sillonesoc = {this.state.sillonesoc} equiposoc = {this.state.equiposoc} 
                equipamientosoc = {this.state.equipamientosoc} salasoc = {this.state.salasoc}
                 sillones = {this.state.sillones}
                 equipamientos = {this.state.equipamientos} equipos = {this.state.equipos}
                 pacientes = {this.state.pacientes} salas = {this.state.salas} ruta = {this.state.ruts} carga = {this.state.carga} 
                solicitudes = {this.state.solicitudes} />}}>
            
                </Route>
                


                
                <Redirect from =  "/reservas" to="/reservas/dashboard" />
          </Switch>
     </Router>

    </Col>
    
  </Row>
 </Container>  

  )
  }}
export default Reservas;
