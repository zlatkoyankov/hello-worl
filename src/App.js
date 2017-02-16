import React, { Component } from 'react';
import logo from './logo.svg';

import { TodoForm, TodoList, Footer } from './components/todo/';
import { addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo } from './lib/todoHelpers';
import { pipe, partial } from './lib/utils';

import './App.css';

class App extends Component {

  state = {
    todos: [
      {id: 1, text: 'some todo', isComplete: false},
      {id: 2, text: 'other todo', isComplete: false},
      {id: 3, text: 'and some more todo', isComplete: true}
    ],
    currenTodo: ''
  }

  handleRemove = (id, event) => {
    event.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id);
    this.setState({ todos: updatedTodos });
  }

  handleToggle = (id) => {
    const getUpdatedTodo = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos));
    const updatedTodos = getUpdatedTodo(id, this.state.todos);
    this.setState({
      todos: updatedTodos
    })
  }

  handleSubmit = (event) => {
    //console.log('app handle submit handler');
    event.preventDefault();
    const newId = generateId();
    const newTodo = {id: newId, text: this.state.currenTodo, isComplete: false};
    const newTodos = addTodo(this.state.todos, newTodo);
    this.setState({
      todos: newTodos,
      currenTodo: '',
      errorMessage: ''
    })
  }

  handleEmptySubmit = (event) => {
    event.preventDefault();
    this.setState({
      errorMessage: 'Enter valid value in the text field'
    })
  }

  hadnlerInputChange = (event) => {
    this.setState({
      currenTodo: event.target.value
    });

    //console.log(this.state.currenTodo);
  }

  render() {
    const submitHandler = this.state.currenTodo ? this.handleSubmit : this.handleEmptySubmit;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todo applicarion</h2>
        </div>
        <div className="Todo-App">
          {this.state.errorMessage && <span className="errorMessage">{this.state.errorMessage}</span>}
          <TodoForm 
              hadnlerInputChange={this.hadnlerInputChange} 
              currenTodo={this.state.currenTodo} 
              handleSubmit={submitHandler} />
          <TodoList 
            handleToggle={this.handleToggle} 
            handleRemove={this.handleRemove}
            todos={this.state.todos} />

          <Footer />
          
        </div>
      </div>
    );
  }
}

export default App;
