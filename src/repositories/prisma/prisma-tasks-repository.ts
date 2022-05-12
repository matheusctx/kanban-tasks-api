import { prisma } from "../../prisma";
import { TaskData, TasksRepository } from "../tasks-repository";

export class PrismaTasksRepository implements TasksRepository {
  async create({ description, title }: TaskData) {
    await prisma.task.create({
      data: {
        description,
        status: 'to do',
        title,
      }
    })
  }

  async list() {
    const tasks = await prisma.task.findMany()
    return tasks;
  }

  async delete(id: string) {
    await prisma.task.delete({ where: { id }})
  }

  async update({ id, description, status, title }: TaskData) {
    const task = await prisma.task.update({ where: { id }, data: {
      description,
      status,
      title,
      updated_at: new Date(),
    }})

    return task;
  }

  async findById(id: string) {
    const task = await prisma.task.findUnique({ where: { id }});
    return task;
  }
}