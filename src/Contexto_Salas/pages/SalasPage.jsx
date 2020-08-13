import React,{useState, useEffect} from 'react';
import  { Container, Col, Row, Form, FormGroup, Input, Button, Card, Table, CardHeader, CardBody, CardFooter, ButtonDropdown } from 'reactstrap';
import NavigationComponent from '../components/NavigationComponent';
import salasService from '../services/salas.services';
import { FormLabel, FormControl, FormCheck } from "react-bootstrap";
import equipamientoService from "../services/equipamiento.service";

const SalasPage = () => {

    const [salas, setSalas] = useState([]);
    const [salasSelect, setSalasSelect] = useState([]);

    useEffect(() => {
        salasService.getSalas().then(res =>{
            setSalas(res.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);
    
    const handleSearchId = (event) =>{
        setSalasSelect(salas)
        const lista = []
        const id = event.target.value
        salasService.getSalas().then( res =>{
            var salas = res.data
            for (var i in salas){
                if(salas[i].id  === parseInt(id)){
                    lista.push(salas[i])
                }
            }
            setSalasSelect(lista)
        })
    }
    const handleSearchType =(event)=>{
        setSalasSelect(salas)
        const lista = []
        const tipo = event.target.value
        salasService.getSalasbyTipo(tipo).then( res =>{
            var salas = res.data
            setSalasSelect(salas)        }

        )}
  const salasItems = salas.map((sala) =>
  <tr key={sala.id}>
      <td> {sala.id} </td>
      <td> {sala.tipoSala} </td>
      <td> {sala.equipamiento}</td>
  </tr>
);


const handleSubmit = (event)=>{
    event.preventDefault();
    /*salasService.getSalasByTipo(tipoSala).then(response =>{
        console.log(response);
    });*/

}
const handleClean = (event) =>{}


const salasSelectItems = salasSelect.map((sala) =>
<tr key={sala.id}>
    <td> {sala.id} </td>
    <td> {sala.tipoSala} </td>
    <td> {sala.equipamiento}</td>
</tr>)
    if(salasSelect.length === 0)
        {
        return(

            <div>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
                    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
                    crossOrigin="anonymous"></link>
                <NavigationComponent></NavigationComponent>
                    <Container>
                        <Row>
                        <br></br>
                        <br/>
                            <Col sm={9}>
                                <Col>
                                    <Table>
                                        <thead> 
                                            <tr>
                                                <th> Id </th>
                                                <th> Tipo de sala </th>
                                                <th> Equipamiento</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {salasItems}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Col>
                            <Col>
                                <Card>
                                    <CardHeader>Buscar Sala</CardHeader>
                                    <CardBody>
                                        <Form>
                                            <FormLabel>Por id</FormLabel>
                                            <FormControl type="text" name="id"  onChange ={(event) => handleSearchId(event)}/>
                                            
                                            <br></br>
                                            <br></br>

                                            <FormControl as='select' name='tipoSala' size='lg' onChange = {(event) => handleSearchType(event)}>
                                                        <option></option>
                                                        <option>Pabellon</option>
                                                        <option>Descanso</option>
                                            </FormControl>
                                            <br/>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
            </div>
        )
    }
    else{
        return(
            <div>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
                integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
                crossOrigin="anonymous"></link>
            <NavigationComponent></NavigationComponent>
                <Container>
                    <Row>
                    <br></br>
                    <br/>
                        <Col sm={9}>
                            <Col>
                                <Table>
                                    <thead> 
                                        <tr>
                                            <th> Id </th>
                                            <th> Tipo de sala </th>
                                            <th> Equipamiento</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {salasSelectItems}
                                    </tbody>
                                </Table>
                            </Col>
                        </Col>
                        <Col>
                            <Card>
                                <CardHeader>Buscar Sala</CardHeader>
                                <CardBody>
                                    <Form>
                                        <FormLabel>Por id</FormLabel>
                                        <FormControl type="text" name="id"  onChange ={(event) => handleSearchId(event)}/>
                                        
                                        <br></br>
                                        <br></br>

                                        <FormControl as='select' name='tipoSala' size='lg' onChange = {(event) => handleSearchType(event)}>
                                                    <option></option>
                                                    <option>Pabellon</option>
                                                    <option>Descanso</option>
                                        </FormControl>
                                        <br/>
                                        <Button type= "submit" color="primary" onClick ={(event) => handleClean(event)}>Limpiar Busqueda</Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
        </div>
        )

    }    
}

export default SalasPage;