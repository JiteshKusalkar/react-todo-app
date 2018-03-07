import React, { Component } from 'react';

export default class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: this.props.todo
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.todo.completed = e.target.checked;
        this.setState({
            todo: this.props.todo
        });
        this.props.updateTodo(this.props.todo);
    }

    render() {
        return (
            <li className="item form-check" key={this.props.todo.id}>
                <input type="checkbox"
                    id={this.props.todo.id}
                    name={this.props.todo.value}
                    value={this.state.todo.value}
                    checked={this.state.todo.completed}
                    onChange={this.handleChange}
                    className="form-check-input" />
                <label htmlFor={this.props.todo.id} className="form-check-label">{this.props.todo.value}</label>
            </li>
        )
    }
}