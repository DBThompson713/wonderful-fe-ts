const apiBaseUrl = 'http://localhost:8000';

// const convertToArray = (obj:object) => {
//     return Object.entries(obj).map(([id, data]) => ({ [id]: data }));
//   };

export async function getTodos(): Promise<void[]> {
    const res = await fetch(`${apiBaseUrl}/get-todos`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await res.json();
    console.log('data:',data.data)




    const todos = Object.values(data.data);
 
    return todos;
}






export const addTodos = `${apiBaseUrl}/get-todos`;
export const getTodo = `${apiBaseUrl}/get-todos`;

export const deleteTodo = (id:string) => `${apiBaseUrl}/delete-todos/${id}`;
export const updateTodo = (id:string) => `${apiBaseUrl}/update-todos/${id}`;

