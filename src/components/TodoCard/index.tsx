import React, { useState, useEffect } from 'react';
import './styles.css';
import { updateTodo } from '../../api/todos';
import editIcon from './../../assets/edit30.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Todo {
  id: number;
  date: string;
  todo: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
  onDelete: (id: number) => void;
  isEditing: boolean;
  setEditingTodoId: (id: number | null) => void;
  isAnotherTodoEditing: boolean;
}

const TodoCard: React.FC<Props> = ({ todo, onDelete, isEditing, setEditingTodoId, isAnotherTodoEditing }) => {
  const [completed, setCompleted] = useState(todo.completed);
  const [editedTodo, setEditedTodo] = useState(todo.todo);
  const [editedDate, setEditedDate] = useState<Date | null>(new Date(todo.date));
  const [todoError, setTodoError] = useState<string>('');
  const [dateError, setDateError] = useState<string>('');

  useEffect(() => {
    setCompleted(todo.completed);
  }, [todo.completed]);

  useEffect(() => {
    if (!isEditing) {
      setTodoError('');
      setDateError('');
    }
  }, [isEditing]);

  const handleDeleteClick = () => {
    onDelete(todo.id);
  };

  const handleCompletedChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCompleted = e.target.checked;
    setCompleted(newCompleted);

    try {
      await updateTodo(todo.id.toString(), { completed: newCompleted });
      setCompleted(newCompleted);
      window.location.reload(); 
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleSaveClick = async () => {
    if (validateEditedTodo() && validateEditedDate()) {
      const formattedDate = editedDate?.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      try {
        await updateTodo(todo.id.toString(), { todo: editedTodo, date: formattedDate || '' });
        setEditingTodoId(null);
        window.location.reload(); 
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    }
  };

  const handleCancelClick = () => {
    setEditedTodo(todo.todo);
    setEditedDate(new Date(todo.date));
    setEditingTodoId(null); // Exit edit mode
    setTodoError('');
    setDateError('');
  };

  const handleEditClick = () => {
    setEditingTodoId(todo.id);
  };

  const validateEditedTodo = (): boolean => {
    if (!editedTodo.trim()) {
      setTodoError('Todo cannot be blank');
      return false;
    } else if (editedTodo.length > 25) {
      setTodoError('Todo cannot be more than 25 characters');
      return false;
    } else if (!editedTodo.replace(/\s/g, '').length) {
      setTodoError('Todo cannot consist only of spaces');
      return false;
    }
    return true;
  };

  const validateEditedDate = (): boolean => {
    if (!editedDate) {
      setDateError('Please select a date');
      return false;
    } else if (editedDate < new Date()) {
      setDateError('Date must be today or in the future');
      return false;
    }
    return true;
  };

  return (
    <div className={`todo-card ${isAnotherTodoEditing ? 'grey-out' : ''}`}>
      <label>
        {!isEditing && <input
          className="todo-checkbox"
          type="checkbox"
          checked={completed}
          onChange={handleCompletedChange}
        />}
      </label>
      <div className="todo-details">
        {isEditing ? (
          <>
            <input
              className="todo-input"
              type="text"
              value={editedTodo}
              onChange={(e) => {
                setEditedTodo(e.target.value);
                if (todoError) {
                  setTodoError('');
                }
              }}
            />
            <DatePicker
              className="todo-date-picker"
              selected={editedDate}
              onChange={(date: Date | null) => setEditedDate(date)}
              dateFormat="dd/MM/yyyy"
            />
            {dateError && <p className="todo-error-message">{dateError}</p>}
            {todoError && <p className="todo-error-message">{todoError}</p>}
          </>
        ) : (
          <>
            <p className="todo-todo" style={{ textDecoration: completed ? 'line-through' : 'none' }}>
              {todo.todo}
            </p>
            <p className="todo-date">{todo.date}</p>
          </>
        )}
      </div>
      <div>
        {isEditing ? (
          <>
            <button className="todo-save-button" onClick={handleSaveClick}>Save</button>
            <button className="todo-cancel-button" onClick={handleCancelClick}>Cancel</button>
          </>
        ) : (
          <>
            <button className="todo-delete-button" onClick={handleDeleteClick}>
              X
            </button>
            <img
              src={editIcon}
              onClick={handleEditClick}
              className="todo-edit-icon"
              alt="edit todo"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
