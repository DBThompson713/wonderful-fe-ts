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
  console.log(todo.date)

  useEffect(() => {
    setCompleted(todo.completed);
  }, [todo.completed]);

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
    if (editedDate) {
      const formattedDate = editedDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      try {
        await updateTodo(todo.id.toString(), { todo: editedTodo, date: formattedDate });
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
  };

  const handleEditClick = () => {
    setEditingTodoId(todo.id);
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
              onChange={(e) => setEditedTodo(e.target.value)}
            />
            <DatePicker
              className="todo-date-picker"
              selected={editedDate}
              onChange={(date: Date | null) => setEditedDate(date)}
              dateFormat="dd/MM/yyyy"
            />
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
