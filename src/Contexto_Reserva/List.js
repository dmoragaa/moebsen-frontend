import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import solicitudService from './services/solicitudService';
import Container from 'react-bootstrap/Container';
import moment from 'moment';

var React = require('react');

class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {reload:false,res:this.props.res}
    
    this.handleDel = this.handleDel.bind(this)
    this.handleAprobar = this.handleAprobar.bind(this)
    }
  
handleDel(id){
    solicitudService.del(parseInt(id)).then(res =>{
      window.location.reload(false)}
    )
  

}
handleAprobar(data,sym){
  console.log("hola")

  solicitudService.updt(parseInt(data.id),
  { paciente:{rut:data.rut}, 
    sillon: data.sillon,
    sala:data.sala,
    equipo:data.equipo,
    equipamiento:data.equipamiento,
    hora:data.hora,
    fecha:data.fecha,
    reserva:parseInt(sym)}).then(res =>{
      console.log("chao");
      console.log(res)
      window.location.reload(false)
    }
    )
  

}





render(){
    var res = this.state.res;
    


    const lista = this.props.ItemList;
    if (parseInt(res) === 0){
    var todoItems = lista.map((obj) =>{
    var fecha = obj.fecha;
    var fecha2= moment.utc(fecha).format("YYYY-MM-DD")
      return(

        <tr key={obj.id}>
          <td>{fecha2}</td>
          <td> {obj.hora}</td>
        <td> {obj.equipo}</td>
          <td>{obj.equipamiento}</td>
          <td> {obj.sillon}</td>  
          <td> {obj.sala} </td>
          <td> {obj.paciente.rut} </td>
          <td><Button  onClick = {() => {this.handleAprobar(obj,1)}} variant="primary">Aprobar</Button> {''}
        
          <Button href = {"/reservas/editar/"+obj.id} variant = "primary ">Editar </Button>{" "}
          <Button onClick = {()=>{this.handleDel(obj.id)}} variant="danger">Rechazar Solicitud</Button></td>
        </tr>)});
          }
    else if (parseInt(res) === 1){
        var todoItems = lista.map((obj) =>{
          var fecha = obj.fecha;
          var fecha2= moment.utc(fecha).format("YYYY-MM-DD")
          return(
          <tr key={obj.id}>
            <td>{fecha2}</td>
            <td> {obj.hora}</td>
          <td> {obj.equipo}</td>
            <td>{obj.equipamiento}</td>
            <td> {obj.sillon}</td>   
            <td>{obj.sala}</td> 
            <td> {obj.paciente.rut} </td>
            <td><Button  onClick =  {() => {this.handleDel(obj.id)}} variant="primary">Terminar Procedimiento</Button> {''}
            <Button onClick = {() => {this.handleAprobar(obj,0)}} variant="danger">Cancelar Reserva</Button></td>
                </tr>)});
            }
  
    return (
      <Container>
        <Table striped bordered hover>
        <thead>
    <tr>
      <th>Fecha </th>
      <th>Hora</th>
      <th>Equipo</th>
      <th>Equipamiento</th>
      <th>Sillón</th>
      <th>Sala</th>
      <th>Rut</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
  {todoItems}
</tbody>
</Table>
</Container>
      );
    


}
}
export default List