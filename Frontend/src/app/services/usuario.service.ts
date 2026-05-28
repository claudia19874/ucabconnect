import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private apiUrl = 'http://localhost:3000/api/usuario';

  constructor(private http: HttpClient) {}

  obtenerUsuario() {
    return this.http.get(this.apiUrl);
  }

}