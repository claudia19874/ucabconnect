import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacanteComponent } from '../../Vacantes/vacante';

@Component({
  selector: 'app-generar-notificacion',
  standalone: true,
  imports: [CommonModule, VacanteComponent],
  templateUrl: './generar-notificacion.component.html',
  styleUrls: ['./generar-notificacion.component.css']
})
export class GenerarNotificacionComponent {
  activeTab = 'ofertas';

  ofertasActivas: number = 0;
  totalAplicaciones: number = 0;
  ofertasCerradas: number = 0;

  showCrearNotificacionModal: boolean = false;
  notificacionesPublicadas: number = 0;
  notificaciones: any[] = [];
  empresaId = 'emp_001';

  constructor(private cdr: ChangeDetectorRef) {
    this.cargarDatosEmpresa();
  }

  setTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'notificaciones') {
      this.cargarNotificaciones();
    } else if (tab === 'ofertas') {
      this.cargarDatosEmpresa();
    }
    this.cdr.detectChanges();
  }

  async cargarDatosEmpresa() {
    try {
      const res = await fetch(`http://localhost:3000/api/vacantes/${this.empresaId}`);
      if (res.ok) {
        const vacantes = await res.json();
        this.ofertasActivas = vacantes.length;
        this.totalAplicaciones = vacantes.reduce((sum: number, current: any) => sum + (current.aplicantes || 0), 0);
        this.ofertasCerradas = 1;
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error("Error al cargar datos de empresa:", error);
    }
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
        this.cdr.detectChanges();
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
        this.cerrarModalNotificacion();
        await this.cargarNotificaciones();
      }
    } catch (error) {
      console.error("Error al publicar:", error);
    }
  }

  eliminarNotificacion(id: string) {
    // setTimeout evita el bug del doble clic causado por confirm() bloqueando el hilo de Angular
    setTimeout(async () => {
      if (confirm("¿Estás seguro de que deseas eliminar esta notificación?")) {
        try {
          const respuesta = await fetch(`http://localhost:3000/api/notificaciones/${id}`, {
            method: 'DELETE'
          });
          if (respuesta.ok) {
            await this.cargarNotificaciones();
          }
        } catch (error) {
          console.error("Error al eliminar la notificación:", error);
        }
      }
    }, 0);
  }
}