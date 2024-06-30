const apiBaseUrl = 'http://localhost:8000';

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
        const todosArr = Object.values(data.data);
        if (!Array.isArray(todosArr)) {
            throw new Error('Expected an array of todos');
        }
        const todos: Todo[] = todosArr.map((item: any) => ({
            id: item.id.toString(),
            completed: item.completed,
            date: item.date,
            todo: item.todo
        }));
        return todos;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
}

export async function addTodo(todoObj: Partial<Todo>): Promise<Todo[]> {
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
        console.error('Error adding todo:', err);
        throw err;
    }
}

export const deleteTodo = async (id: string): Promise<Todo[]> => {
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
        // Fetch the existing todo
        const res = await fetch(`${apiBaseUrl}/get-todo/${id}`);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const existingTodo: Partial<Todo> = await res.json();

        // Merge updated fields with existing todo
        const updatedTodo: Partial<Todo> = { ...existingTodo, ...updatedFields };

        // Update the todo on the server
        const updateRes = await fetch(`${apiBaseUrl}/update-todo/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedTodo),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (!updateRes.ok) {
            throw new Error('Network response was not ok');
        }

        // Fetch all todos again after update
        const allTodos = await getTodos();
        return allTodos;
    } catch (err) {
        console.error('Error updating todo:', err);
        throw err;
    }
}
