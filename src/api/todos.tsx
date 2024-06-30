const apiBaseUrl = 'https://wonderful-be-ts.onrender.com';


export interface Todo {
    id: string;
    completed: boolean;
    date: string;  
    todo: string; 
}

export async function getTodos(): Promise<Todo[]> {
    try {
        const res = await fetch(`${apiBaseUrl}/get-todos`);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        // Assuming data is an array of objects with fields id, date, todo, completed
        const todosArr = Object.values(data.data);
        const todos: Todo[] = todosArr.map((todo: any) => ({
            id: todo.id,
            date: todo.date,
            todo: todo.todo,
            completed: todo.completed,
        }));
        return todos;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
}


export async function addTodo(todoObj: object): Promise<Todo[]> {
    try {
        const res = await fetch(`${apiBaseUrl}/add-todo`, {
            method: 'POST',
            body: JSON.stringify(todoObj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        const allTodos = await getTodos();
        return allTodos;
    } catch (err) {
        console.log('error:', err);
        throw err;
    }
}

export const deleteTodo = async (id: string) => {
    const deleteUrl = `${apiBaseUrl}/delete-todo/${id}`;

    try {
        const response = await fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const allTodos = await getTodos();
        return allTodos;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

export async function updateTodo(
    id: string,
    updatedFields: Partial<Todo>
): Promise<Todo[]> {
    try {
        const res = await fetch(`${apiBaseUrl}/get-todo/${id}`);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        const existingTodo: Todo = await res.json() as Todo;

        const updatedTodoData = { ...existingTodo, ...updatedFields };

        const updateRes = await fetch(`${apiBaseUrl}/update-todo`, {
            method: 'PATCH',
            body: JSON.stringify(updatedTodoData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (!updateRes.ok) {
            throw new Error('Network response was not ok');
        }

        const allTodos = await getTodos();
        return allTodos;
    } catch (err) {
        console.error('Error updating todo:', err);
        throw err;
    }
}
