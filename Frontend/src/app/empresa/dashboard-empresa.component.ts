import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-empresa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-empresa.component.html',
  styleUrls: ['./dashboard-empresa.component.css']
})
export class DashboardEmpresaComponent {
  activeTab = 'ofertas';

  // Variables de estadísticas inicializadas en cero
  ofertasActivas: number = 0;
  totalAplicaciones: number = 0;
  ofertasCerradas: number = 0;

  // Arreglo vacío a la espera de los datos del backend
  ofertas: any[] = [];

  setTab(tab: string) {
    this.activeTab = tab;
  }
}