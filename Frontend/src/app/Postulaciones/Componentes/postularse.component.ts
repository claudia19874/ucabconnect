import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostulacionService } from '../services/postulacion.service';

@Component({
  selector: 'app-postularse',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vista-vacante">
      <div class="tarjeta-info">
        <span class="etiqueta">Pasantía Disponible</span>
        <h1>Desarrollador Backend Junior</h1>
        <p class="ubicacion">Tech Solutions S.A. | Sede Montalbán</p>
        <hr>
        <h3>Detalles de la Vacante</h3>
        <p>Se busca estudiante de Ingeniería Informática para apoyar en proyectos de desarrollo web utilizando Node.js. Modalidad presencial en Montalbán.</p>
      </div>

      <div class="tarjeta-perfil">
        <h3>Tu Perfil de Estudiante (Datos de Registro)</h3>
        <p><strong>Nombre:</strong> {{ estudiante.nombre }}</p>
        <p><strong>Cédula:</strong> {{ estudiante.id }}</p>
        <p><strong>Correo:</strong> {{ estudiante.correo }}</p>
        <p><strong>Sede:</strong> {{ estudiante.sede }}</p>
        <p><strong>Carrera:</strong> {{ estudiante.carrera }}</p>
        <p><strong>Semestre:</strong> {{ estudiante.semestre }}</p>
        <p><strong>Habilidades:</strong> {{ estudiante.habilidades }}</p>
        <p><strong>Intereses:</strong> {{ estudiante.areasInteres }}</p>
      </div>

      <div class="zona-boton">
        <button (click)="enviarPostulacion()" class="btn-principal">Enviar Postulación</button>
      </div>

      <div *ngIf="exito" class="msg exito">{{ exito }}</div>
      <div *ngIf="error" class="msg error">{{ error }}</div>
    </div>
  `,
  styles: [`
    .vista-vacante { max-width: 800px; margin: 30px auto; padding: 20px; }
    .tarjeta-info { background: #ffffff; padding: 20px; border-radius: 6px; border: 1px solid #ddd; margin-bottom: 20px; }
    .etiqueta { background: #e2f0d9; color: #385723; padding: 4px 10px; font-size: 12px; font-weight: bold; border-radius: 4px; }
    h1 { color: #004B23; margin: 10px 0; font-size: 24px; }
    .ubicacion { color: #666; font-size: 14px; }
    hr { border: 0; border-top: 1px solid #eee; margin: 15px 0; }
    h3 { color: #333; margin-bottom: 10px; font-size: 16px; }
    
    .tarjeta-perfil { background: #f9f9f9; padding: 20px; border-radius: 6px; border-left: 5px solid #004B23; }
    .tarjeta-perfil p { margin: 6px 0; font-size: 14px; }
    
    .zona-boton { text-align: center; margin-top: 25px; }
    .btn-principal { background: #004B23; color: white; border: none; padding: 12px 30px; font-size: 15px; font-weight: bold; border-radius: 4px; cursor: pointer; }
    .btn-principal:hover { background: #003314; }
    
    .msg { padding: 12px; border-radius: 4px; text-align: center; margin-top: 20px; font-weight: 500; }
    .exito { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
    .error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
  `]
})
export class PostularseComponent {
  private postulacionService = inject(PostulacionService);

  idVacante = 'vacante-101';
  exito: string | null = null;
  error: string | null = null;

  estudiante = {
    id: 'v-25666777',
    nombre: 'Iliany Rodriguez',
    telefono: '0412-5555555',
    correo: 'iliany.rodriguez@est.ucab.edu.ve',
    sede: 'Montalbán',
    carrera: 'Ingeniería Informática',
    semestre: '8vo',
    habilidades: 'Angular, Node.js, SQL',
    areasInteres: 'Desarrollo Web'
  };

  enviarPostulacion() {
    this.exito = null;
    this.error = null;

    const confirmar = confirm('¿Desea enviar su postulacion a esta empresa?');
    if (!confirmar) return;

    const dataPostulacion = {
      datosEstudiante: {
        id: this.estudiante.id,
        nombre: this.estudiante.nombre,
        correo: this.estudiante.correo,
        sede: this.estudiante.sede,
        carrera: this.estudiante.carrera
      },
      idVacante: this.idVacante
    };

    this.postulacionService.crearPostulacion(dataPostulacion).subscribe({
      next: (res) => {
        this.exito = res.mensaje;
      },
      error: (err) => {
        this.error = err.error?.error || 'No cumple con los requisitos para esta vacante';
      }
    });
  }
}