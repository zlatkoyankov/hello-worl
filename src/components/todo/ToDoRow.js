import React, { Component, PropTypes } from 'react';
import { partial } from '../../lib/utils';

class ToDoRow extends Component {
	handleToggle = partial(this.props.handleToggle, this.props.id);
	handleRemove = partial(this.props.handleRemove, this.props.id)
	render() {
		return (
			<li key="{this.props.id}">
				<button className="delete-item" 
					onClick={this.handleRemove}>X</button>
				<input type="checkbox"
					onChange={this.handleToggle}
					checked={this.props.isComplete} />
				{this.props.text}
				
			</li>
			);
	}
}

ToDoRow.proptypes = {
	isComplete: PropTypes.bool,
	text: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired
}

export { ToDoRow };