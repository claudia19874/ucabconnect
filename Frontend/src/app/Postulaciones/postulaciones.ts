import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-postulaciones-estudiante',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './postulaciones.html', // Corregido el nombre aquí
  styleUrls: ['./postulaciones.css']    // Corregido el nombre aquí
})
export class PostulacionesComponent implements OnInit {
  postulaciones: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cargarPostulaciones();
  }

  async cargarPostulaciones() {
    try {
      const respuesta = await fetch('http://localhost:3000/api/postulaciones');
      if (respuesta.ok) {
        this.postulaciones = await respuesta.json();
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error("Error al cargar las postulaciones:", error);
    }
  }
}