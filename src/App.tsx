import { useState, useEffect } from 'react';
import './App.css';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { ITodo } from './interfaces';
import { filters } from './constance';

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>(JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[]);

  const [filter, setFilter] = useState<string>("All");

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

  const editCompleteHandler = (id: number, title: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title: title,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  const changeFilterHandler = (filter: string) => {
    setFilter(filter);
  }

  const visibleTodos = todos.filter(filters[filter as keyof typeof filters]);

  return (
    <div className="todo__container">
      <h1 className="todo__heading">To Do List</h1>

      <TodoForm onAdd={addHandler}/>

      <div className="todo__nav">
        <TodoFilter onFilter={changeFilterHandler} />
        {todos.length > 0 && <div className="todo__progress">Your progress: {todos.filter(filters.Completed).length} / {todos.length}</div>}
      </div>

      <TodoList
        todos={visibleTodos}
        onToggle={toggleHandler}
        onDelete={removeHandler}
        onEditComplete={editCompleteHandler}
      />
    </div>
  );
}

export default App;
