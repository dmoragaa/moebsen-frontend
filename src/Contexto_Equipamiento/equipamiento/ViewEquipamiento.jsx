import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {EditEquipamiento} from './EditEquipamiento';


export class ViewEquipamiento extends Component {

	constructor(props){
		super(props);
	    this.state = {
	    	equipamiento_data: null,
	    	selector: 0,
			exito_guardar: false,
			edit_equipamiento_id: null,
			edit_equipamiento_name: null,
			edit_equipamiento_description: null,
			edit_equipamiento_categoria:null,
			categorias_data:[{
	    		index:0,
	    		nombre:"Cargando categorias",
	    		descripcion:null,
	    		id:null
	    	}]
	    };
	    this.changeEdit = React.createRef();
	}

	get_equipamiento(){
		var xhr = new XMLHttpRequest();
		xhr.addEventListener('load', () => {
      		console.log(xhr.responseText)
      		var raw_data = xhr.responseText;
      		var converted_data = JSON.parse(raw_data);
      		console.log(converted_data);

      		var proceced_data = [];

      		for (var i = 0; i < converted_data.length; i++) {
      			let data = converted_data[i];
      			if (data.estado != 900) {
      				proceced_data.push(data);
      			}
      		}
      		console.log(proceced_data);

      		this.setState({
				equipamiento_data: proceced_data
			});
    	})
    	xhr.open('GET', '/equipamientos');

    	xhr.setRequestHeader('Content-Type', 'application/json');
   
    	xhr.send();
	}

	get_equipamiento_categoria(categoria_id){
		var xhr = new XMLHttpRequest();
		xhr.addEventListener('load', () => {
      		console.log(xhr.responseText)
      		var raw_data = xhr.responseText;
      		var converted_data = JSON.parse(raw_data);
      		console.log(converted_data);

      		var proceced_data = [];

      		for (var i = 0; i < converted_data.length; i++) {
      			let data = converted_data[i];
      			if (data.estado != 900) {
      				proceced_data.push(data);
      			}
      		}
      		console.log(proceced_data);

      		this.setState({
				equipamiento_data: proceced_data
			});
    	})
    	xhr.open('GET', '/equipamientos/categoria/'+categoria_id);

    	xhr.setRequestHeader('Content-Type', 'application/json');
   
    	xhr.send();
	}

	nuke_equipamiento(id){

		//console.log(id);
		
		var xhr = new XMLHttpRequest();

		xhr.addEventListener('load', () => {
			this.get_equipamiento();
		});

		xhr.open('DELETE', '/equipamientos/delete/'+id);

    	xhr.setRequestHeader('Content-Type', 'application/json');
   
    	xhr.send();

	}

	get_categorias(){
		var xhr = new XMLHttpRequest();
		xhr.addEventListener('load', () => {
      		console.log(xhr.responseText)
      		var raw_data = xhr.responseText;
      		var converted_data = JSON.parse(raw_data);
      		console.log(converted_data);

      		var proceced_data = [];

      		for (var i = 0; i < converted_data.length; i++) {
      			let data = converted_data[i];
      			if (data.estado != 90) {
      				proceced_data.push(data);
      			}
      		}

      		for (var i = 0; i < proceced_data.length; i++) {
      			proceced_data[i]["index"] = i;
      		}

      		console.log(proceced_data);

      		this.setState({
				categorias_data: proceced_data
			});
    	})
    	xhr.open('GET', '/categorias');

    	xhr.setRequestHeader('Content-Type', 'application/json');
   
    	xhr.send();
	}

	componentDidMount() {
		this.get_equipamiento();
		this.get_categorias();
	}

	volver(){

		this.props.unhide_button();

		this.get_equipamiento();
		this.setState({
			selector: 0,
			exito_guardar: false
		});

	}

	go(value,id,name, description,categoria){
		this.setState({
			selector: value,
			edit_equipamiento_id: id,
			edit_equipamiento_name: name,
			edit_equipamiento_description: description,
			edit_equipamiento_categoria: categoria
		});
	}

	guardar_categoria(){

		this.changeEdit.current.save();

		this.setState({
			exito_guardar: true
		});
	}

	convert_estado(estado){
		var converted_estado
		if (estado == 100 || estado ==200 || estado == 800) {
			converted_estado = "Disponible";
		} else if (estado == 400) {
			converted_estado = "En uso";
		} else if (estado == 500) {
			converted_estado = "Fuera de Servicio";
		}

		return converted_estado;
	}

	changeCategoria(index){

		if (index == -1) {
			this.get_equipamiento();
		} else {
			var categoria = this.state.categorias_data[index];

			this.get_equipamiento_categoria(categoria.id);

			this.setState({
				selected_categoria: categoria
			});
		}
	}

	render() {
		

		const field = {
			backgroundColor: '#F5F5F5'
		}

		return (
			<div>
			{
				this.state.equipamiento_data == null ? (<div>Cargando...</div>) : (
				<div>
				{
					this.state.selector == 0 ? (
					<div>
						<Table striped bordered hover>
							<thead>
						    	<tr>
							      	<th>Nombre</th>
								    <th>
								    	Categoria
								    	<Form.Control style={field} as="select" onChange={event => this.changeCategoria(event.target.value)}>
								    		<option selected="selected" value={-1}>Todas</option>
											{this.state.categorias_data.map ((categoria) => 
												<option value={categoria.index}>{categoria.nombre}</option>
											)}
				    					</Form.Control>
								    </th>
								    <th>Descripcion</th>
								    <th>Estado actual</th>
								    <th>Acciones</th>
						    	</tr>
						  	</thead>
						  	<tbody>
							{this.state.equipamiento_data.map ((equipamiento) => 
								<tr>
									<td>{equipamiento.name}</td>
									<td>{equipamiento.categoria.nombre}</td>
									<td>{equipamiento.descripsion}</td>
									<td>{this.convert_estado(equipamiento.estado)}</td>
									<td>
										<Button variant="primary" onClick={ () => {this.go(1, equipamiento.id, equipamiento.name, equipamiento.descripsion, equipamiento.categoria)}} >Editar</Button>  {' '}
										<Button variant="danger" onClick={ () => {this.nuke_equipamiento(equipamiento.id)}} >Eliminar</Button>  
									</td>
								</tr>
							)}
							</tbody>
						</Table>

					</div>
					) : null
				}{
					this.state.selector == 1 ? (
					<div>
						<EditEquipamiento
							id = {this.state.edit_equipamiento_id} 
							name = {this.state.edit_equipamiento_name}
							description = {this.state.edit_equipamiento_description}
							categoria = {this.state.edit_equipamiento_categoria}
							hide_button = {this.props.hide_button.bind(this)}
							ref = {this.changeEdit}
						/>
						<Button variant="primary" onClick={ () => {this.guardar_categoria()}} >Guardar</Button> {' '}
						<Button variant="light" onClick={ () => {this.volver()}} >Volver</Button> 
						{
								this.state.exito_guardar ? 
								(
									<div>
										<h2>Accion realizada con exito</h2>
									</div>
								) : null
						}
					</div>
					) : null
				}
				</div>)
			}
				
			</div>
		);
	}

}