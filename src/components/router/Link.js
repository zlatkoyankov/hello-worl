import React, { Component, PropTypes } from 'react';

export class Link extends Component {
	static contextTypes = {
		route: React.PropTypes.string,
		linkHandler: React.PropTypes.func
	}

	handleClick = (event) => {
		event.preventDefault();
		this.context.linkHandler(this.props.to)
	}

	render() {
		const activeClass = this.context.route === this.props.to ? 'active' : '';
		return (
			<a href="#" onClick={this.handleClick} className={activeClass}>{this.props.children}</a>
		);
	}
}

Link.propTypes = {
	to: PropTypes.string.isRequired
}