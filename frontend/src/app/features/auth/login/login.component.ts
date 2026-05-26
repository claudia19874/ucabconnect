import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Datos para controlar la vista del Login
  rolActivo: 'estudiante' | 'empresa' = 'estudiante';
  correo: string = '';
  contrasena: string = '';

  constructor(private router: Router) {}

  cambiarRol(rol: 'estudiante' | 'empresa') {
    this.rolActivo = rol;
  }

  onLogin() {
    console.log(`Iniciando sesión como ${this.rolActivo}:`, { 
      correo: this.correo, 
      contrasena: this.contrasena 
    });
    alert(`¡Bienvenido al portal! Intento de inicio de sesión como ${this.rolActivo}.`);
  }
}