interface TodoProgressProps {
  progressCompleted: number;
  progressFull: number;
}

export const TodoProgress: React.FC<TodoProgressProps> = ({progressCompleted, progressFull}) => {
  const calcPercent = progressCompleted * 100 / progressFull;

  return (
    <div className="todo__progress">
      <h4 className="todo__progress-heading">
        Completed: {progressCompleted} / {progressFull}
      </h4>
      <div className="todo__progress-bar">
        <div className="todo__progress-bar-completed" style={{width: `${calcPercent}%`}}></div>
      </div>
    </div>
  )
}