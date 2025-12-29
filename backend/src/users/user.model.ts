import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Task } from '../tasks/task.model';

@Table({ tableName: 'users', timestamps: true, underscored: true })
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  // Relación: Un usuario tiene muchas tareas
  @HasMany(() => Task)
  tasks: Task[];
}
