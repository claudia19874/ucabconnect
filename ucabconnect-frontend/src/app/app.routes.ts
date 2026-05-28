import { Routes } from '@angular/router';
import { PostularseComponent } from './Postulaciones/Componentes/postularse.component';
import { MisPostulacionesComponent } from './Postulaciones/Componentes/mis-postulaciones.component';

export const routes: Routes = [
  { path: 'postularse', component: PostularseComponent },
  { path: 'mis-postulaciones', component: MisPostulacionesComponent },
  { path: '', redirectTo: '/postularse', pathMatch: 'full' }
];