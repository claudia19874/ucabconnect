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

  setTab(tab: string) {
    this.activeTab = tab;
  }
}