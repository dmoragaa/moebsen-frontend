import React, { Component } from 'react';
import {ViewEquipamiento} from './equipamiento/ViewEquipamiento';
import {AddEquipamiento} from './equipamiento/AddEquipamiento';
import {MainCategorias} from './categorias/Main_view_categorias';
import Button from 'react-bootstrap/Button';


export class MainEquipamiento extends Component {

	constructor(props){
		super(props);
	    this.state = {
	    	selector: 0,
	    	exito_guardar: false,
	    	hide_create: false
	    };
	    this.addEquipamiento = React.createRef();
	}

	volver(){
		this.setState({
			selector: 0,
			exito_guardar: false
		});
	}

	go(value){
		this.setState({
			selector: value
		});
	}

	guardar_equipamiento(){

		this.addEquipamiento.current.save();

		this.setState({
			exito_guardar: true
		});
	}

	hide_create_equipamiento(){
		this.setState({
			hide_create: true
		});
	}

	unhide_create_equipamiento(){
		this.setState({
			hide_create: false
		});
	}


//importante, dato de como realizar la comunicacion desde hijos a padres: https://www.pluralsight.com/guides/how-to-handle-communication-between-parent-and-child-components-in-reactjs
	render() {
		
		return (
			<div>
				{
					this.state.selector == 0 ? 
					(
						<div>
							{
								this.state.hide_create ? (null) : (
									<h1>Equipamiento</h1>
								)
							}
							
							<div>
								<ViewEquipamiento
								hide_button = {this.hide_create_equipamiento.bind(this)}
								unhide_button = {this.unhide_create_equipamiento.bind(this)}
								/>
							</div>
							{
								this.state.hide_create ? (null) : (
									<div>
										<Button variant="primary" onClick={ () => {this.go(1)}} >Agregar equipamiento</Button> {' '}
										<Button variant="primary" onClick={ () => {this.go(2)}} >Administrar Categorias</Button>
									</div>
									)
							}
							
						</div>
					) : null
				}
				{
					this.state.selector == 1 ? 
					(
						<div>
							<div>
								<AddEquipamiento
									ref = {this.addEquipamiento}
								/>
							</div>

							<div>

								<Button variant="primary" onClick={ () => {this.guardar_equipamiento()}} >Guardar</Button> {' '}
								<Button variant="light" onClick={ () => {this.volver()}} >Volver</Button> 
							</div>

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

				{
					this.state.selector == 2 ? (
						<div>
							<MainCategorias
								volver_equipamiento = {this.volver.bind(this)}
							/>
						</div>
						) : null
				}
				
			</div>
		);
	}

}