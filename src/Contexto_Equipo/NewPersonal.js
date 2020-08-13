import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class NewPersonal extends Component {

    state = {
        nombre: '',
        rut: '',
        area: '',
        redirectToReferrer: false,
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post('https://inf225-personal.herokuapp.com/personal', this.state)
            .then(res => {
                console.log(res)
                this.setState({redirectToReferrer: true})
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {

        const nombre = this.state.nombre
        const rut = this.state.rut
        const area = this.state.area
        const redirectToReferrer = this.state.redirectToReferrer

        if (redirectToReferrer === true) {
            return <Redirect to="/personal" />
        }

        return (

            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <label>
                            Nombre
                            <input type="text" name="nombre" value={nombre} onChange={this.changeHandler} />
                        </label>
                    </div>
                    <div>
                        <label>
                            RUT
                            <input type="text" name="rut" value={rut} onChange={this.changeHandler} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Area
                            <input type="text" name="area" value={area} onChange={this.changeHandler} />
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form>

            </div>

        )
    }
}

export default NewPersonal