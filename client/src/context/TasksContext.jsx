import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest } from '../api/tasks.js';
 

const TasksContext = createContext();

export const useTasks = () => {

    const context = useContext(TasksContext);

    if (!context) {
        throw new Error('useTasks must be used within a TasksProvider');
    }

    return context;
}

export function TasksProvider({children}) {

    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {

        try {

            const res = await getTasksRequest();
            setTasks(res.data);

        } catch (error) {
            
            console.log(error);

        }

    }

    const createTask = async (task) => {
        
        const res = await createTaskRequest(task);
        console.log(res);

    }

    return (
        <TasksContext.Provider value={{
            tasks,
            createTask,
            getTasks,
        }}>
            {children}
        </TasksContext.Provider>
    );
}