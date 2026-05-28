import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EstudianteService {

  // URL correcta
  private apiUrl = 'http://localhost:3000/api/usuario';

  constructor(private http: HttpClient) {}

  registrar(datosEstudiante: any) {

    return this.http.post(this.apiUrl, datosEstudiante);

  }

}