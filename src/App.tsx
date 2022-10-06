import { useState, useEffect } from 'react';
import './App.css';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { ITodo } from './interfaces';


const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[];
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addHandler = (title: string) => {
    const newTodo: ITodo = { 
      id: Date.now(),
      title: title,
      complete: false
    };

    setTodos([newTodo, ...todos]);
  };

  const toggleHandler = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          complete: !todo.complete,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  const removeHandler = (id: number) => {
    const updatedTodo = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(updatedTodo);
  }

  return (
    <div className="todo__container">
      <h1>To Do List</h1>

      <TodoForm onAdd={addHandler}/>
      <TodoList
        todos={todos}
        onToggle={toggleHandler}
        onDelete={removeHandler}
      />
    </div>
  );
}

export default App;
