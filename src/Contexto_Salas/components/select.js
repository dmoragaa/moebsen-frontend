import Form from 'react-bootstrap/Form';


var React = require('react');

class Select extends React.Component{
    constructor(props){
        super(props);
    

    }



render(){
    

    const lista = this.props.ItemList;

    var todoItems = lista.map((obj) =>
  <option >{obj.name}</option>
    )

    return (
      <Form.Control value={this.props.res || this.props.res2} name ={this.props.name} onChange={this.props.onChange} as="select" placeholder={this.props.placeholder} >
        <option>{this.props.placeholder}</option>
                   {todoItems}
                  </Form.Control>
      
      
      );
    



}
}
export default Select