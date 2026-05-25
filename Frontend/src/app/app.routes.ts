import { Routes } from '@angular/router';
import { DashboardEstudianteComponent } from './estudiante/dashboard-estudiante.component';
import { DashboardEmpresaComponent } from './empresa/dashboard-empresa.component';

export const routes: Routes = [
  { path: 'estudiante', component: DashboardEstudianteComponent },
  { path: 'empresa', component: DashboardEmpresaComponent },
  // Redirige por defecto a estudiante para pruebas
  { path: '', redirectTo: '/estudiante', pathMatch: 'full' } 
];