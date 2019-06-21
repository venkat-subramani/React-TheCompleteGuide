import React, { Component } from 'react';
import './App.css';

import Validation from './Validation/Validation';
import Char from './Char/Char';

class App extends Component {
  state = {
    textInput: ''
  }

  changeHandler = (event) => {
    this.setState({
      textInput: event.target.value
    })
  }

  deleteCharHandler = ( index ) => {
    const text = this.state.textInput.split('');
    text.splice(index, 1);
    const updatedText = text.join('');
    this.setState({userInput: updatedText});
  }

  render() {
    const charList = this.state.textInput.split('').map((ch, index) => {
      return <Char 
        char={ch} 
        key={index}
        clicked={() => this.deleteCharHandler(index)} />;
    });

    return (
      <div className="App">
        <h1>Assignment 2</h1>
        <input type="text" onChange={this.changeHandler} value={this.state.textInput} />
        <p>{this.state.textInput.length}</p>
        <Validation text={this.state.textInput} />
        {charList}
      </div>
    );
  }
}

export default App;
