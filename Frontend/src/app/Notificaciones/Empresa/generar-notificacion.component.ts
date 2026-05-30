import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
  ofertasActivas = 0;
  totalAplicaciones = 0;
  ofertasCerradas = 0;
  showCrearNotificacionModal = false;
  notificacionesPublicadas = 0;
  notificaciones: any[] = [];
  empresaId = '';
  empresaNombre = '';

  constructor(private cdr: ChangeDetectorRef, private router: Router) {
    const usuarioGuardado = sessionStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.empresaId = usuario.id || '';
      this.empresaNombre = usuario.nombre || '';
    }
    this.cargarDatosEmpresa();
  }

  cerrarSesion() {
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('tipo');
    this.router.navigate(['/']);
  }

  setTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'notificaciones') this.cargarNotificaciones();
    else if (tab === 'ofertas') this.cargarDatosEmpresa();
    this.cdr.detectChanges();
  }

  async cargarDatosEmpresa() {
    if (!this.empresaId) return;
    try {
      const res = await fetch(`http://localhost:3000/api/vacantes/${this.empresaId}`);
      if (res.ok) {
        const vacantes = await res.json();
        this.ofertasActivas = vacantes.filter((v: any) => v.estado === 'Activa' || !v.estado).length;
        this.ofertasCerradas = vacantes.filter((v: any) => v.estado === 'Cerrada').length;
        this.totalAplicaciones = vacantes.reduce((sum: number, c: any) => sum + (c.aplicantes || 0), 0);
        this.cdr.detectChanges();
      }
    } catch (e) { console.error(e); }
  }

  abrirModalNotificacion() { this.showCrearNotificacionModal = true; this.cdr.detectChanges(); }
  cerrarModalNotificacion() { this.showCrearNotificacionModal = false; this.cdr.detectChanges(); }

  async cargarNotificaciones() {
    try {
      const res = await fetch('http://localhost:3000/api/notificaciones');
      if (res.ok) {
        this.notificaciones = await res.json();
        this.notificacionesPublicadas = this.notificaciones.length;
        this.cdr.detectChanges();
      }
    } catch (e) { console.error(e); }
  }

  async publicarNotificacion(titulo: string, mensaje: string) {
    if (!titulo || !mensaje) { alert("Completa el título y el mensaje."); return; }
    try {
      const res = await fetch('http://localhost:3000/api/notificaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, mensaje, empresaId: this.empresaId })
      });
      if (res.ok) { this.cerrarModalNotificacion(); await this.cargarNotificaciones(); }
    } catch (e) { console.error(e); }
  }

  eliminarNotificacion(id: string) {
    setTimeout(async () => {
      if (confirm("¿Eliminar esta notificación?")) {
        try {
          const res = await fetch(`http://localhost:3000/api/notificaciones/${id}`, { method: 'DELETE' });
          if (res.ok) await this.cargarNotificaciones();
        } catch (e) { console.error(e); }
      }
    }, 0);
  }
}