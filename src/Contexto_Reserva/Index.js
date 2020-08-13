import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import List from "./List.js"
import Button from 'react-bootstrap/Button'



var React = require('react');


class Index extends React.Component{
  constructor(props){
    super(props);
    this.state = {solicitudes:this.props.solicitudes,reservas:this.props.reservas};


  }
 
/*  get_solicitudes(){
    var listasol = []
    var listares = []
    solicitudService.getAll().then
      (res=>{var pac=res.data;
            for (var i in pac){
            var obj = pac[i].reserva
            if (obj === true){ 
              listares.push(pac[i])
            }
            else{
              listasol.push(pac[i])
            }
          }
          this.setState({solicitudes:listasol,reservas:listares})

  })
  }
*/


  
  
     
    render(){
  /*    if (this.state.reservas === "" || this.state.solicitudes === ""){

        while (this.state.reservas === "" || this.state.reserva === [] || this.state.solicitudes === "" || this.state.solicitudes ===[]){
          this.get_solicitudes()
          return( <Spinner animation="border" variant="success" />)
        }
      }*/

      return(
        <Container  style = {{padding:"0",margin:"0",textAlign:"left",alignContent:"left",width:"100%"}} fluid>
        
          <Row>
            <Col style = {{textAlign: "right"}}  >
            <Button  href = "/reservas/solicitud" variant="primary">Agregar una Solicitud</Button>
            </Col>
          </Row>
          <Row>
          <Col style = {{marginLeft:"40px"}} md = {8}>
              <h3 >Solicitudes</h3>
              <List  ItemList = {this.state.solicitudes} res = "0" />
              </Col>
          </Row>
          <Row>
          <Col style = {{marginLeft:"40px"}} md = {8}>
            <h3>Reservas</h3>
              <List  ItemList = {this.state.reservas} res = "1"/>
            </Col>
         </Row>
     </Container>
   
      )}};

export default Index;