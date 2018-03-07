import React, { Component } from 'react';
import './list.css';

export default class List extends Component {
    todos = {};
    constructor(props) {
        super(props);
        this.actions = ['All', 'Active', 'Completed'];
        this.activeState = 'All';
        this.state = {
            activeState: this.activeState,
            todos: this.props.todos
        };
        this.handleChange = this.handleChange.bind(this);
        this.stateChange = this.stateChange.bind(this);
    }

    handleChange(todo) {
        this.setState({
            activeState: this.activeState,
            todos: this.props.todos.map((t) => {
                if (t.id === todo.id) {
                    t.isActive = !t.isActive;
                }
                return t;
            })
        });
    };

    stateChange(state) {
        this.activeState = state;
        this.setState({
            activeState: state,
            todos: this.todos.getAll()
        });
    }

    render() {
        this.state = {
            activeState: this.activeState,
            todos: this.props.todos
        };
        this.todos = {
            active: this.state.todos.map((todo) => {
                if (todo.isActive) {
                    return (<li className="item form-check" key={todo.id}>
                        <input type="checkbox"
                            id={todo.id}
                            name={todo.value}
                            value={todo.value}
                            checked={!todo.isActive}
                            onChange={() => this.handleChange(todo)}
                            className="form-check-input" />
                        <label htmlFor={todo.id} className="form-check-label">{todo.value}</label>
                    </li>);
                }
                return null;
            }).filter(e => e),
            completed: this.state.todos.map((todo) => {
                if (!todo.isActive) {
                    return (<li className="item form-check" key={todo.id}>
                        <input type="checkbox"
                            id={todo.id}
                            name={todo.value}
                            value={todo.value}
                            checked={!todo.isActive}
                            onChange={() => this.handleChange(todo)}
                            className="form-check-input" />
                        <label htmlFor={todo.id} className="form-check-label">{todo.value}</label>
                    </li>);
                }
                return null;
            }).filter(e => e),
            getAll: () => {
                return this.todos.active.concat(this.todos.completed);
            }
        };
        return (
            this.props.todos.length ?
                (<div>
                    <ul className="todo-list">
                        {this.state.activeState === 'Active' ? this.todos.active : (this.state.activeState === 'Completed' ? this.todos.completed : this.todos.getAll())}
                    </ul>
                    <footer className="text-left footer">
                        <span>{this.todos.active.length > 1 ? this.todos.active.length + ' items left' : this.todos.active.length + ' item left'}</span>
                        <span className="action">
                            {this.actions.map((action, index) => {
                                return (<a key={index} href="javascript:void(0)" onClick={() => this.stateChange(action)} className={`action-key ${this.state.activeState === action ? 'active' : ''}`}>{action}</a>)
                            })}
                        </span>
                    </footer>
                </div>) : null
        )
    }
}