import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useTasks } from '../context/TasksContext';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import * as XLSX from 'xlsx';
import axios from 'axios';

dayjs.extend(utc);

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue('name', task.name);
        setValue('description', task.description);
        setValue('date', dayjs.utc(task.date).format('YYYY-MM-DD'));
      }
    }
    loadTask();
  }, [params.id, getTask, setValue]);

  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };

    if (params.id) {
      updateTask(params.id, dataValid);
    } else {
      createTask(dataValid);
    }
    navigate('/tasks');
  });

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      // Enviar los datos procesados al servidor
      try {
        await axios.post('http://localhost:3001/upload-excel', worksheet); // Asegúrate de que la URL sea correcta
        alert('Datos subidos correctamente');
      } catch (error) {
        console.error('Error subiendo los datos:', error);
        alert('Error subiendo los datos');
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="Titulo" 
            {...register('name')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-1'
            autoFocus
          />
          <textarea rows="3" placeholder="Descripción"
            {...register('description')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-1'
          ></textarea>
          <label htmlFor='date'>Fecha</label>
          <input type="date" {...register('date')}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-1'
          />
          <button className='bg-indigo-500 px-3 py-2 rounded-md'> Guardar </button>
        </form>

        <div className='mt-4'>
          <label htmlFor='file'>Subir archivo Excel</label>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-1' />
        </div>

      </div>
    </div>
  );
}

export default TaskFormPage;