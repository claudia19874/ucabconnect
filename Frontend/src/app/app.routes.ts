import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegistroEstudianteComponent } from './features/perfiles/registro-estudiante/registro-estudiante.component';
import { RegistroEmpresaComponent } from './features/perfiles/registro-empresa/registro-empresa.component';
import { DashboardEstudianteComponent } from './estudiante/dashboard-estudiante.component';
import { DashboardEmpresaComponent } from './empresa/dashboard-empresa.component';

export const routes: Routes = [

  // Login inicial
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Auth
  { path: 'login', component: LoginComponent },

  // Registro
  { path: 'registro/estudiante', component: RegistroEstudianteComponent },

  { path: 'registro/empresa', component: RegistroEmpresaComponent },

  // Dashboards
  { path: 'dashboard-estudiante', component: DashboardEstudianteComponent },

  { path: 'dashboard-empresa', component: DashboardEmpresaComponent },

  // Ruta inválida
  { path: '**', redirectTo: 'login' }

];