import { errorResponse } from '../libs/errorResponse.js';
import Task from '../models/task.model.js';

const taskNotFound = res => res.status(404).json(['Task not found']);

export const getTasks = async ({ id: user }, res) => {
  try {
    const tasks = await Task.find({ user });
    res.json(tasks);
  } catch (error) {
    errorResponse(res, error);
  }
};

export const createTask = async ({ id: user, body: { title, description, date } }, res) => {
  try {
    const newTask = new Task({
      user,
      title,
      description,
      date
    });
    const task = await newTask.save();
    res.json(task);
  } catch (error) {
    errorResponse(res, error);
  }
};

export const getTask = async ({ id: user, params: { id } }, res) => {
  try {
    const taskFound = await Task.findOne({ _id: id, user });
    if (!taskFound) return taskNotFound(res);

    res.json(taskFound);
  } catch (error) {
    errorResponse(res, error);
  }
};

export const updateTask = async ({ id: user, body, params: { id } }, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate({ _id: id, user }, body, { new: true });
    if (!updatedTask) return taskNotFound(res);

    res.json(updatedTask);
  } catch (error) {
    errorResponse(res, error);
  }
};

export const deleteTask = async ({ id: user, params: { id } }, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: id, user }, { new: true });
    if (!deletedTask) return taskNotFound(res);

    res.sendStatus(204);
  } catch (error) {
    errorResponse(res, error);
  }
};
