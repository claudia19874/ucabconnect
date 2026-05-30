import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-estudiante',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registro-estudiante.component.html',
  styleUrls: ['./registro-estudiante.component.css']
})
export class RegistroEstudianteComponent {
  sede: 'Montalbán (Caracas)' | 'Guayana' = 'Montalbán (Caracas)';
  mostrarPassword = false;
  mostrarConfirmar = false;
  errorMensaje = '';
  mensajeGuayana = false;

  carreras = ['Ingeniería Informática'];

  semestres = ['1° Semestre','2° Semestre','3° Semestre','4° Semestre',
               '5° Semestre','6° Semestre','7° Semestre','8° Semestre',
               '9° Semestre','10° Semestre'];

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  setSede(s: 'Montalbán (Caracas)' | 'Guayana') {
    this.sede = s;
    this.mensajeGuayana = s === 'Guayana';
    this.errorMensaje = '';
    this.cdr.detectChanges();
  }

  togglePassword() { this.mostrarPassword = !this.mostrarPassword; this.cdr.detectChanges(); }
  toggleConfirmar() { this.mostrarConfirmar = !this.mostrarConfirmar; this.cdr.detectChanges(); }

  async registrar(
    nombre: string, apellido: string, cedula: string,
    telefono: string, correo: string, carrera: string,
    semestre: string, password: string, confirmar: string
  ) {
    if (this.sede === 'Guayana') {
      this.mensajeGuayana = true;
      this.cdr.detectChanges();
      return;
    }

    if (!nombre || !apellido || !cedula || !telefono || !correo || !carrera || !semestre || !password) {
      this.errorMensaje = 'Por favor completa todos los campos obligatorios.';
      this.cdr.detectChanges();
      return;
    }

    if (!correo.endsWith('@est.ucab.edu.ve')) {
      this.errorMensaje = 'El correo debe ser institucional (@est.ucab.edu.ve).';
      this.cdr.detectChanges();
      return;
    }

    if (password.length < 8) {
      this.errorMensaje = 'La contraseña debe tener mínimo 8 caracteres.';
      this.cdr.detectChanges();
      return;
    }

    if (password !== confirmar) {
      this.errorMensaje = 'Las contraseñas no coinciden.';
      this.cdr.detectChanges();
      return;
    }

    const nuevoEstudiante = {
      nombre, apellido, cedula, telefono, correo,
      carrera, semestre, sede: this.sede, password,
      habilidades: []
    };

    try {
      const res = await fetch('http://localhost:3000/api/auth/registro/estudiante', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoEstudiante)
      });

      const data = await res.json();

      if (res.ok) {
        alert('¡Cuenta creada con éxito! Ya puedes iniciar sesión.');
        this.router.navigate(['/']);
      } else {
        this.errorMensaje = data.error || 'Error al crear la cuenta.';
        this.cdr.detectChanges();
      }
    } catch (e) {
      this.errorMensaje = 'No se pudo conectar con el servidor.';
      this.cdr.detectChanges();
    }
  }

  cancelar() { this.router.navigate(['/']); }
}