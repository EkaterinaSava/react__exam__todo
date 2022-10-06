import { ITodo } from '../interfaces';

interface TodoListProps {
  todos: ITodo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  if (todos.length === 0) {
    return <p className="todo__empty">Add your first todo!</p>
  }

  return (
    <ul>
      {todos.map(todo => {
        return (
          <li className="todo__item" key={todo.id}>
            <label className={ todo.complete ? "todo__item-inner completed" : "todo__item-inner" }>
              <input
                className="todo__item-checkbox"
                type="checkbox"
                checked={todo.complete}
                onChange={() => onToggle(todo.id)}
              />
              <span className="todo__item-text">{todo.title}</span>
            </label>

            {/* <div className="todo__item-edit" onClick={() => editTodo(todo)}></div> */}

            <div className="todo__item-delete" onClick={() => onDelete(todo.id)}></div>
          </li>
        )
      })}
    </ul>
  )
}