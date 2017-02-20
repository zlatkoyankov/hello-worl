import React, { Component } from 'react';
import logo from './logo.svg';

import { TodoForm, TodoList, Footer } from './components/todo/';
import { addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos } from './lib/todoHelpers';
import { pipe, partial } from './lib/utils';
import { loadTodos, createTodo } from './lib/todoService';

import './App.css';

class App extends Component {

  state = {
    todos: [],
    currenTodo: ''
  }

  static contextTypes = {
    route: React.PropTypes.string
  }

  componentDidMount() {
    loadTodos()
      .then(todos => this.setState({todos}));
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
    });
    createTodo(newTodo).then(() => this.showTempMessage('Todo added'));
  }

  showTempMessage = (msg) => {
    this.setState({message: msg}); 
    setTimeout(() => this.setState({message: ''}), 2500);
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
    const displyList = filterTodos(this.state.todos, this.context.route);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todo applicarion</h2>
        </div>
        <div className="Todo-App">
          {this.state.errorMessage && <span className="errorMessage">{this.state.errorMessage}</span>}
          {this.state.message && <span className="success">{this.state.message}</span>}
          <TodoForm 
              hadnlerInputChange={this.hadnlerInputChange} 
              currenTodo={this.state.currenTodo} 
              handleSubmit={submitHandler} />
          <TodoList 
            handleToggle={this.handleToggle} 
            handleRemove={this.handleRemove}
            todos={displyList} />

          <Footer />
          
        </div>
      </div>
    );
  }
}

export default App;
