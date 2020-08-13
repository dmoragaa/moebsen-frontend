
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import solicitudService from './services/solicitudService';
import Select from "./selects.js"
import moment from 'moment';

import 'bootstrap/dist/css/bootstrap.min.css';
var React = require('react');

class Solicitud extends React.Component{
    constructor(props){
        super(props);
        this.state = {ingresado:false, rut: '',sala: '',sillon: '',equipo:'',equipamiento:'',
    hora:'',fecha:"",pacientes:this.props.pacientes,ruts:this.props.ruta,sil:0};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }



  

    handleChange(event){
      console.log(this.state.sillon)
     
      
      
        if (event.target.name === "rut"){
            this.setState({rut:event.target.value})
        }
        else if (event.target.name ==="equipo"){
            this.setState({equipo:event.target.value})
        }
        else if (event.target.name ==="sillon"){
            this.setState({sillon:event.target.value})
        }
        else if (event.target.name ==="sala"){
            this.setState({sala:event.target.value})
        }
        else if (event.target.name ==="equipamiento"){
            this.setState({equipamiento:event.target.value})
        }
  
    else if (event.target.name ==="hora"){
      this.setState({hora:event.target.value})
  }
  else if (event.target.name ==="fecha"){
    var fecha = event.target.value
    var fecha2 = moment.utc(fecha).format("YYYY-MM-DD")
    this.setState({fecha:fecha2})
}


    }

    handleClick(event){
      this.setState({ingresado:false})
    }
    handleSubmit(event){
event.preventDefault()


   if(!this.state.pacientes.includes(parseInt(this.state.rut))){
      alert("Rut no existente en la lista de pacientes")
      this.setState({rut:""});
      event.preventDefault();
    }
    else if (this.props.ruta.includes(parseInt(this.state.rut))){
      alert("ya existe ese rut, intente denuevo");
      this.setState({rut:""})
      event.preventDefault();
   
    }

     else if(this.state.rut === ""){
       alert("Ingrese Rut")
       event.preventDefault();
     }
  
     else if (this.state.fecha === ""){
       alert("Ingrese fecha")
       event.preventDefault();
     }
     else if (this.state.hora === ""){
       alert("Ingrese Hora")
       event.preventDefault();
     } 
     else{  
  

      
       solicitudService.create({
        paciente:{rut:this.state.rut}, 
         sillon: this.state.sillon,
         equipo:this.state.equipo,
         equipamiento:this.state.equipamiento,
         hora:this.state.hora,
         fecha:this.state.fecha,
         sala:this.state.sala,
   /*tipoEquipamiento:this.state.tipoequipamiento, 
   tipoEquipo:this.state.tipoequipo,
   recuperacion:this.state.recuperacion, 
   tipoSillon:this.state.tiposillon,
   tipoPabellon:this.state.tipopabellon,
   dia:this.state.dia,
   duracion:this.state.duracion,*/
   reserva:0
    
    }).then(res => {
        console.log(res);
        console.log(res.data);
        window.location.href = "/reservas/dashboard";
      }).catch(function (error) {
        console.log(error.response.data.message)})
        console.log(this.props.ruta) }

};

  
  
  
     
    render(){
      var silloc = []
      var equipooc = []
      var equipamientooc = []
      var salaoc = []
      for (var i in this.props.sillones){
        if (!this.props.sillonesoc.includes(this.props.sillones[i])){
          silloc.push(this.props.sillones[i])
        }
      }
      for (var i in this.props.equipos){

 

        if (!this.props.equiposoc.includes(this.props.equipos[i].toString())){
          equipooc.push(this.props.equipos[i])
        }
      }
      for (var i in this.props.equipamientos){
        if (!this.props.equipamientosoc.includes(this.props.equipamientos[i].toString())){
          equipamientooc.push(this.props.equipamientos[i])
        }
      }
      for (var i in this.props.salas){
        if (!this.props.salasoc.includes(this.props.salas[i])){
          salaoc.push(this.props.salas[i])
        }
      }
      


        return(
  <section>
        
  <Container >
    

    <Row>
         <div className = "head">
             <h1> Ingrese Solicitud</h1>
           </div>
                    
    </Row>

   
    <Row>
                  
         <Col>
            <Alert  show= {this.state.ingresado} variant="success">
                <Alert.Heading>Ingreso satisfactorio</Alert.Heading>
                      <p>
                        Ingresado con éxito!
                      </p>
                <div className="d-flex justify-content-end">
                    <Button onClick={this.handleClick} variant="outline-success">
                      Cerrar
                    </Button>
                </div>
        </Alert>
      <div style = {{textAlign:"left"}} className = "formulario">
      <Form   onSubmit = {this.handleSubmit}>
     
              <Form.Group  controlId="formRut">
                <Form.Label><h6>Rut</h6></Form.Label>
                <Form.Control  name ="rut"  onChange={this.handleChange} type="text" placeholder="Ingrese Rut" />
              </Form.Group>
         
              <Form.Group   controlId="formfecha">
                  <Form.Label><h6>Fecha</h6></Form.Label>
                  <Form.Control   name ="fecha"  onChange={this.handleChange} type="date"/>
              </Form.Group>
              <Form.Group   controlId="formHora">
                    <Form.Label><h6>Hora</h6></Form.Label>
                    <Form.Control  name ="hora" onChange={this.handleChange} type="time" />
              </Form.Group>
       
       
              <Form.Group   onChange={this.handleChange}   controlId="formsillon">
                <Form.Label><h6>Sillón</h6></Form.Label>
                  <Select  name ="sillon"    placeholder="Elija Sillón" 
                  ItemList = {silloc} res = {this.state.sillon}  />
                  

              </Form.Group>
          


              <Form.Group   onChange={this.handleChange}   controlId="formEquipo">
                <Form.Label><h6>Equipo</h6></Form.Label>
                  <Select  name ="equipo"    placeholder="Elija Equipo" 
                  ItemList = {equipooc} res = {this.state.equipo}  />
              </Form.Group>

            

              <Form.Group   onChange={this.handleChange}   controlId="formEquipamiento">
                <Form.Label><h6>Equipamiento</h6></Form.Label>
                  <Select  name ="equipamiento"    placeholder="Elija Equipamiento" 
                  ItemList = {equipamientooc} res = {this.state.equipamiento}  />
              </Form.Group>

          <Form.Group   onChange={this.handleChange}   controlId="formSala">
                <Form.Label><h6>Sala</h6></Form.Label>
                  <Select  name ="sala"    placeholder="Elija sala" 
                  ItemList = {salaoc} res = {this.state.sala}  />
              </Form.Group>

        

          <Button  onClick = {this.handleClick}  variant="primary" type="submit">
            Guardar
          </Button>{' '}

          <Button  href = "/reservas/dashboard"  variant="light" type="submit">
            Volver
          </Button>

         </Form>
       </div>
     </Col>
      
   </Row>
 </Container>
 </section>
            

       
        );
    }
};

export default Solicitud