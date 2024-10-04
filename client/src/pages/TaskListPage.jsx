import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext

function TaskListPage() {
  const [tasks, setTasks] = useState([]);
  const { authTokens } = useAuth(); // Get the auth tokens from the context

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/tasks', {
          headers: {
            Authorization: `Bearer ${authTokens}`, // Include the token in the request headers
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [authTokens]);

  return (
    <div className='container mx-auto px-10'>
      <h1 className='text-2xl font-bold my-4'>Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li key={task._id} className='bg-zinc-800 p-4 rounded-md my-2'>
            <h2 className='text-xl font-bold'>{task.name}</h2>
            <p>{task.description}</p>
            <p>{new Date(task.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskListPage;