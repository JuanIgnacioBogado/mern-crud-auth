import { useCallback } from 'react';

import { TaskCard } from '@/components';
import { useTaskContext } from '@/context/TaskContext';

export const TasksPage = () => {
  const { tasks, deleteTask } = useTaskContext();

  const handleDeleteTask = useCallback(
    id => e => {
      e.preventDefault();
      deleteTask(id);
    },
    []
  );

  return !tasks.length ? (
    <h1 className="text-center text-2xl font-bold">No tasks yet</h1>
  ) : (
    <div className="flex max-h-full flex-wrap justify-center gap-4 overflow-y-auto py-10">
      {tasks.map(task => (
        <TaskCard {...{ ...task, handleDeleteTask }} key={task._id} />
      ))}
    </div>
  );
};
