import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-estudiante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-estudiante.component.html',
  styleUrls: ['./dashboard-estudiante.component.css']
})
export class DashboardEstudianteComponent {
  activeTab = 'explorar'; 

  // Arreglo vacío a la espera de los datos del backend
  pasantias: any[] = []; 

  showAvisosModal: boolean = false;

  showEditModal: boolean = false;

// Datos simulados del usuario logueado
usuario = {
  nombre: 'Juan Pérez',
  email: 'juan.perez@ucab.edu.ve',
  cedula: 'V-12345678',
  carrera: 'Ingeniería Informática',
  semestre: '8° Semestre',
  sede: 'Montalbán (Caracas)',
  telefono: '+58 412-1234567',
  habilidades: [
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'SQL',
    'Git'
  ]
};

// Copia temporal para editar
editUsuario: any = {};

  setTab(tab: string) {
    this.activeTab = tab;
  }

  toggleAvisos() {  // Función para abrir y cerrar el modal
    this.showAvisosModal = !this.showAvisosModal;
  }

  abrirEditarPerfil() {

  this.editUsuario = {
    ...this.usuario,
    habilidades: [...this.usuario.habilidades]
  };

  this.showEditModal = true;
}

cerrarEditarPerfil() {
  this.showEditModal = false;
}

guardarCambios() {

  this.usuario = {
    ...this.editUsuario,
    habilidades:
      typeof this.editUsuario.habilidades === 'string'
        ? this.editUsuario.habilidades
            .split(',')
            .map((h: string) => h.trim())
        : this.editUsuario.habilidades
  };

  this.showEditModal = false;
}
}