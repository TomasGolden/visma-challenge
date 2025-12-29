import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/user.model';

// Definimos los posibles estados
export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

@Table({ tableName: 'tasks', timestamps: true, underscored: true }) // timestamps: true crea createdAt y updatedAt solos
export class Task extends Model {
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
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.ENUM(...Object.values(TaskStatus)),
    defaultValue: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'assigned_user_id',
  })
  assignedUserId: number;

  @BelongsTo(() => User)
  assignedUser: User;
}
