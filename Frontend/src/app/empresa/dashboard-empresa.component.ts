import { Component, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
// 1. IMPORTA TU COMPONENTE (Ajusta la ruta si tus carpetas tienen nombres distintos)
import { VerVacantesComponent } from '../components/ver-vacantes/ver-vacantes'; 

@Component({
  selector: 'app-dashboard-empresa',
  standalone: true,
  // 2. AGREGA TU COMPONENTE AL ARREGLO DE IMPORTS JUNTO A COMMONMODULE
  imports: [CommonModule, VerVacantesComponent], 
  templateUrl: './dashboard-empresa.component.html',
  styleUrls: ['./dashboard-empresa.component.css']
})
export class DashboardEmpresaComponent {
  activeTab = 'ofertas';

  ofertasActivas: number = 0;
  totalAplicaciones: number = 0;
  ofertasCerradas: number = 0;
  ofertas: any[] = [];

  showCrearNotificacionModal: boolean = false;
  notificacionesPublicadas: number = 0;
  notificaciones: any[] = []; 

  constructor(private cdr: ChangeDetectorRef) {}

  setTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'notificaciones') {
      this.cargarNotificaciones();
    }
    this.cdr.detectChanges(); 
  }

  abrirModalNotificacion() {
    this.showCrearNotificacionModal = true;
    this.cdr.detectChanges();
  }

  cerrarModalNotificacion() {
    this.showCrearNotificacionModal = false;
    this.cdr.detectChanges();
  }

  async cargarNotificaciones() {
    try {
      const respuesta = await fetch('http://localhost:3000/api/notificaciones');
      if (respuesta.ok) {
        this.notificaciones = await respuesta.json();
        this.notificacionesPublicadas = this.notificaciones.length;
        this.cdr.detectChanges(); // 3. Le avisamos a Angular que los datos llegaron
      }
    } catch (error) {
      console.error("Error al cargar notificaciones:", error);
    }
  }

  async publicarNotificacion(titulo: string, mensaje: string) {
    if (!titulo || !mensaje) {
      alert("Por favor, completa el título y el mensaje.");
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:3000/api/notificaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, mensaje })
      });

      if (respuesta.ok) {
        alert("¡Notificación publicada con éxito!");
        this.cerrarModalNotificacion(); 
        this.cargarNotificaciones(); 
      }
    } catch (error) {
      console.error("Error al publicar:", error);
    }
  }

  async eliminarNotificacion(id: string) {
    if (confirm("¿Estás seguro de que deseas eliminar esta notificación de forma permanente?")) {
      try {
        const respuesta = await fetch(`http://localhost:3000/api/notificaciones/${id}`, {
          method: 'DELETE'
        });
        if (respuesta.ok) {
          this.cargarNotificaciones(); 
        }
      } catch (error) {
        console.error("Error al eliminar la notificación:", error);
      }
    }
  }
}