import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext";

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

function TaskCard({ task }) {

    const {deleteTask} = useTasks();

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{task.name}</h1>
                <div>
                    <Link
                    to={`/tasks/${task._id}`} 
                        className="flex gap-x-2 items-center bg-blue-500 hover:bg-blue-900 text-white px-1 py-1 rounded-md my-2"> 
                        Editar 
                    </Link>
                    <button 
                        onClick={() => {
                        deleteTask(task._id);
                    }} 
                    className="flex gap-x-2 items-center bg-red-500 hover:bg-red-900 text-white px-1 py-1 rounded-md my-2"> 
                        Eliminar 
                    </button>
                </div>
            </header>
            <p className="text-slate-300">{task.description}</p>
            <p>
                {dayjs(task.date).utc().format('DD/MM/YYYY')}
            </p>
        </div>
    );
}

export default TaskCard;