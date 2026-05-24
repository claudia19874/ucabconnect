import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vacante } from '../../models/vacante.models';

@Component({
  selector: 'app-ver-vacantes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-vacantes.html',
  styleUrls: ['./ver-vacantes.css']
})
export class VerVacantesComponent {
  // Evento para avisarle a la vista principal que queremos ir a publicar
  @Output() irAPublicar = new EventEmitter<void>();

  // Lista inicial de vacantes simuladas siguiendo estrictamente tu modelo Orientado a Objetos
  listaVacantes: Vacante[] = [
    {
      id: '1',
      titulo: 'Pasante de Desarrollo Frontend Angular',
      ubicacion: 'Caracas, Venezuela',
      salario: '$400 USD',
      duracion: '6 meses',
      modalidad: 'Híbrido',
      descripcion: 'Buscamos estudiante de Ingeniería Informática de la UCAB para desarrollo del portal institucional.',
      requisitos: ['Angular', 'TypeScript', 'CSS', 'Git'],
      sector: 'Tecnología',
      estado: 'Activa',
      fechaPublicacion: new Date('2026-05-20')
    },
    {
      id: '2',
      titulo: 'Analista de Ciberseguridad Jr (Pasantía)',
      ubicacion: 'Caracas, Venezuela',
      salario: '$450 USD',
      duracion: '6 meses',
      modalidad: 'Presencial',
      descripcion: 'Apoyo en el monitoreo de redes y auditoría interna de archivos log.',
      requisitos: ['Python', 'Redes', 'Linux'],
      sector: 'Banca / Finanzas',
      estado: 'Activa',
      fechaPublicacion: new Date('2026-05-22')
    }
  ];

  // Acción de la Historia de Usuario 3: Cerrar Vacante
  cerrarOferta(vacante: Vacante) {
    const confirmar = confirm(`¿Estás seguro de que deseas cerrar la vacante: "${vacante.titulo}"?`);
    if (confirmar) {
      vacante.estado = 'Cerrada';
      alert('La vacante ha sido cerrada exitosamente. Los estudiantes ya no podrán postularse.');
    }
  }

  // Dispara el evento para cambiar de pestaña
  navegarAPublicar() {
    this.irAPublicar.emit();
  }
}