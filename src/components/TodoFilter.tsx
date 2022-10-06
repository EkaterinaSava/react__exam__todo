import { filters } from '../constance';

interface TodoFilterProps {
  onFilter: (filter: string) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = (props) => {

  const onChangeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.onFilter(event.target.value);
  } 

  return (
    <div className="todo__filter">
      <h4 className="todo__filter-heading">Filter</h4>
      <select className="todo__filter-select" onChange={onChangeFilter}>
        {Object.keys(filters).map((label) => <option key={label} value={label}>{label}</option>)}
      </select>
    </div>
  )
}