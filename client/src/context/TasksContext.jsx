import { createContext, useContext, useState } from "react";
import { 
    createTaskRequest, 
    getTasksRequest, 
    deleteTasksRequest, 
    getTaskRequest, 
    updateTasksRequest 
} from '../api/tasks.js';
 

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

    const deleteTask = async (id) => {

        try {
            
            const res = await deleteTasksRequest(id);
            if (res.status === 204) setTasks(tasks.filter(task => task._id !== id));

        } catch (error) {
            
            console.log(error);

        }

    };

    const getTask = async (id) => {
    
        try {
            const res = await getTaskRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }

    };

    const updateTask = async (id, task) => {

        try {
            await updateTasksRequest(id, task);
        } catch (error) {
            console.error(error);
        }

    }


    return (
        <TasksContext.Provider value={{
            tasks,
            createTask,
            getTasks,
            deleteTask,
            getTask,
            updateTask
        }}>
            {children}
        </TasksContext.Provider>
    );
}