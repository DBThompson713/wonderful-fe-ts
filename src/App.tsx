import { useEffect, useState } from 'react';
import './App.css';
import { getTodos, deleteTodo, addTodo } from './api/todos';
import TodoCard from './components/TodoCard';
import NewTodo from './components/NewTodo';
import ActionBar from './components/ActionBar';
import Tutorial from './components/Tutorial';
import ProgressBar from './components/ProgressBar';

interface Todo {
  id: string; 
  date: string;
  todo: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTodos();
        const sortedTodos = data.sort((a, b) => {
          if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
          }
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        setTodos(sortedTodos);
        setFilteredTodos(sortedTodos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchTerm: string) => {
    const filtered = todos.filter((todo) =>
      todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTodos(filtered);
  };

  const handleSort = (sortBy: string) => {
    const sorted = [...filteredTodos].sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      if (sortBy === 'dateAsc') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === 'dateDesc') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === 'alphabetical') {
        return a.todo.localeCompare(b.todo);
      }

      return 0;
    });

    setFilteredTodos(sorted);
  };

  useEffect(()=>{
    console.log('totototototdodod: ',todos)
  },[])

  const handleFilter = (filterBy: string) => {
    let filtered: Todo[] = [...todos];

    if (filterBy === 'completed') {
      filtered = todos.filter((todo) => todo.completed);
    } else if (filterBy === 'overdue') {
      filtered = todos.filter((todo) => !todo.completed && new Date(todo.date) < new Date());
    }

    setFilteredTodos(filtered);
  };

  const handleAddTodo = async (newTodo: Todo) => {
    try {
      const updatedTodos = await addTodo(newTodo);
      const sortedTodos = updatedTodos.sort((a, b) => {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      setTodos(sortedTodos);
      setFilteredTodos(sortedTodos);
      setShowAddTodo(false);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDelete = async (id: string) => { 
    try {
      await deleteTodo(id);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
      setFilteredTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>
      <h1 className="todos-titles">Todos</h1>
      <Tutorial />
      <ActionBar 
        onSearch={handleSearch}
        onSort={handleSort}
        onFilter={handleFilter}
        onAdd={() => setShowAddTodo(!showAddTodo)}
        showAddTodo={showAddTodo}
      />
      <ProgressBar todos={todos}/>
      {showAddTodo && <NewTodo onAddTodo={handleAddTodo} />}
  
      <ul className="todos-map">
        {filteredTodos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
            isEditing={editingTodoId === todo.id}
            setEditingTodoId={setEditingTodoId}
            isAnotherTodoEditing={editingTodoId !== null && editingTodoId !== todo.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
