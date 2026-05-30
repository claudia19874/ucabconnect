import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  tipoUsuario: 'estudiante' | 'empresa' = 'estudiante';
  mostrarPassword = false;
  errorMensaje = '';

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  setTipo(tipo: 'estudiante' | 'empresa') {
    this.tipoUsuario = tipo;
    this.errorMensaje = '';
    this.cdr.detectChanges();
  }

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
    this.cdr.detectChanges();
  }

  async iniciarSesion(correo: string, password: string) {
    if (!correo || !password) {
      this.errorMensaje = 'Por favor completa todos los campos.';
      this.cdr.detectChanges();
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password, tipo: this.tipoUsuario })
      });

      const data = await res.json();

      if (res.ok) {
        // Guardamos el usuario en sessionStorage para usarlo en otros componentes
        sessionStorage.setItem('usuario', JSON.stringify(data.usuario));
        sessionStorage.setItem('tipo', this.tipoUsuario);

        if (this.tipoUsuario === 'estudiante') {
          this.router.navigate(['/estudiante']);
        } else {
          this.router.navigate(['/empresa']);
        }
      } else {
        this.errorMensaje = data.error || 'Correo o contraseña incorrectos.';
        this.cdr.detectChanges();
      }
    } catch (error) {
      this.errorMensaje = 'No se pudo conectar con el servidor.';
      this.cdr.detectChanges();
    }
  }

  irARegistroEstudiante() {
    this.router.navigate(['/registro/estudiante']);
  }

  irARegistroEmpresa() {
    this.router.navigate(['/registro/empresa']);
  }
}