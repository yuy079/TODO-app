import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Title = ({todoCount}) => {
  return (
    <div>
       <div>
          <h1>to-do ({todoCount})</h1>
       </div>
    </div>
  );
}

const TodoForm = ({addTodo}) => {
  // Input Tracker
  let input;
  // Return JSX
  return (
    <form onSubmit={(e) => {
        e.preventDefault();
        addTodo(input.value);
        input.value = '';
      }}>
      <input className="" ref={node => {
        input = node;
      }} />
      <br />
    </form>
  );
};

const Todo = ({todo, remove}) => {
  // Each Todo
  return (<li href="#" className="" onClick={() => {remove(todo.text)}}>{todo.text}</li>);
}

const TodoList = ({todos, remove}) => {
  // Map through the todos
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove}/> )
  });

  return (<div className="" style={{marginTop:'30px'}}><ul className = "ul-noBullet">{todoNode}</ul></div>);
}


window.id = 0;
class App extends Component {
  constructor(props)
  {
    super(props);

    this.state = {
      data: []
    }
  }
  addTodo(val){
    // Assemble data
    const todo = {text: val}
    // Update data
    this.state.data.push(todo)
    this.setState({data: this.state.data})
  }
  // Handle remove
  handleRemove(id){
    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter((todo) => {
      if(todo.text !== id) return todo;
    });
    // Update state with filter
    this.setState({data: remainder});
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div>
          <Title todoCount={this.state.data.length}/>
          <TodoForm addTodo={this.addTodo.bind(this)}/>
          <TodoList
            todos={this.state.data}
            remove={this.handleRemove.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default App;
