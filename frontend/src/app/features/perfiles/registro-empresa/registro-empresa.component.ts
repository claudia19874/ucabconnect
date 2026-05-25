import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

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

  constructor(private router: Router) {}

  onRegistroEmpresa() {
    // Sin bloqueos de Front. Empaquetamos y directo a la consola para el backend
    console.log('Datos listos para enviar a la API del backend:', this.empresa);
    
    alert('¡Registro de empresa enviado! El backend validará sus credenciales.');
    this.router.navigate(['/login']);
  }
}
