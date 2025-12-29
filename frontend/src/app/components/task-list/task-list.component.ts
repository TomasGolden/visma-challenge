import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  
  tasks: Task[] = [];
  pendingTasks: Task[] = [];
  completedTasks: Task[] = [];
  users: any[] = [];
  filterStatus: string = '';
  filterUserId: number | null = null;

  newTask: any = {
    title: '',
    description: '',
    assignedUserId: null,
  };

  constructor(private taskService: TaskService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Error cargando usuarios:', err)
    });
  }

  loadTasks() {
    // Pasamos los filtros al servicio
    this.taskService.getTasks(this.filterStatus, this.filterUserId || undefined)
      .subscribe((data: Task[]) => {
        this.tasks = data;
        
        this.pendingTasks = this.tasks.filter(t => t.status === 'pending');
        this.completedTasks = this.tasks.filter(t => t.status === 'completed');
      });
  }

  saveTask() {
    if (!this.newTask.title) return;

    this.taskService.createTask(this.newTask).subscribe({
      next: (taskCreada) => {
        // Las tareas nuevas siempre son 'pending', así que la agregamos a esa lista
        this.pendingTasks.unshift(taskCreada);
        this.newTask = { title: '', description: '', assignedUserId: 1 };
      },
      error: (err) => alert('Error creando tarea. Verifica que el ID de usuario exista.')
    });
  }

  toggleTaskStatus(task: any) {
  if (task.status === 'pending') {
    // Si está pendiente, llamamos a la ruta específica de completar
    this.taskService.markTaskAsCompleted(task.id).subscribe(() => this.loadTasks());
  } else {
    // Si está completa y queremos pasarla a pendiente
    this.taskService.markTaskAsPending(task.id).subscribe(() => this.loadTasks());
  }
}
}