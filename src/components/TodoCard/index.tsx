import './styles.css';

interface Props {
    todo:{
        id: number;
        date: string;
        completed: boolean;
        todo: string;
    }
 }

const TodoCard = (props: Props) => {
    const { todo } = props

    return (
        <div key={todo.id} className="todo-card">
            <p>{todo?.date}</p>
            <p>{todo?.todo}</p>
            <button>delete</button>
            <button>update</button>
        </div>
    )
}

export default TodoCard;
