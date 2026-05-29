import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegistroEstudianteComponent } from './features/perfiles/registro-estudiante/registro-estudiante.component';
import { RegistroEmpresaComponent } from './features/perfiles/registro-empresa/registro-empresa.component';
import { DashboardEstudianteComponent } from './estudiante/dashboard-estudiante.component';
import { DashboardEmpresaComponent } from './empresa/dashboard-empresa.component';

export const routes: Routes = [

  // LOGIN
  { path: 'login', component: LoginComponent },

  // REGISTROS
  { path: 'registro-estudiante', component: RegistroEstudianteComponent },

  { path: 'registro-empresa', component: RegistroEmpresaComponent },

  // DASHBOARDS
  { path: 'estudiante', component: DashboardEstudianteComponent },

  { path: 'empresa', component: DashboardEmpresaComponent },

  // INICIO
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // CUALQUIER RUTA INVALIDA
  { path: '**', redirectTo: '/login' }

];