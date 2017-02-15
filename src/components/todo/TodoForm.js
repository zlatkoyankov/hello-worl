import React, { PropTypes } from 'react';

export const TodoForm = (props) => (
	<form onSubmit={props.handleSubmit} >
        <input 	type="text" 
        		onChange={props.hadnlerInputChange} 
        		value={props.currenTodo} />
    </form>)

TodoForm.proptypes = {
	hadnlerInputChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	currenTodo: PropTypes.string.isRequired 
}