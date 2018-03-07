import React, { Component } from 'react';
import TodoList from '../todo-list/todo-list';
import TodoFooter from '../todo-footer/todo-footer';

export default class TodoApp extends Component {
    actions = ['All', 'Active', 'Completed'];
    prevState = {};
    constructor() {
        super();
        this.state = this.prevState = {
            container: {
                todo: {
                    id: 0,
                    value: '',
                    completed: false
                },
                todos: [],
                activeState: 'All'
            }
        };
        this.getTodos = this.getTodos.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateState = this.updateState.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
    }

    getTodos(type) {
        switch (type) {
            case 'All':
                return this.prevState.container.todos;
            case 'Active':
                return this.prevState.container.todos.filter(todo => !todo.completed);
            case 'Completed':
                return this.prevState.container.todos.filter(todo => todo.completed);
        }
    }

    addTodo(e) {
        e.preventDefault();
        if (this.prevState.container.todo.value) {
            // Done as get separate references in order to reset value
            this.prevState.container.todos.unshift(Object.assign({}, this.prevState.container.todo));
            this.setState({
                container: this.prevState.container
            });
            // Resetting value
            this.prevState.container.todo.value = '';
            this.prevState.container.todo.id++;
        } else {
            alert('Please enter some value');
        }
    }

    handleChange(e) {
        this.prevState.container.todo.value = e.target.value;
        this.setState({
            container: this.prevState.container
        });
    }

    updateState(state) {
        this.prevState.container.activeState = state;
        this.setState({
            container: this.prevState.container
        });
    }

    updateTodo(todo) {
        this.setState({
            container: this.prevState.container
        });
    }

    render() {
        return (
            <div className="todo-container">
                <h1>Todos</h1>
                <form onSubmit={this.addTodo} autoComplete="off">
                    <input type="text" placeholder="What needs to be done?"
                        className="todo-input form-control" name="todo" id="todo"
                        value={this.state.container.todo.value} onChange={this.handleChange} />
                </form>
                <ul className="todo-list">
                    {this.getTodos(this.state.container.activeState).map((todo, index) => {
                        return <TodoList updateTodo={this.updateTodo} key={todo.id} todo={todo} />
                    })}
                </ul>
                <TodoFooter actions={this.actions} activeCount={this.getTodos('Active').length} updateState={this.updateState} />
            </div>
        )
    }
}