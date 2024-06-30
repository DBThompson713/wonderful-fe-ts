import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';
import { Todo } from './../../api/todos';

interface NewTodoProps {
  onAddTodo: (newTodo: Todo) => void;
}

const NewTodo: React.FC<NewTodoProps> = ({ onAddTodo }) => {
  const [todo, setTodo] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [completed, setCompleted] = useState(false);
  const [todoError, setTodoError] = useState<string>('');
  const [dateError, setDateError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateTodoInput() && validateDate()) {
      const newTodo: Todo = {
        id: Date.now().toString(), 
        date: date ? date.toISOString().split('T')[0] : '', 
        todo,
        completed,
      };
      onAddTodo(newTodo);
      setTodo('');
      setDate(null);
      setCompleted(false);
      setTodoError('');
      setDateError('');
    }
  };

  const validateTodoInput = (): boolean => {
    if (!todo.trim()) {
      setTodoError('Todo cannot be blank');
      return false;
    } else if (todo.length > 25) {
      setTodoError('Todo cannot be more than 25 characters');
      return false;
    } else if (!todo.replace(/\s/g, '').length) {
      setTodoError('Todo cannot be only of spaces');
      return false;
    }
    return true;
  };

  const validateDate = (): boolean => {
    if (!date) {
      setDateError('Please select a date');
      return false;
    } else if (date < new Date()) {
      setDateError('Date must be today or in the future');
      return false;
    }
    return true;
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-input-section">
        <label htmlFor="date" className="form-label">Date:</label>
        <DatePicker
        wrapperClassName="datepicker"
          selected={date}
          onChange={(date: Date | null) => {
            setDate(date);
            if (dateError) {
              setDateError('');
            }
          }}
          dateFormat="dd/MM/yyyy"
          className="form-input"
        />
        {dateError && <p className="todo-error-message">{dateError}</p>}
      </div>
      <div className="form-input-section">
        <label htmlFor="todo" className="form-label">Todo:</label>
        <input
          type="text"
          id="todo"
          name="todo"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
            if (todoError) {
              setTodoError('');
            }
          }}
          className="form-input"
        />
        {todoError && <p className="todo-error-message">{todoError}</p>}
      </div>
      <button className="newTodo-button" type="submit">Add Todo</button>
    </form>
  );
};

export default NewTodo;
