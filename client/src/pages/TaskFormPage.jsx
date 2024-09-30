import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TasksContext';
import { useNavigate } from 'react-router-dom';

function TaskFormPage() {

  const {register, handleSubmit} = useForm();
  const { createTask } = useTasks();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    createTask(data);
    navigate('/tasks');
  });

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        
        <form onSubmit={onSubmit}>

          <input type="text" placeholder="Titulo" 
            {...register('name')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-1'
            autoFocus
          />
          <textarea rows="3" placeholder="Descripcion"
            {...register('description')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-1'
          ></textarea>
          <button> Guardar </button>
          
        </form>

      </div>
    </div>
  );
}

export default TaskFormPage;