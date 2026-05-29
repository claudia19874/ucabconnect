import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vacante } from '../../models/vacante.models';

@Injectable({
  providedIn: 'root'
})
export class VacanteService {
  // Dirección base de nuestra API REST en Express
  private apiUrl = 'http://localhost:3000/api/vacantes';

  constructor(private http: HttpClient) { }

  // HU 1: Listar vacantes
  getVacantes(): Observable<Vacante[]> {
    return this.http.get<Vacante[]>(this.apiUrl);
  }

  // HU 2: Publicar una nueva vacante
  postVacante(nuevaVacante: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, nuevaVacante);
  }

  // HU 3: Clausurar / Cerrar una vacante existente
  putCerrarVacante(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/cerrar`, {});
  }
}