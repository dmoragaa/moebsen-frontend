
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Reservas from './Reservas';
var React = require('react');

class Reserva extends React.Component{
    constructor(props){
        super(props);
        this.state = {historial:""};

    }

/*get_historial(obj){
    var lista = []
    lista.push(obj.id)

}*/

render(){
    return(
        <Router>
            <Switch>
                <Route path = "/reservas">
                 <Reservas />
                 </Route>
                 <Redirect  to="/reservas/dashboard" exact/>
            </Switch>
                 
        </Router>

       
        );
    }
};

export default Reserva