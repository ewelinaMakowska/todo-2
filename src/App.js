import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            newTodo: '',
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
    }

    handleChange(event) {
        this.setState({
            newTodo: event.target.value
        });
       /* console.log(event.target.name, event.target.value); */
    }

    addTodo() {
        const newTodo = {
            name: this.state.newTodo,
            id: this.state.todos[this.state.todos.length - 1].id + 1
        };

        const updatedTodos = [...this.state.todos, newTodo];
        this.setState({ todos: updatedTodos, newTodo: '' });

        console.log(this.state.todos);
        console.log(updatedTodos);
    }

    deleteTodo(index) {
        console.log(index);
        const todosToUpdate = [...this.state.todos];
        console.log(todosToUpdate);
        const filteredTodos = todosToUpdate.filter(todo => { return todo.id !== index+1 });
        console.log(filteredTodos);
        this.setState({ todos: filteredTodos });
        console.log(this.state.todos);
        
    }

    render() {
        console.log(this.state.newTodo);
        return (
            
            <div className="container">
               
                <h2 className="text-center p4">To do:</h2>
                <button
                    className="btn-info mb-3 form-control"
                    onClick={this.addTodo}
                >
                    Add todo
                    </button>
                <input
                    type="text"
                    name="todo-input"
                    className="my-4 form-control"
                    placeholder="Add a new todo"
                    onChange={this.handleChange}
                    value={this.state.newTodo}
                />
                    <ul className="list-group">
                        {this.state.todos.map((item, index) => {
                        return <li
                            key={item.id} className="list-group-item">{item.name}
                            <button
                                className="btn-sm ml-4 btn btn-danger"
                                onClick={() => { this.deleteTodo(index); }}>X</button>
                        </li>
                        })}
                    </ul>
                </div>
      
        );
    }
}
export default App;
