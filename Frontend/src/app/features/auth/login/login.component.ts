import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  rolActivo: 'estudiante' | 'empresa' = 'estudiante';
  correo: string = '';
  contrasena: string = '';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  cambiarRol(rol: 'estudiante' | 'empresa') {
    this.rolActivo = rol;
  }

  onLogin() {
    console.log(`Iniciando sesión como ${this.rolActivo}:`, { 
      correo: this.correo, 
      contrasena: this.contrasena 
    });

    const datosLogin = {
      email: this.correo,
      contrasena: this.contrasena
    };

    this.http.post(
      'http://localhost:3000/api/usuario/login',
      datosLogin
    ).subscribe({
      next: (res: any) => {
        console.log('Login exitoso:', res);
        alert('¡Bienvenido al portal!');

        
        localStorage.setItem('usuarioLogueado', JSON.stringify(res.usuario));

        if (this.rolActivo === 'estudiante') {
          this.router.navigate(['/estudiante']);
        } else {
          this.router.navigate(['/empresa']);
        }
      },
      error: (err) => {
        console.error('Error login:', err);
        alert('Correo o contraseña incorrectos');
      }
    });
  }
}