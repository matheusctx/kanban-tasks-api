import { TasksRepository } from "../repositories/tasks-repository";
import { AppError } from "../shared/errors/AppError";

interface CreateTaskRequest {
  title: string;
  description: string;
}

export class CreateTaskUseCase {
  constructor(
    private tasksRepository: TasksRepository,
  ) {}

  async execute(request: CreateTaskRequest) {
    const { title, description } = request;

    if (!title) {
      throw new AppError('Title is required');
    }
    
    await this.tasksRepository.create({
      title,
      description,
      status: 'to do'
    })
  }
}