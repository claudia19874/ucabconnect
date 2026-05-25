import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-estudiante',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-estudiante.component.html',
  styleUrls: ['./dashboard-estudiante.component.css']
})
export class DashboardEstudianteComponent {
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