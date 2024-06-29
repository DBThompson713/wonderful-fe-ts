import { useEffect, useState } from 'react';
import './App.css';
import { getTodos } from './api/todos';
import TodoCard from './components/TodoCard';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  interface Todo {
    id: number;
    date: string;
    todo: string;
    completed: boolean;
  }

  useEffect(() => {
    getTodos().then((data) => {
      console.log(data);
      setTodos(data);
    })
  }, []);


  return (
    <>
      <div>
        <h1>Todos</h1>
        <ul>
          {todos.map((todo) => <TodoCard todo={todo}/>)}
          </ul>
      </div>
    </>
  );
}

export default App;