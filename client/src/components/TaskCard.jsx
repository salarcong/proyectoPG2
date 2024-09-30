import { useTasks } from "../context/TasksContext";

function TaskCard({ task }) {

    const {deleteTask} = useTasks();

    const formattedDate = new Date(task.date).toLocaleDateString();
    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{task.name}</h1>
                <div>
                    <button className="flex gap-x-2 items-center bg-zinc-700 text-white px-1 py-1 rounded-md my-2"> Editar </button>
                    <button 
                        onClick={() => {
                        deleteTask(task._id);
                    }} 
                    className="flex gap-x-2 items-center bg-zinc-700 text-white px-1 py-1 rounded-md my-2"> 
                        Eliminar 
                    </button>
                </div>
            </header>
            <p className="text-slate-300">{task.description}</p>
            <p className="text-slate-400">Creado el: {formattedDate}</p>
        </div>
    );
}

export default TaskCard;