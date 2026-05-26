import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  // ruta base del servidor Node.js
  private apiUrl = 'http://localhost:8080/api/perfiles';

  constructor(private http: HttpClient) {}

  // Método para registrar un nuevo estudiante
  registrar(datosEstudiante: any) {
    return this.http.post(`${this.apiUrl}/registro/estudiante`, datosEstudiante);
  }
}