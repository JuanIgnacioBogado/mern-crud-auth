import { Router } from 'express';

import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask
} from '../controllers/tasks.controller.js';
import { authRequired } from '../middlewares/validateToken.middleware.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { taskSchema } from '../schemas/task.schema.js';

const router = Router();

router
  .route('/tasks')
  .get(authRequired, getTasks)
  .post(authRequired, validateSchema(taskSchema), createTask);

router
  .route('/tasks/:id')
  .get(authRequired, getTask)
  .put(authRequired, validateSchema(taskSchema), updateTask)
  .delete(authRequired, deleteTask);

export default router;
