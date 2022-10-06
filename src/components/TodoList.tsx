import { useState } from 'react';
import { ITodo } from '../interfaces';

interface TodoListProps {
  todos: ITodo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEditComplete: (id: number, title: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onEditComplete }) => {
  const [editableTodo , setEditableTodo] = useState<ITodo | null>(null);
  const [value, setValue] = useState<string>('');

  if (todos.length === 0) {
    return <p className="todo__empty">Add your first todo!</p>
  }

  const onEditClickHandler = (todo: ITodo) => {
    if (!editableTodo) {
      setEditableTodo(todo);
      setValue(todo.title);
    }
  }

  const onSaveClickHandler = () => {
    if (editableTodo) {
      onEditComplete(editableTodo.id, value);
    }
    setEditableTodo(null);
  }

  return (
    <ul>
      {todos.map(todo => {
        const isEditing = todo.id === editableTodo?.id;

        return (
          <li className="todo__item" key={todo.id}>
            <label className={ todo.complete ? "todo__item-inner completed" : "todo__item-inner" }>
              <input
                className="todo__item-checkbox"
                type="checkbox"
                checked={todo.complete}
                onChange={() => onToggle(todo.id)}
              />

              {
                isEditing ?
                <input type="text" placeholder='Edit todo' value={value} onChange={(e) => setValue(e.target.value)} />
                : <span className="todo__item-text">{todo.title}</span>
              }
              
            </label>

            {
              isEditing ?
              <div className="todo__item-save" onClick={() => onSaveClickHandler()}>save</div>
              : <div className="todo__item-edit" onClick={() => onEditClickHandler(todo)}></div>
            }

            <div className="todo__item-delete" onClick={() => onDelete(todo.id)}></div>
          </li>
        )
      })}
    </ul>
  )
}