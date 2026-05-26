import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { EstudianteService } from '../../../core/services/estudiante'; 

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
    telefono: '',
    contrasena: '',
    carrera: '',
    semestre: '',
    habilidades: '',
    intereses: '',
    sedeUcab: 'Caracas'
  };
  constructor(private router: Router, private estudianteService: EstudianteService) {}

  setSede(sede: string) {
    this.estudiante.sedeUcab = sede;
  }

 onRegistro() {
    if (!this.estudiante.correo.endsWith('@est.ucab.edu.ve')) {
        alert('Por favor, ingresa un correo institucional válido (@est.ucab.edu.ve).');
        return;
    }

    const datosParaEnviar = {
        sedeUcab: this.estudiante.sedeUcab,
        nombre: this.estudiante.nombreCompleto.split(' ')[0] || '', 
        apellido: this.estudiante.nombreCompleto.split(' ')[1] || '',
        cedula: this.estudiante.cedula,
        telefono: this.estudiante.telefono, 
        correoInstitucional: this.estudiante.correo,
        carrera: this.estudiante.carrera,
        semestreActual: parseInt(this.estudiante.semestre) || 1,
        contrasena: this.estudiante.contrasena
    };

    // Enviamos el objeto 
    this.estudianteService.registrar(datosParaEnviar).subscribe({
      next: (res: any) => {
        console.log('Backend respondió:', res);
        alert('¡Registro de estudiante exitoso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        alert('Error: ' + (err.error.message || 'No se pudo conectar con el servidor'));
      }
    });
  }
}