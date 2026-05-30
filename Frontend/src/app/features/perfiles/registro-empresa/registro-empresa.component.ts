import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // <-- IMPORTANTE: Importamos HttpClient

@Component({
  selector: 'app-registro-empresa',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css']
})
export class RegistroEmpresaComponent {
  
  empresa = {
    razonSocial: '',
    rif: '',
    sector: '',
    correoCorporativo: '',
    contrasena: '',
    nombreContacto: '',
    telefonoContacto: '',
    descripcion: '',
    codigoAcceso: '' 
  };

  // Inyectamos el HttpClient para poder hablar con el backend
  constructor(private router: Router, private http: HttpClient) {}

  onRegistroEmpresa() {
    console.log('Datos listos para enviar a la API del backend:', this.empresa);
    
    // 1. Formateamos los datos para que el backend entienda que es una empresa
    const datosParaEnviar = {
        empresa: this.empresa.razonSocial, // Tu backend espera 'empresa', no 'razonSocial'
        rif: this.empresa.rif,
        sector: this.empresa.sector,
        correo: this.empresa.correoCorporativo, // Tu backend espera 'correo', no 'correoCorporativo'
        contrasena: this.empresa.contrasena,
        telefono: this.empresa.telefonoContacto
    };

    // 2. Hacemos la petición POST real
    this.http.post('http://localhost:3000/api/usuario', datosParaEnviar).subscribe({
        next: (res: any) => {
            console.log('Respuesta del servidor:', res);
            alert('¡Registro de empresa exitoso!');
            this.router.navigate(['/login']);
        },
        error: (err) => {
            console.error('Error al registrar la empresa:', err);
            alert('Error: ' + (err.error?.mensaje || 'No se pudo conectar con el servidor'));
        }
    });
  }
}