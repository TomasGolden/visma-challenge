import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <--- Necesario para los inputs
import { UserService } from '../../services/user.service'; // Asegúrate de tener este servicio

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  
  // Objeto temporal para el formulario
  newUser = {
    name: '',
    email: ''
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  createUser() {
    if (!this.newUser.name || !this.newUser.email) {
      alert('Por favor completa nombre y email');
      return;
    }

    // Enviamos al Backend
    this.userService.createUser(this.newUser).subscribe({
      next: (usuarioCreado) => {
        alert('¡Usuario creado con éxito!');
        this.users.push(usuarioCreado);
        this.newUser = { name: '', email: '' };
      },
      error: (err) => {
        console.error(err);
        alert('Error al crear. ¿Quizás el email ya existe?');
      }
    });
  }
}