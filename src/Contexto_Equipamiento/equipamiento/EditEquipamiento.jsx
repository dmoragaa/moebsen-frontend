import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';


export class EditEquipamiento extends Component {

	constructor(props){
		super(props);
	    this.state = {
	    	name: this.props.name,
	    	description: this.props.description,
	    	selected_categoria: this.props.categoria,
	    	estado: 200,
	    	categorias_data: [{
	    		index:0,
	    		nombre:"Cargando categorias",
	    		descripcion:null,
	    		id:null
	    	}]
	    };
	}

	changeName(text){
		this.setState({
			name: text
		});
	}
	changeDescription(text){
		this.setState({
			description: text
		});
	}

	changeCategoria(index){
		this.setState({
			selected_categoria: this.state.categorias_data[index]
		});
	}

	changeEstado(new_estado){
		this.setState({
			estado: new_estado
		});
	}

	save(){
		var xhr = new XMLHttpRequest();
		xhr.addEventListener('load', () => {
      		console.log(xhr.responseText)
    	})
    	xhr.open('PUT', '/equipamientos');

    	xhr.setRequestHeader('Content-Type', 'application/json');

    	let message = JSON.stringify({
    		idequipamiento: this.props.id,
    		idcategoria: this.state.selected_categoria.id,
    		nombre: this.state.name,
    		descripcion: this.state.description,
    		estado: parseInt(this.state.estado)
    	});
   
   		console.log(message);
    	xhr.send(message);
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
		this.get_categorias();
		this.props.hide_button();
	}

	select(category_name){

		if (category_name == this.props.categoria.nombre) {
			return("selected");
		}
		
		return("");
	}

	render() {
		

		const field = {
			width: '70vw',
			backgroundColor: '#F5F5F5'
		}

		return (
			<div>
				<h1>Modificar un Equipamiento</h1>

				<Form.Group>
					<Form.Label>Categoria</Form.Label>
					<Form.Control style={field}  as="select" onChange={event => this.changeCategoria(event.target.value)}>

						{this.state.categorias_data.map ((categoria) => 
							<option selected={this.select(categoria.nombre)} value={categoria.index}>{categoria.nombre}</option>
						)}
				      
				    </Form.Control>
				</Form.Group>
				<Form.Group>
					<Form.Label>Nombre</Form.Label>
					<Form.Control style={field} value={this.state.name} onChange={event => this.changeName(event.target.value)} />
				</Form.Group>
				<Form.Group>
					<Form.Label>Descripcion</Form.Label>
					<Form.Control as="textarea" rows="10" style={field} value={this.state.description} onChange={event => this.changeDescription(event.target.value)}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Estado</Form.Label>
					<Form.Control style={field} as="select" onChange={event => this.changeEstado(event.target.value)}>
						<option selected="selected" value={200}>Disponible</option>
						<option value={400}>En uso</option>
						<option value={500}>Fuera de Servicio</option>
				    </Form.Control>
				</Form.Group>
			</div>
		);
	}

}