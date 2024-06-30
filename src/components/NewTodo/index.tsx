import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css'

interface Todo {
  id: number;
  date: string;
  todo: string;
  completed: boolean;
}

interface NewTodoProps {
  onAddTodo: (newTodo: Todo) => void;
}

const NewTodo: React.FC<NewTodoProps> = ({ onAddTodo }) => {
  const [todo, setTodo] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo && date) {
      const newTodo: Todo = {
        id: Date.now(), 
        date: date.toISOString().split('T')[0],
        todo,
        completed,
      };
      onAddTodo(newTodo);
      setTodo('');
      setDate(null);
      setCompleted(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="date">Date:</label>
        <DatePicker
          selected={date}
          onChange={(date: Date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div>
        <label htmlFor="todo">Todo:</label>
        <input
          type="text"
          id="todo"
          name="todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="completed">Completed:</label>
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
      </div>
      <button className="newTodo-button"type="submit">Add Todo</button>
    </form>
  );
};

export default NewTodo;
