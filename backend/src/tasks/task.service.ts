import { Injectable, NotFoundException } from '@nestjs/common'; // <--- Agregamos NotFoundException
import { InjectModel } from '@nestjs/sequelize';
import { Task, TaskStatus } from './task.model'; // <--- Importamos TaskStatus
import { User } from '../users/user.model';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task)
    private taskModel: typeof Task,
  ) {}

  // Obtener todas las tareas
  findAll(status?: string, userId?: string) {
    const whereClause: any = {};

    // Si nos envían estado, filtramos por eso
    if (status) {
      whereClause.status = status;
    }

    // Si nos envían usuario, filtramos por eso
    if (userId) {
      whereClause.assigned_user_id = userId; // Ojo: asegúrate que coincida con tu modelo
    }

    return this.taskModel.findAll({
      where: whereClause,
      include: [User], // Seguimos trayendo los datos del usuario
      order: [['created_at', 'DESC']],
    });
  }

  async markAsCompleted(id: number) {
    // Actualizamos solo el estado a 'completed'
    await this.taskModel.update({ status: 'completed' }, { where: { id } });
    // Retornamos la tarea actualizada
    return this.taskModel.findByPk(id);
  }

  async markAsPending(id: number) {
    await this.taskModel.update({ status: 'pending' }, { where: { id } });
    return this.taskModel.findByPk(id);
  }

  // Crear tarea
  async create(body: any): Promise<Task> {
    return this.taskModel.create({
      ...body,
      status: TaskStatus.PENDING,
    });
  }
}
