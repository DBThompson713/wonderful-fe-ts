import React from 'react';
import './styles.css';
import { Todo } from './../../api/todos'; 

interface ProgressBarProps {
  todos: Todo[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ todos }) => {
  const completedTodos = todos.filter(todo => todo.completed);
  const totalTodos = todos.length;
  const percentageCompleted = totalTodos > 0 ? (completedTodos.length / totalTodos) * 100 : 0;

  return (
    <div className="progress-bar">
      <div className="progress-bar-fill" style={{ width: `${percentageCompleted}%` }}></div>
    </div>
  );
};

export default ProgressBar;
