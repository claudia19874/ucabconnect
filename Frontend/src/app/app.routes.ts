import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/Login/login.component';
import { RegistroEstudianteComponent } from './Auth/RegistroEst/registro-estudiante.component';
import { RegistroEmpresaComponent } from './Auth/RegistroEmp/registro-empresa.component';
import { GenerarNotificacionComponent } from './Notificaciones/Empresa/generar-notificacion.component';
import { ConsultarNotificacionesComponent } from './Notificaciones/Estudiante/consultar-notificaciones.component';

export const routes: Routes = [
  { path: '',                    component: LoginComponent },
  { path: 'registro/estudiante', component: RegistroEstudianteComponent },
  { path: 'registro/empresa',    component: RegistroEmpresaComponent },
  { path: 'empresa',             component: GenerarNotificacionComponent },
  { path: 'estudiante',          component: ConsultarNotificacionesComponent },
];