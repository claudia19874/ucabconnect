import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-registro-estudiante',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro-estudiante.component.html',
  styleUrls: ['./registro-estudiante.component.css']
})
export class RegistroEstudianteComponent {
  
  estudiante = {
    nombreCompleto: '',
    cedula: '',
    correo: '',
    contrasena: '',
    carrera: '',
    semestre: '',
    habilidades: '',
    intereses: '',
    sede: 'Caracas' // Valor inicial por defecto
  };

  constructor(private router: Router) {}

  setSede(sede: string) {
    this.estudiante.sede = sede;
  }

  onRegistro() {
    if (!this.estudiante.correo.endsWith('@est.ucab.edu.ve')) {
      alert('Por favor, ingresa un correo institucional válido (@est.ucab.edu.ve).');
      return;
    }

    console.log('Datos de estudiante listos para enviar:', this.estudiante);
    alert('¡Registro de estudiante exitoso! Ya puedes iniciar sesión.');
    this.router.navigate(['/login']);
  }
}