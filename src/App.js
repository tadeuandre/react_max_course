import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {persons: [
    {id: 0, name: 'Max', age: 28 },
    {id: 1, name: 'Manu', age: 29 },
    {id: 2, name: 'Stephanie', age: 30 }
    ],
    showPersons: false
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = { ...this.state.persons[personIndex] };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons })
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        {name: newName},
        {name:'Manu', age: 29},
        {name:'Stephanie', age:30}
      ]
    })
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }
/* 
  changeNameAll = (event) => {
    this.state.setState({persons: [
      {name: event.target.value},
      {name: event.target.value},
      {name: event.target.value}
    ]});
  } */

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  render() {
    const style = {
      background: 'white',
      font: 'inherit',
      border: '1px solid border',
      padding: '8px',
      cursor: 'pointer',
     ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      } 
    }

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
            click={() => this.deletePersonHandler(index)}
            name={person.name} 
            age={person.age}
            key={index}
            changed={(event) => this.nameChangedHandler(event, person.id)}></Person>
          })}
        </div>
      );

      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      };
    }

    const classes = [];

    if (this.state.persons.length <= 2) {
      classes.push('red');
    }

    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <header className="App-header">
          <p className={classes.join(' ')}>This is really working!</p>
          <button className="button" style={style} onClick={this.togglePersonsHandler}>Toggle Persons</button>
          {/* <input change={this.changeNameAll} /> */}
          {persons}
        </header>
      </div>
    );
  }
}

export default App;
