import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

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
  const [todoError, setTodoError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateTodoInput()) {
      const newTodo: Todo = {
        id: Date.now(),
        date: date ? date.toISOString().split('T')[0] : '',
        todo,
        completed,
      };
      onAddTodo(newTodo);
      setTodo('');
      setDate(null);
      setCompleted(false);
      setTodoError('');
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
          onChange={(e) => {
            setTodo(e.target.value);
            if (todoError) {
              setTodoError('');
            }
          }}
        />
        {todoError && <p className="todo-error-message">{todoError}</p>}
      </div>
      <button className="newTodo-button" type="submit">Add Todo</button>
    </form>
  );
};

export default NewTodo;
