import React, { PropTypes } from 'react';
import { ToDoRow } from './ToDoRow';

export const TodoList = (props) => {
	return (
		<div className="todo-list">
            <ul>
              {props.todos.map(todo => <ToDoRow 
                  key={todo.id} 
                  handleToggle={props.handleToggle}
                  handleRemove={props.handleRemove}
                  {...todo}/>)}
            </ul>
        </div>
	)
}

TodoList.proptypes = {
	todos: PropTypes.array.isRequired
}