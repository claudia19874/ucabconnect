import { Routes } from '@angular/router';
import { GenerarNotificacionComponent } from './Notificaciones/Empresa/generar-notificacion.component';
import { ConsultarNotificacionesComponent } from './Notificaciones/Estudiante/consultar-notificaciones.component';

export const routes: Routes = [
  { path: 'empresa',    component: GenerarNotificacionComponent },
  { path: 'estudiante', component: ConsultarNotificacionesComponent },
  { path: '', redirectTo: '/estudiante', pathMatch: 'full' }
];