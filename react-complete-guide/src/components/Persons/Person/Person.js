import React, {Component} from 'react';
import PropTypes from 'prop-types';
//import Radium from 'radium';
import classes from './Person.css';
import Aux from '../../../hoc/Aux';
import WithClass from '../../../hoc/WithClass';
import withClass from '../../../hoc/withClass2';

import { AuthContext } from '../../../containers/App';

class Person extends Component{
    constructor(props){
        super(props);
        console.log('[Person.js] inside constructor()', props);
        this.inputElement = React.createRef();
    }
    
    componentWillMount(){
        console.log('[Person.js] inside componentWillMount()');
    }

    componentDidMount(){
        console.log('[Person.js] inside componentDidMount()');
    }

    componentWillUnmount(){
        console.log('[Person.js] inside componentWillUnmount()');
    }

    focus() {
        this.inputElement.current.focus();
    }

    render() {
        console.log('[Person.js] inside render()');
        return (
            <Aux>
                <AuthContext.Consumer>
                    { auth => auth ? <p>I'm authenticated!</p> : null }
                </AuthContext.Consumer>
                <p onClick={this.props.click}>I'm {this.props.name} and I'm {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input 
                    ref={this.inputElement}
                    type="text" 
                    onChange={this.props.changed} 
                    value={this.props.name} />
            </Aux>
        )
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
}

export default withClass(Person, classes.Person);
//export default Radium(person);