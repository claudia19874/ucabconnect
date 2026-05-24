import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PublicarVacante } from './components/publicar-vacante/publicar-vacante';
import { VerVacantesComponent } from './components/ver-vacantes/ver-vacantes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PublicarVacante, VerVacantesComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'frontend';
  
  // Control de estado: 'lista' muestra el panel principal; 'publicar' muestra el formulario
  vistaActual: 'lista' | 'publicar' = 'lista';

  cambiarVista(vista: 'lista' | 'publicar') {
    this.vistaActual = vista;
  }
}