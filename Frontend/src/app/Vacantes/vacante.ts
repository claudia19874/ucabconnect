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
  empresaId = 'emp_001'; 
  
  vacantes: any[] = [];
  ofertasActivas = 0;
  totalAplicaciones = 0;
  ofertasCerradas = 0; // Ahora empieza en 0 para calcularse dinámicamente

  // Modal
  mostrarModal = false;
  nuevaVacante = {
    titulo: '', 
    ubicacion: '', 
    salario: '', 
    duracion: '', 
    modalidad: 'Presencial', 
    descripcion: '', 
    estado: 'Activa', 
    aplicantes: 0,
    comentarioPasantia: '' 
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cargarVacantes(); 
  }

  // GET: Traer vacantes reales y calcular métricas dinámicas por estado
  async cargarVacantes() {
    try {
      const res = await fetch(`http://localhost:3000/api/vacantes/${this.empresaId}`);
      if (res.ok) {
        this.vacantes = await res.json();
        
        // CORRECCIÓN: Filtramos los contadores según el estado real de la BD
        this.ofertasActivas = this.vacantes.filter(v => v.estado === 'Activa' || !v.estado).length;
        this.ofertasCerradas = this.vacantes.filter(v => v.estado === 'Cerrada').length;
        this.totalAplicaciones = this.vacantes.reduce((sum, current) => sum + (current.aplicantes || 0), 0);
        
        this.cdr.detectChanges();
      } else {
        console.error("Error al obtener datos del backend");
      }
    } catch (e) {
      console.error('Error de red. Asegúrate de que el Backend esté encendido:', e);
    }
  }

  setTab(tab: string) {
    this.activeTab = tab;
    this.cdr.detectChanges();
  }

  abrirModalNuevaOferta() {
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.nuevaVacante = { 
      titulo: '', ubicacion: '', salario: '', duracion: '', modalidad: 'Presencial', descripcion: '', estado: 'Activa', aplicantes: 0, comentarioPasantia: '' 
    };
    this.cdr.detectChanges();
  }

  async publicarVacante() {
    if (!this.nuevaVacante.titulo || !this.nuevaVacante.ubicacion) {
      alert("Por favor llena al menos el título y la ubicación.");
      return;
    }

    const payload = {
      ...this.nuevaVacante,
      empresaId: this.empresaId
    };

    try {
      const res = await fetch('http://localhost:3000/api/vacantes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        this.cerrarModal();
        await this.cargarVacantes(); 
      } else {
        alert("Hubo un error al guardar en el servidor.");
      }
    } catch (e) {
      console.error("Error al publicar:", e);
      alert("No se pudo conectar con el servidor para publicar.");
    }
  }

  // NUEVO MÉTODO: Cambiar estado a 'Cerrada' en el Backend
  async cerrarVacante(vacante: any) {
  if (!confirm(`¿Estás seguro de que deseas cerrar la vacante "${vacante.titulo}"?`)) {
    return;
  }

  const idVacante = vacante._id || vacante.id;

  // 🔥 SOLUCIÓN 1: Separamos el _id y el id del resto de los datos.
  // Así evitamos enviarlo en el body y que el backend tire error de "ID inmutable"
  const { _id, id, ...datosSinId } = vacante; 

  const payloadActualizado = {
    ...datosSinId,
    estado: 'Cerrada'
  };

  try {
    // Intentamos la petición limpia por PUT
    let res = await fetch(`http://localhost:3000/api/vacantes/${idVacante}`, {
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payloadActualizado)
    });
    if (res.ok) {
      // Si todo sale bien, recargamos la lista y las métricas
      await this.cargarVacantes(); 
    } else {
      // Si el servidor responde con error (400, 404, 500), lo imprimimos para saber qué es
      console.error(`Error del servidor. Código de estado: ${res.status}`);
      
      // Intentamos leer el mensaje exacto que escupió el backend
      const errorData = await res.json().catch(() => ({}));
      console.error("Detalle del error en backend:", errorData);

      alert(`El servidor rechazó la solicitud (Código: ${res.status}). Revisa la consola del navegador.`);
    }
  } catch (e) {
    console.error("Error de red al intentar cerrar la vacante:", e);
    alert("No se pudo establecer conexión con el servidor.");
  }
}
}