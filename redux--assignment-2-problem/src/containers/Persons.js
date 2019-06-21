import React from 'react';
import { connect } from 'react-redux';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import * as actionTypes from '../store/actions';

const Persons = (props) => (
    <div>
        <AddPerson personAdded={props.onAddPerson} />
        {props.persons.map(person => (
            <Person 
                key={person.id}
                name={person.name} 
                age={person.age} 
                clicked={() => props.onDeletePerson(person.id)}/>
        ))}
    </div>
)

const mapStateToProps = state => {
    return {
        persons: state.persons
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onAddPerson: (name, age) => dispatch({ type: actionTypes.ADD_PERSON, person: {name: name, age: age} }),
        onDeletePerson: (id) => dispatch({ type: actionTypes.DELETE_PERSON, id: id })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Persons);