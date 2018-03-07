import React, { Component } from 'react';
import List from '../list/list';
import './todo.css';

export default class Todo extends Component {
    todos = [];
    todoId = 0;
    zeroState = {
        id: 0,
        value: '',
        isActive: true
    };
    constructor() {
        super();
        this.state = {
            todo: this.zeroState
        };

        this.addTodo = this.addTodo.bind(this);
        this.setTodo = this.setTodo.bind(this);
    }
    setTodo(e) {
        this.setState({
            todo: {
                id: this.todoId,
                value: e.target.value,
                isActive: true
            }
        });
    }
    addTodo(e) {
        e.preventDefault();
        if (this.state.todo.value) {
            this.todos.unshift(this.state.todo);
            this.setState({
                todo: this.zeroState
            });
            this.todoId++;
        } else {
            alert('Please enter some value');
        }
    };
    render() {
        return (
            <div className="todo-container">
                <h1>Todos</h1>
                <form onSubmit={this.addTodo} autoComplete="off">
                    <input type="text" placeholder="What needs to be done?"
                        className="todo-input form-control" name="todo" id="todo"
                        value={this.state.todo.value} onChange={this.setTodo} />
                </form>
                <List todos={this.todos} />
            </div>
        );
    }
}