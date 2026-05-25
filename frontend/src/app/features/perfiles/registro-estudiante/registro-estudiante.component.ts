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
  
  // Modelo actualizado con la información académica correcta
  estudiante = {
    nombreCompleto: '',
    cedula: '',
    correo: '',
    contrasena: '',
    carrera: '',      // 2. Campo añadido para la carrera que estudia
    semestre: '',     // 2. Inicializado como string vacío para mejor manejo del placeholder
    habilidades: '',
    intereses: ''
  };

  constructor(private router: Router) {}

  onRegistro() {
    // 3. Validación de seguridad extra en la lógica por si se salta el HTML
    if (!this.estudiante.correo.endsWith('@est.ucab.edu.ve')) {
      alert('Por favor, ingresa un correo institucional válido (@est.ucab.edu.ve).');
      return;
    }

    console.log('Datos de estudiante listos para enviar:', this.estudiante);
    alert('¡Registro de estudiante exitoso! Ya puedes iniciar sesión.');
    this.router.navigate(['/login']);
  }
}