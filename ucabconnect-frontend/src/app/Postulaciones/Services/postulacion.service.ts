import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostulacionService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/api/postulaciones';

  crearPostulacion(datos: any): Observable<any> {
    return this.http.post(this.url, datos);
  }

  obtenerPorEstudiante(idEstudiante: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/estudiante/${idEstudiante}`);
  }
}