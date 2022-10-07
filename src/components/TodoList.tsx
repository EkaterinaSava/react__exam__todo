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
  const [title, setTitle] = useState<string>('');

  if (todos.length === 0) {
    return <p className="todo__empty">Add your first todo!</p>
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }

  const onEdit = (todo: ITodo) => {
    if (!editableTodo) {
      setEditableTodo(todo);
      setTitle(todo.title);
    }
  }

  const onSave = () => {
    if (editableTodo) {
      onEditComplete(editableTodo.id, title);
    }
    setEditableTodo(null);
  }

  return (
    <ul className="todo__list">
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

              <div className="todo__item-checkbox-icon"></div>

              {
                isEditing ?
                <input className="todo__item-input" type="text" placeholder='Edit todo' value={title} onChange={onChangeInput} />
                : <span className="todo__item-text">{todo.title}</span>
              }
            </label>

            {
              isEditing ?
              <div className="todo__item-save" onClick={() => onSave()}></div>
              : <div className="todo__item-edit" onClick={() => onEdit(todo)}></div>
            }

            <div className="todo__item-delete" onClick={() => onDelete(todo.id)}></div>
          </li>
        )
      })}
    </ul>
  )
}