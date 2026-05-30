import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vacante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vacante.html',
  styleUrls: ['./vacante.css']
})
export class VacanteComponent implements OnInit {
  activeTab = 'mis-ofertas';
  empresaId = '';

  vacantes: any[] = [];
  ofertasActivas = 0;
  totalAplicaciones = 0;
  ofertasCerradas = 0;

  mostrarModal = false;
  nuevaVacante = {
    titulo: '', ubicacion: '', salario: '', duracion: '',
    modalidad: 'Presencial', descripcion: '', estado: 'Activa',
    aplicantes: 0, comentarioPasantia: ''
  };

  constructor(private cdr: ChangeDetectorRef) {
    const usuarioGuardado = sessionStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.empresaId = usuario.id || '';
    }
  }

  ngOnInit() {
    this.cargarVacantes();
  }

  async cargarVacantes() {
    if (!this.empresaId) return;
    try {
      const res = await fetch(`http://localhost:3000/api/vacantes/${this.empresaId}`);
      if (res.ok) {
        this.vacantes = await res.json();
        this.ofertasActivas = this.vacantes.filter(v => v.estado === 'Activa' || !v.estado).length;
        this.ofertasCerradas = this.vacantes.filter(v => v.estado === 'Cerrada').length;
        this.totalAplicaciones = this.vacantes.reduce((sum, c) => sum + (c.aplicantes || 0), 0);
        this.cdr.detectChanges();
      }
    } catch (e) {
      console.error('Error de red:', e);
    }
  }

  setTab(tab: string) { this.activeTab = tab; this.cdr.detectChanges(); }

  abrirModalNuevaOferta() { this.mostrarModal = true; this.cdr.detectChanges(); }

  cerrarModal() {
    this.mostrarModal = false;
    this.nuevaVacante = { titulo: '', ubicacion: '', salario: '', duracion: '', modalidad: 'Presencial', descripcion: '', estado: 'Activa', aplicantes: 0, comentarioPasantia: '' };
    this.cdr.detectChanges();
  }

  async publicarVacante() {
    if (!this.nuevaVacante.titulo || !this.nuevaVacante.ubicacion) {
      alert("Por favor llena al menos el título y la ubicación.");
      return;
    }
    try {
      const res = await fetch('http://localhost:3000/api/vacantes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...this.nuevaVacante, empresaId: this.empresaId })
      });
      if (res.ok) { this.cerrarModal(); await this.cargarVacantes(); }
      else alert("Hubo un error al guardar en el servidor.");
    } catch (e) { alert("No se pudo conectar con el servidor."); }
  }

  async cerrarVacante(vacante: any) {
    if (!confirm(`¿Cerrar la vacante "${vacante.titulo}"?`)) return;
    const idVacante = vacante._id || vacante.id;
    const { _id, id, ...datosSinId } = vacante;
    try {
      const res = await fetch(`http://localhost:3000/api/vacantes/${idVacante}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...datosSinId, estado: 'Cerrada' })
      });
      if (res.ok) await this.cargarVacantes();
      else alert(`Error del servidor (${res.status}). Revisa la consola.`);
    } catch (e) { alert("No se pudo conectar con el servidor."); }
  }
}