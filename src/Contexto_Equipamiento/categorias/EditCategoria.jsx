import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';


export class EditCategoria extends Component {

	constructor(props){
		super(props);
	    this.state = {
	    	name: this.props.name,
	    	description: this.props.description
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

	save(){
		var xhr = new XMLHttpRequest();
		xhr.addEventListener('load', () => {
      		console.log(xhr.responseText)
    	})
    	xhr.open('PUT', '/categorias');

    	xhr.setRequestHeader('Content-Type', 'application/json');
   
    	xhr.send(JSON.stringify({
    		idcategoria: this.props.id,
    		nombre: this.state.name,
    		descripcion: this.state.description,
    		estado: 80
    	}))
	}

	componentDidMount() {
		this.props.hide_button();
	}

	render() {
		

		const field = {
			width: '70vw',
			backgroundColor: '#F5F5F5'
		}

		return (
			<div>
				<h1>Editar una Categoria</h1>

				<Form.Group>
					<Form.Label>Nombre</Form.Label>
					<Form.Control style={field} value={this.state.name} onChange={event => this.changeName(event.target.value)} />
				</Form.Group>
				<Form.Group>
					<Form.Label>Descripcion</Form.Label>
					<Form.Control as="textarea" rows="10" style={field} value={this.state.description} onChange={event => this.changeDescription(event.target.value)}/>
				</Form.Group>

			</div>
		);
	}

}