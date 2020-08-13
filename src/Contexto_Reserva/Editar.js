
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import solicitudService from './services/solicitudService';
import Select from "./selects.js"
import Spinner from 'react-bootstrap/Spinner'
import moment from 'moment';




import 'bootstrap/dist/css/bootstrap.min.css';
var React = require('react');

class Editar extends React.Component{
    constructor(props){
        super(props);
        this.state = {ingresado:false , id :this.props.match.params.id, fecha :"",hora :"", equipamiento : "",
        sillon : "", rut : "",presillon:""}
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.Encontrar_sol = this.Encontrar_sol.bind(this)

    
    }



   Encontrar_sol(){
       var lista = this.props.solicitudes
       var pac;
       for (var i in lista){
           var obj = lista[i]
           if (parseInt(obj.id) == parseInt(this.state.id)){
                pac = obj
                var  fecha = pac.fecha
                var fecha2 = moment.utc(fecha).format("YYYY-MM-DD")
                this.setState({ingresado:false,fecha :fecha2,hora:pac.hora, equipamiento : pac.equipamiento,
                    equipo: pac.equipo,sala: pac.sala,sillon : pac.sillon, rut : pac.paciente.rut,presillon:pac.sillon,
                    preequipo:pac.equipo,preequipamiento:pac.equipamiento,presalas:pac.sala})
               
                
           }
           
       }
      
       
   }

    handleChange(event){
      

      
        if (event.target.name === "rut"){
            this.setState({rut:event.target.value})
        }
        else if (event.target.name ==="equipo"){
            this.setState({equipo:event.target.value})
        }
        else if (event.target.name ==="sillon"){
            this.setState({sillon:event.target.value})
        }

        else if (event.target.name ==="equipamiento"){
            this.setState({equipamiento:event.target.value})
        }

        else if (event.target.name ==="hora"){
            this.setState({hora:event.target.value})
        }
        else if (event.target.name ==="fecha"){
          this.setState({fecha:event.target.value})}
          else if (event.target.name ==="sala"){
            this.setState({sala:event.target.value})}
      /*  else if (event.target.name ==="recuperacion"){
            this.setState({recuperacion:!this.state.recuperacion})
        }
        
        else if (event.target.name ==="tipoequipo"){
            this.setState({tipoequipo:event.target.value})
        }
        else if (event.target.name ==="tiposillon"){
          this.setState({tiposillon:event.target.value})
      }
      else if (event.target.name ==="tipopabellon"){
        this.setState({tipopabellon:event.target.value})
    }
   
}
else if (event.target.name ==="duracion"){
  this.setState({duracion:event.target.value})
}
        else if (event.target.name ==="tipoequipamiento"){
            this.setState({tipoequipamiento:event.target.value})
        }*/


    }

    handleClick(event){
      this.setState({ingresado:true})
    }
    handleSubmit(event){
      event.preventDefault()




   if(!this.props.pacientes.includes(parseInt(this.state.rut))){
      alert("Rut no existente en la lista de pacientes")
      this.setState({rut:""});
      event.preventdefault();
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
     else if (this.state.sala === ""){
      alert("Ingrese Sala")
      event.preventDefault();
    } 
     else{
       this.setState({ingresado:true})
      
       solicitudService.updt(this.state.id,{ 
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

       
    }

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
        if (!this.props.equipamientosoc.includes(toString(this.props.equipamientos[i]))){
          equipamientooc.push(this.props.equipamientos[i])
        }
      }
      for (var i in this.props.salas){
        if (!this.props.salasoc.includes(this.props.salas[i])){
          salaoc.push(this.props.salas[i])
        }
      }
        if (this.state.rut === ""){
        this.Encontrar_sol()
        return (  <Spinner animation="border" variant="success" />)
        }

        return(

          <section>
        
          <Container >
            
        
            <Row>
                 <div  className = "head">
                     <h1 > Editando paciente con rut {this.state.rut}</h1>
                   </div>
                            
            </Row>
        
           
            <Row>
                          
                 <Col>
                 
              <div className = "formulario">
              <Form style = {{textAlign:"left"}}  onSubmit = {this.handleSubmit}>
             
                 
                      <Form.Group   controlId="formfecha">
                          <Form.Label><h6>Fecha</h6></Form.Label>
                          <Form.Control value = {this.state.fecha}   name ="fecha"  onChange={this.handleChange} type="date"/>
                      </Form.Group>
                      <Form.Group   controlId="formHora">
                            <Form.Label><h6>Hora</h6></Form.Label>
                            <Form.Control  value = {this.state.hora} name ="hora" onChange={this.handleChange} type="time" />
                      </Form.Group>
               
               
                      <Form.Group   onChange={this.handleChange}   controlId="formsillon">
                <Form.Label><h6>Sillón</h6></Form.Label>
                  <Select  name ="sillon"    placeholder={this.state.presillon}
                  ItemList = {silloc} res = {this.state.sillon} res2={this.state.presillon}/>
                  

              </Form.Group>
              <Form.Group   onChange={this.handleChange}   controlId="formsillon">
                <Form.Label><h6>Equipo</h6></Form.Label>
                  <Select  name ="equipo"    placeholder={this.state.preequipo}
                  ItemList = {equipooc} res = {this.state.equipo} res2={this.state.preequipo}/>
                  

              </Form.Group>
              
              
   
        
              <Form.Group   onChange={this.handleChange}   controlId="formEquipamiento">
                <Form.Label><h6>Equipamiento</h6></Form.Label>
                  <Select  name ="equipamiento"    placeholder="Elija Equipamiento" 
                  ItemList = {equipamientooc} res = {this.state.equipamiento}  />
              </Form.Group>

                  <Form.Group   onChange={this.handleChange}   controlId="formsillon">
                <Form.Label><h6>Sala</h6></Form.Label>
                  <Select  name ="sala"    placeholder={this.state.presalas}
                  ItemList = {salaoc} res = {this.state.sala} res2={this.state.presalas}/>
                  

              </Form.Group>
              
              
                  <Button  onClick = {this.handleClick}   variant="primary" type="submit">
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

export default Editar