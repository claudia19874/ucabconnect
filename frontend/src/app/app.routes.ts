import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegistroEstudianteComponent } from './features/perfiles/registro-estudiante/registro-estudiante.component';
import { RegistroEmpresaComponent } from './features/perfiles/registro-empresa/registro-empresa.component';

export const routes: Routes = [
  // login unificado de UCAB Connect
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // Rutas de tus pantallas
  { path: 'login', component: LoginComponent },
  { path: 'registro/estudiante', component: RegistroEstudianteComponent },
  { path: 'registro/empresa', component: RegistroEmpresaComponent },
  
  // Ruta para el login
  { path: '**', redirectTo: 'login' }
];