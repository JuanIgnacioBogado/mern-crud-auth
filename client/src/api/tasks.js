import { clientAxios } from './axios';

export const getTasksRequest = () => clientAxios.get('/tasks');

export const getTaskRequest = id => clientAxios.get(`/tasks/${id}`);

export const createTaskRequest = id => clientAxios.post('/tasks', id);

export const updateTaskRequest = task => clientAxios.put(`/tasks/${task._id}`, task);

export const deleteTaskRequest = id => clientAxios.delete(`/tasks/${id}`);
