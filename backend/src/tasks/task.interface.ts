export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  assignedUserId: number;
  assignedUser?: User; // Opcional porque viene del include
  createdAt?: Date;
}
