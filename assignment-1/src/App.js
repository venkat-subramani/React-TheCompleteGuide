import React, { Component } from 'react';
import './App.css';

import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {
  state = {
    users: [{
      name: "Henry",
      age: 29
    },{
      name: "Stella",
      age: 25
    }]
    
  }

  nameChangedHandler = (event) => {
    this.setState({
      users: [{
        name: event.target.value,
        age: 29
      },{
        name: "Hari",
        age: 25
      }]
    })
  }

  render() {
    return (
      <div className="App">
        <h1>React App</h1>
        <UserInput change={this.nameChangedHandler} currentName={this.state.users[0].name} />
        <UserOutput userName={this.state.users[0].name} age={this.state.users[0].age} />
        <UserOutput userName={this.state.users[1].name} age={this.state.users[1].age} />
      </div>
    );
  }
}

export default App;
