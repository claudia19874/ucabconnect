import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegistroEstudianteComponent } from './features/perfiles/registro-estudiante/registro-estudiante.component';
import { RegistroEmpresaComponent } from './features/perfiles/registro-empresa/registro-empresa.component';
import { DashboardEstudianteComponent } from './estudiante/dashboard-estudiante.component';
import { DashboardEmpresaComponent } from './empresa/dashboard-empresa.component';
import { PostularseComponent } from './Postulaciones/Componentes/postularse.component';
import { MisPostulacionesComponent } from './Postulaciones/Componentes/mis-postulaciones.component';

export const routes: Routes = [

  // LOGIN
  { path: 'login', component: LoginComponent },

  // REGISTROS
  { path: 'registro/estudiante', component: RegistroEstudianteComponent },
  { path: 'registro/empresa', component: RegistroEmpresaComponent },

  // DASHBOARDS
  { path: 'estudiante', component: DashboardEstudianteComponent },
  { path: 'empresa', component: DashboardEmpresaComponent },

  // POSTULACIONES (Nuevas rutas integradas)
  { path: 'postularse', component: PostularseComponent },
  { path: 'mis-postulaciones', component: MisPostulacionesComponent },

  // INICIO
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // CUALQUIER RUTA INVÁLIDA (Siempre al final)
  { path: '**', redirectTo: '/login' }

];