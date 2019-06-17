import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';

class App extends Component {

    constructor() {
        super();
        this.state = {
            newTodo: '',
            editing: false,
            editingIndex: null,
            todos: [{
                id:1, name: 'Write some code'
            },
                {
                id: 2, name: 'Drink water'
            }, {
                id: 3, name: 'Breathe'
            }]
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTodo = this.addTodo.bind(this); 
        this.deleteTodo = this.deleteTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.generateTodoId = this.generateTodoId.bind(this);
    }

    handleChange(event) {
        this.setState({
            newTodo: event.target.value
        });
    }

    addTodo() {
        const newTodo = {
            name: this.state.newTodo,
            id: this.generateTodoId
        };

        const updatedTodos = [...this.state.todos, newTodo];
        this.setState({ todos: updatedTodos, newTodo: '' });

        console.log(this.state.todos);
        console.log(updatedTodos);
    }

    deleteTodo(index) {
        const stateCopy = _.cloneDeep(this.state);
        const todosCopy = [...stateCopy.todos];
        todosCopy.splice(index, 1);
        this.setState({ todos: todosCopy });   
    }

editTodo(index) {
        const todo = this.state.todos[index];
        this.setState({ newTodo: todo.name, editing: true, editingIndex: index });
    }

    updateTodo() {
        const stateCopy = _.cloneDeep(this.state);
        const todo = stateCopy.todos[this.state.editingIndex];
        todo.name = stateCopy.newTodo;
        const todos = stateCopy.todos;

        todos[this.state.editingIndex] = todo;
        this.setState({ todos: todos, editing: false, editingIndex: null, newTodo: '' });
    }

    generateTodoId() {
        const lastTodo = this.state.todos.length - 1;
        if (lastTodo) {
            return lastTodo + 1;
        } else {
            return 1;
        }
    }

    render() {
        console.log(this.state.newTodo);
        return (
            
            <div className="container">
               
                <h2 className="text-center p4">To do:</h2>
                <button
                    className="btn-info mb-3 form-control"
                    onClick={this.state.editing ? this.updateTodo : this.addTodo}
                >
                    {this.state.editing ? 'Update todo' : 'Add todo'}
                    </button>
                <input
                    type="text"
                    name="todo-input"
                    className="my-4 form-control"
                    placeholder="Add a new todo"
                    onChange={this.handleChange}
                    value={this.state.newTodo}
                />
                { 
                   !this.state.editing && <ul className="list-group">
                        {this.state.todos.map((item, index) => {
                            return <li
                                key={item.id} className="list-group-item">
                                <button
                                    className="btn-sm mr-4 btn btn-info"
                                    onClick={() => { this.editTodo(index); }}>U</button>
                                {item.name}
                                <button
                                    className="btn-sm ml-4 btn btn-danger"
                                    onClick={() => { this.deleteTodo(index); }}>X</button>
                            </li>
                        })}
                    </ul>}
                </div>
      
        );
    }
}
export default App;
