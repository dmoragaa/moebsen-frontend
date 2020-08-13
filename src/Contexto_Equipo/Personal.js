import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import axios from 'axios'
import { Button } from 'reactstrap';

class Personal extends Component {
  state = {
    isLoading: true,
    groups: [],
    id: '',
  };

  // GET REQUEST
  async componentDidMount() {
    axios.get('https://inf225-personal.herokuapp.com/personal')
      .then(res => {
        this.setState({groups: res.data, isLoading: false });
      })
  }

  // PUT REQUEST
  editItem = event => {
    event.preventDefault();
    this.props.history.push(`/edit_personal/${this.state.id}`);
  }
  

  // DELETE REQUEST
  deleteUser(userId) {      
    axios.delete(`https://inf225-personal.herokuapp.com/personal/` + userId)
      .then(res => {
        console.log(res);
        console.log(res.data);
        window.location.reload(false);
      })
  };   


  render() {
    const {groups, isLoading} = this.state;

    if (isLoading) {
      return <p>Cargando...</p>;
    }

    return (
      <div className="container">
          <div className="flex-row">
            <div className="flex-large">
              <h1>Informacion sobre el Personal</h1>
              <Table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>RUT</th>
                    <th>Area</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.groups.length > 0 ? (
                    this.state.groups.map((user) => (
                      <tr key={user.id}>
                        <td>{user.nombre}</td>
                        <td>{user.rut}</td>
                        <td>{user.area}</td>
                        <td>
                          <Link to={{
                            pathname:`/edit_personal/${user.id}`,
                            idProp:{
                              id: user.id
                            }
                          }}>
                            <Button color="primary">Editar</Button>
                          </Link>
                          <Button color="danger" type="submit" onClick={() => 
                            {
                              if(window.confirm('Esta seguro de querer eliminar este miembro del personal?'))this.deleteUser(user.id)}
                            }>Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>No existe personal registrado en el sistema</td>
                    </tr>
                  )}
                </tbody>
                <Link to ="/new_personal">
                    <Button color="primary">Agregar un nuevo miembro del personal</Button>
                </Link>
              </Table>
            </div>
          </div>
      </div>
    )
  }
}

export default Personal

