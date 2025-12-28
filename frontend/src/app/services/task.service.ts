import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // La URL de tu backend (NestJS)
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  // 1. Obtener todas las tareas
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // 2. Crear una tarea nueva
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  // 3. Marcar como completada
  markTaskAsCompleted(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/complete`, {});
  }

  // 4. Marcar como pendiente
  markTaskAsPending(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/pending`, {})
  }

  updateTask(id: number, status: string): Observable<any> {
    // CAMBIO CLAVE: Cambiamos .patch() por .put()
    return this.http.put(`${this.apiUrl}/${id}`, { status });
  }

  getAllUsers(): Observable<any[]> {
    // Asumimos que la URL es users (basado en localhost:3000)
    return this.http.get<any[]>('http://localhost:3000/users');
  }
}