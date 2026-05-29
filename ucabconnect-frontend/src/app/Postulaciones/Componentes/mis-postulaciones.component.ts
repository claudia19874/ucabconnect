import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostulacionService } from '../Services/postulacion.service';

@Component({
  selector: 'app-mis-postulaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="vista-historial">
      <h2>Mis Postulaciones</h2>
      <p class="sub">Consulta el estado de tus solicitudes ingresando tu cédula.</p>

      <div class="buscador">
        <input type="text" [(ngModel)]="cedulaBusqueda" placeholder="Ej: v-25666777">
        <button (click)="buscarHistorial()">Buscar</button>
      </div>

      <div *ngIf="listaPostulaciones.length > 0" class="tabla-contenedor">
        <table>
          <thead>
            <tr>
              <th>ID Postulación</th>
              <th>Código Vacante</th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of listaPostulaciones">
              <td><code class="codigo">{{ p.id }}</code></td>
              <td>{{ p.idVacante }}</td>
              <td>{{ p.fechaPostulacion | date:'dd/MM/yyyy' }}</td>
              <td>
                <span class="estado" [ngClass]="p.estado.toLowerCase()">
                  {{ p.estado }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div *ngIf="realizoBusqueda && listaPostulaciones.length === 0" class="alerta-vacia">
        No se encontraron postulaciones para la cédula ingresada.
      </div>
    </div>
  `,
  styles: [`
    .vista-historial { padding: 20px; max-width: 1000px; margin: 0 auto; }
    h2 { color: #004B23; font-size: 22px; margin-bottom: 5px; }
    .sub { color: #666; font-size: 14px; margin-bottom: 20px; }
    
    .buscador { margin-bottom: 25px; display: flex; gap: 10px; }
    .buscador input { padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 250px; }
    .buscador button { background: #004B23; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-weight: bold; }
    .buscador button:hover { background: #003314; }

    .tabla-contenedor { background: white; border: 1px solid #eee; border-radius: 6px; overflow: hidden; }
    table { width: 100%; border-collapse: collapse; }
    th { background: #f5f5f5; padding: 12px; text-align: left; font-size: 14px; color: #444; border-bottom: 2px solid #ddd; }
    td { padding: 12px; font-size: 14px; border-bottom: 1px solid #eee; }
    
    .codigo { background: #efefef; padding: 2px 6px; border-radius: 4px; font-size: 12px; }
    .estado { padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
    .estado.pendiente { background: #fff3cd; color: #856404; }
    .estado.aceptada { background: #d4edda; color: #155724; }
    .estado.rechazada { background: #f8d7da; color: #721c24; }

    .alerta-vacia { background: #fff3cd; color: #856404; padding: 12px; border-radius: 4px; border: 1px solid #ffeeba; margin-top: 15px; }
  `]
})
export class MisPostulacionesComponent {
  private postulacionService = inject(PostulacionService);

  cedulaBusqueda: string = '';
  listaPostulaciones: any[] = [];
  realizoBusqueda: boolean = false;

  buscarHistorial() {
    if (!this.cedulaBusqueda.trim()) return;

    this.postulacionService.obtenerPorEstudiante(this.cedulaBusqueda.trim()).subscribe({
      next: (data) => {
        this.listaPostulaciones = data;
        this.realizoBusqueda = true;
      },
      error: () => {
        this.listaPostulaciones = [];
        this.realizoBusqueda = true;
      }
    });
  }
}
