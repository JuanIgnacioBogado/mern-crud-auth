import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { ErrorMessage } from '@/components';
import { useTaskContext } from '@/context/TaskContext';
import { formatDate } from '@/utils';

export const TaskFormPage = () => {
  const { id } = useParams();
  const { errors: tasksErrors, getTask, createTask, updateTask } = useTaskContext();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = handleSubmit(id ? updateTask : createTask);

  useEffect(() => {
    if (id) {
      (async () => {
        const task = await getTask(id);

        reset({ ...task, date: formatDate(task.date, 'YYYY-MM-DD hh:ss') });
      })();
    }

    return () => reset({ title: '', description: '', date: formatDate(new Date(), 'YYYY-MM-DD hh:ss') });
  }, [id]);

  return (
    <div className="w-full max-w-md rounded-md bg-zinc-800 p-10">
      <h2 className="mb-4 text-center text-2xl font-bold">{id ? 'Edit Task' : 'Create Task'}</h2>
      <ErrorMessage errors={tasksErrors} />

      <form className="flex flex-col gap-4" {...{ onSubmit }}>
        <input
          type="text"
          {...register('title', { required: true })}
          className="w-full rounded-md border-2 border-transparent bg-zinc-700 px-4 py-2 outline-none focus:border-sky-600"
          placeholder="Title"
        />
        {errors.title && <p className="text-red-500">Title is required</p>}
        <textarea
          rows={5}
          {...register('description', { required: true })}
          className="w-full resize-none rounded-md border-2 border-transparent bg-zinc-700 px-4 py-2 outline-none focus:border-sky-600"
          placeholder="Description"
        />
        {errors.description && <p className="text-red-500">Description is required</p>}
        <input
          type="datetime-local"
          {...register('date', { value: formatDate(new Date()), setValueAs: value => new Date(value) })}
          className="w-full rounded-md border-2 border-transparent bg-zinc-700 px-4 py-2 outline-none focus:border-sky-600"
          placeholder="Date"
        />
        <button className="rounded-md bg-sky-600 py-2 transition-colors hover:bg-sky-700" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};
