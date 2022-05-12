import { TasksRepository } from "../repositories/tasks-repository";
import { AppError } from "../shared/errors/AppError";

interface DeleteTaskRequest {
  id: string;
}

export class DeleteTaskUseCase {
  constructor(
    private tasksRepository: TasksRepository,
  ) {}

  async execute({ id }: DeleteTaskRequest) {
    const isTask = await this.tasksRepository.findById(id);

    if (!isTask) {
      throw new AppError('Task id not found');
    }

    await this.tasksRepository.delete(id);
  }
}