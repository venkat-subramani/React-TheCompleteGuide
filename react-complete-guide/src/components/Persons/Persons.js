import React, { PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent{
    constructor(props){
        super(props);
        console.log('[Persons.js] inside constructor()', props);
        this.lastPersonRef = React.createRef();
      }
    
    componentWillMount(){
        console.log('[Persons.js] inside componentWillMount()');
    }

    componentDidMount(){
        console.log('[Persons.js] inside componentDidMount()');
        this.lastPersonRef.current.focus();
    }

    componentWillReceiveProps(nextProps) {
        console.log('Update [Persons.js] inside componentWillReceiveProps()', nextProps);
    }

    /* shouldComponentUpdate(nextProps, nextState){
        console.log('Update [Persons.js] inside shouldComponentUpdate()', nextProps, nextState);
        //return true;
        return nextProps.persons !== this.props.persons;
    } */

    componentWillUpdate(nextProps, nextState){
        console.log('Update [Persons.js] inside componentWillUpdate()', nextProps, nextState);
    }

    componentDidUpdate(){
        console.log('Update [Persons.js] inside componentDidUpdate()');
    }
    
    render() {
        console.log('[Persons.js] inside render()');
        return (
            this.props.persons.map((person, index) => {
                return (
                    <Person 
                        key={person.id}
                        forwardedRef={this.lastPersonRef}
                        click={() => this.props.clicked(index)}
                        name={person.name} 
                        age={person.age} 
                        changed={(event) => this.props.changed(event, person.id)} />
                )
            })
        )
    }
};

export default Persons;