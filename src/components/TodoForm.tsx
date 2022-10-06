import { useState } from 'react';

interface TodoFormProps {
  onAdd: (title: string) => void;
}

export const TodoForm: React.FC<TodoFormProps> = (props) => {
  const [title, setTitle] = useState<string>('')

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }

  const clickHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    props.onAdd(title);
    setTitle('');
  } 

  return (
    <div className="todo__form">
      <input
        value={title}
        onChange={changeHandler}
        type="text"
        placeholder="What to do next?"
        className="todo__form-input"
      />
      <button onClick={clickHandler} className="todo__form-button">
        Add
      </button>
    </div>
  )
}