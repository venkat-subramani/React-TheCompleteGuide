import React, { Component } from 'react';
//import Radium, {StyleRoot} from 'radium';
//import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import classes from './App.css';

import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Aux';
import WithClass from '../hoc/WithClass';
import withClass from '../hoc/withClass2';

export const AuthContext = React.createContext(false);

class App extends Component {
  constructor(props){
    super(props);
    console.log('[App.js] inside constructor()', props);
    this.state = {
      persons: [
        {id: 1,name: "Max", age: 28},
        {id: 2,name: "venkat", age: 24},
        {id: 3,name: "Pooja", age: 23}
      ],
      otherState: "Some other value",
      showPersons: false,
      toggleClicked: 0,
      authenticated: false
    }
  }

  componentWillMount(){
    console.log('[App.js] inside componentWillMount()');
  }

  componentDidMount(){
    console.log('[App.js] inside componentDidMount()');
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('Update [App.js] inside shouldComponentUpdate()', nextProps, nextState);
    return true;
  }

  componentWillUpdate(nextProps, nextState){
      console.log('Update [App.js] inside componentWillUpdate()', nextProps, nextState);
  }

  componentDidUpdate(){
      console.log('Update [App.js] inside componentDidUpdate()');
  }

  static getDerivedStateFromProps(nextProps, prevState){
    console.log('Update [App.js] inside getDerivedStateFromProps()', nextProps, prevState);
    return prevState;
  }

  getSnapshotBeforeUpdate() {
    console.log('Update [App.js] inside getSnapshotBeforeUpdate()');
  }

  nameChangedHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    const person = {
      ...this.state.persons[personIndex]
    }

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons })
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( (prevState, props) => {
      return{
         showPersons: !doesShow,
         toggleClicked: prevState.toggleClicked + 1
      }
    })
  }

  loginHandler = () => {
    this.setState({authenticated: true})
  }

  render() {
    console.log('[App.js] Inside render()');
    let persons = null;
    if( this.state.showPersons ){
      persons = <Persons 
            persons={this.state.persons} 
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler} />
    }

    return (
      <Aux>
        {this.state.toggleClicked}
        <button onClick={() => this.setState({showPersons: true})}>Show Persons</button>
        <Cockpit 
          appTitle={this.props.title}
          showPersons={this.state.showPersons} 
          persons={this.state.persons} 
          login={this.loginHandler}
          clicked={this.togglePersonsHandler} />
        <AuthContext.Provider value={this.state.authenticated}>{persons}</AuthContext.Provider>
      </Aux>
    );
  }
}

export default withClass(App, classes.App);
//export default Radium(App);
