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


const Todo = ({todo, remove, update, pri}) => {
  // Each Todo
  let input;
  let val = todo.text;
  return (<div>
            < input className=""
              ref={
                    node => {  input = node;}
                  }
              value = {val}
              onChange= {
                () => {
                        update(todo.text, input.value);
                      }
              }/>
            <button onClick = {() => {remove(todo.text)}}>remove</button>
            <button onClick = {() => {pri(todo.text)}}>prioritize</button>
          </div>);
    //<li href="#" className="" onClick={() => {remove(todo.text)}}><div>{todo.text}     <button>aa</button></div>);
}

const TodoList = ({todos, remove, update, pri}) => {
  // Map through the todos
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} remove={remove} update = {update} pri = {pri}/>)
  });

  return (<div className="" style={{marginTop:'30px'}}>{todoNode}</div>);
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
  handleRemove(text){
    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter((todo) => {
      if(todo.text !== text) return todo;
    });
    // Update state with filter
    this.setState({data: remainder});
  }

  handleUpdate(text, newtext){
    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter((todo) => {
      if(todo.text !== text) return todo;
      else
      {
        todo.text = newtext;
        return todo;
      }
    });
    // Update state with filter
    this.setState({data: remainder});
  }

  handlePri(text){
    // Filter all todos except the one to be removed
    const remainder =  [];
    const remainder1 = this.state.data.filter((todo) => {
      if(todo.text == text) remainder.push(todo);

    });

    const remainder2 = this.state.data.filter((todo) => {
      if(todo.text !== text) remainder.push(todo);

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
            update={this.handleUpdate.bind(this)}
            pri = {this.handlePri.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default App;
