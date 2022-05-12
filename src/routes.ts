import express from 'express';

import { PrismaTasksRepository } from './repositories/prisma/prisma-tasks-repository';
import { CreateTaskUseCase } from './use-cases/create-task-use-case';
import { DeleteTaskUseCase } from './use-cases/delete-task-use-case';
import { ListTasksUseCase } from './use-cases/list-tasks-use-case';
import { UpdateTaskUseCase } from './use-cases/update-task-use-case';

export const routes = express.Router();

const prismaTasksRepository = new PrismaTasksRepository();

routes.post('/tasks', async (req, res) => {
  const { title, description } = req.body;

  const createTaskUseCase = new CreateTaskUseCase(
    prismaTasksRepository,
  );

  await createTaskUseCase.execute({
    title,
    description
  })

  res.status(201).send();
})

routes.get('/tasks', async (req, res) => {
  const listTasksUseCase = new ListTasksUseCase(
    prismaTasksRepository,
  );

  const tasks = await listTasksUseCase.execute()

  res.status(200).json(tasks);
})

routes.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  const deleteTaskUseCase = new DeleteTaskUseCase(
    prismaTasksRepository,
  );

  await deleteTaskUseCase.execute({ id })

  res.status(204).send();
})

routes.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const updateTaskUseCase = new UpdateTaskUseCase(
    prismaTasksRepository,
  );

  const task = await updateTaskUseCase.execute({ id, description, status, title })

  res.status(200).json(task);
})