import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  // 1. Obtener todos los usuarios (Para el select)
  findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  // 2. Crear un usuario nuevo (Para el formulario nuevo)
  create(user: any): Promise<User> {
    // El ID se asigna solo por la base de datos (autoIncrement)
    return this.userModel.create(user);
  }
}
