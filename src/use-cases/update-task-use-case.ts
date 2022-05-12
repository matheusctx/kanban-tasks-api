import { TasksRepository } from "../repositories/tasks-repository";
import { AppError } from "../shared/errors/AppError";

interface UpdateTaskRequest {
  id: string;
  title: string;
  description: string;
  status: 'to do' | 'doing' | 'done';
}

export class UpdateTaskUseCase {
  constructor(
    private tasksRepository: TasksRepository,
  ) {}

  async execute(request: UpdateTaskRequest) {
    const { id, title, description, status } = request;

    const isTask = await this.tasksRepository.findById(id);

    if (!isTask) {
      throw new AppError('Task id not found');
    }

    if (status !== 'doing' && status !== 'to do' && status !== 'done') {
      throw new AppError('Unmatched task status');
    }

    const task = await this.tasksRepository.update({
      id,
      title,
      description,
      status,
    })

    return task;
  }
}