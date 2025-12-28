import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/user.model'; // Asegúrate que la ruta sea correcta

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
  declare id: number; // El 'declare' es importante para evitar el error que tuviste antes

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

  // --- RELACIONES (Esto es lo que permite el include: [User]) ---

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
