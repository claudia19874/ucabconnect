import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostulacionesComponent } from '../../Postulaciones/postulaciones';
import { PerfilComponent } from '../../Perfil/Estudiante/perfil';

@Component({
  selector: 'app-consultar-notificaciones',
  standalone: true,
  imports: [CommonModule, PostulacionesComponent, PerfilComponent],
  templateUrl: './consultar-notificaciones.component.html',
  styleUrls: ['./consultar-notificaciones.component.css']
})
export class ConsultarNotificacionesComponent implements OnInit {
  activeTab = 'explorar';
  pasantias: any[] = [];
  showAvisosModal: boolean = false;
  notificaciones: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cargarPasantias();
  }

  async cargarPasantias() {
    try {
      const respuesta = await fetch('http://localhost:3000/api/pasantias');
      if (respuesta.ok) {
        this.pasantias = await respuesta.json();
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error("Error al cargar las pasantías:", error);
    }
  }

  setTab(tab: string) {
    this.activeTab = tab;
    this.cdr.detectChanges();
  }

  toggleAvisos() {
    this.showAvisosModal = !this.showAvisosModal;
    if (this.showAvisosModal) {
      this.cargarNotificaciones();
    }
    this.cdr.detectChanges();
  }

  async cargarNotificaciones() {
    try {
      const respuesta = await fetch('http://localhost:3000/api/notificaciones');
      if (respuesta.ok) {
        this.notificaciones = await respuesta.json();
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error("Error al cargar notificaciones:", error);
    }
  }

  async aplicar(job: any) {
    const hoy = new Date();
    const fechaFormateada = `${hoy.getDate()}/${hoy.getMonth() + 1}/${hoy.getFullYear()}`;

    const nuevaPostulacion = {
      id: 'post_' + Math.floor(Math.random() * 1000),
      pasantiaId: job.id,
      pasantia: job.titulo,
      empresa: job.empresa,
      fecha: fechaFormateada,
      estado: 'En revisión'
    };

    try {
      const respuesta = await fetch('http://localhost:3000/api/postulaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaPostulacion)
      });

      if (respuesta.ok) {
        job.aplicado = true;
        alert(`¡Te has postulado con éxito a: ${job.titulo}!`);
        await this.cargarPasantias();
        this.cdr.detectChanges();
      } else {
        alert('Hubo un error al procesar tu postulación en el servidor.');
      }
    } catch (error) {
      console.error("Error enviando la postulación:", error);
      alert('No se pudo conectar con el servidor.');
    }
  }
}