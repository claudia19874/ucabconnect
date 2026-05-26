import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consultar-notificaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultar-notificaciones.component.html',
  styleUrls: ['./consultar-notificaciones.component.css']
})
export class ConsultarNotificacionesComponent {
  activeTab = 'explorar';
  pasantias: any[] = [];

  showAvisosModal: boolean = false;
  notificaciones: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

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
}