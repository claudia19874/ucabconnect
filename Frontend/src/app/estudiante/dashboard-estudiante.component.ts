import { Component } from '@angular/core';
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

  // Arreglo vacío a la espera de los datos del backend
  pasantias: any[] = []; 

  showAvisosModal: boolean = false;

  setTab(tab: string) {
    this.activeTab = tab;
  }

  toggleAvisos() {  // Función para abrir y cerrar el modal
    this.showAvisosModal = !this.showAvisosModal;
  }
}