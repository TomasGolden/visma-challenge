export interface Task {
  id?: number; // Opcional porque al crearla no tiene ID todavía
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  assignedUserId: number;
  assignedUser?: { // Viene del backend gracias al "include"
    id: number;
    name: string;
    email: string;
  }; 
}