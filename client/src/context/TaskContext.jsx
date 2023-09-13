import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createTaskRequest, deleteTaskRequest, getTaskRequest, getTasksRequest, updateTaskRequest } from '@/api/tasks';
import { useErrors } from '@/hooks';

const TaskContext = createContext({
  errors: [],
  tasks: [],
  createTask: () => {},
  deleteTask: () => {},
  getTask: () => {},
  getTasks: () => {},
  updateTask: () => {}
});

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const { errors, manageErrors } = useErrors();

  const getTasks = async () => {
    try {
      const { data } = await getTasksRequest();

      setTasks(data);
    } catch (error) {
      manageErrors(error);
    }
  };

  const getTask = async id => {
    try {
      const { data } = await getTaskRequest(id);

      return data;
    } catch (error) {
      manageErrors(error);
      navigate('/tasks', { replace: true });
    }
  };

  const createTask = async task => {
    try {
      const { data } = await createTaskRequest(task);

      setTasks(tasks => tasks.concat(data));
      navigate('/tasks', { replace: true });
    } catch (error) {
      manageErrors(error);
    }
  };

  const updateTask = async taskUpdated => {
    try {
      console.log('taskUpdated :>> ', taskUpdated);
      const { data } = await updateTaskRequest(taskUpdated);

      setTasks(tasks => tasks.map(task => (task._id === data._id ? data : task)));
      navigate('/tasks', { replace: true });
    } catch (error) {
      manageErrors(error);
    }
  };

  const deleteTask = async id => {
    try {
      await deleteTaskRequest(id);
      setTasks(tasks => tasks.filter(({ _id }) => _id !== id));
    } catch (error) {
      manageErrors(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        errors,
        tasks,
        createTask,
        deleteTask,
        getTask,
        getTasks,
        updateTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
