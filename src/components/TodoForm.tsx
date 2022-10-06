import { useState } from 'react';

interface TodoFormProps {
  onAdd(title: string): void;
}

export const TodoForm: React.FC<TodoFormProps> = (props) => {
  const [title, setTitle] = useState<string>('')

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const clickHandler = (event: any) => {
    event.preventDefault();
    props.onAdd(title);
    setTitle('');
  } 

  return (
    <div className="todo__form">
      <label className="todo__form-label">
        <input
          value={title}
          onChange={changeHandler}
          type="text"
          placeholder="What to do next?"
        />
      </label>
      <button onClick={clickHandler}>
        Add
      </button>
    </div>
  )
}