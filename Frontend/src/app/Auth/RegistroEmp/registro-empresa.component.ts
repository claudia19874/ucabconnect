import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-empresa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css']
})
export class RegistroEmpresaComponent {
  errorMensaje = '';

  sectores = [
    'Tecnología', 'Finanzas', 'Salud', 'Educación',
    'Consultoría', 'Manufactura', 'Comercio', 'Energía', 'Otro'
  ];

  ciudades = [
    'Caracas'
  ];

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  async registrar(
    nombre: string, rif: string, sector: string,
    correo: string, telefono: string, direccion: string,
    ciudad: string, contactoNombre: string, contactoCargo: string,
    codigoAcceso: string
  ) {
    if (!nombre || !rif || !sector || !correo || !telefono || !direccion || !ciudad || !contactoNombre || !contactoCargo || !codigoAcceso) {
      this.errorMensaje = 'Por favor completa todos los campos obligatorios.';
      this.cdr.detectChanges();
      return;
    }

    const nuevaEmpresa = {
      nombre, rif, sector, correo, telefono,
      direccion, ciudad, contactoNombre, contactoCargo, codigoAcceso
    };

    try {
      const res = await fetch('http://localhost:3000/api/auth/registro/empresa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaEmpresa)
      });

      const data = await res.json();

      if (res.ok) {
        alert('¡Empresa registrada con éxito! Ya puedes iniciar sesión.');
        this.router.navigate(['/']);
      } else {
        this.errorMensaje = data.error || 'Error al registrar la empresa.';
        this.cdr.detectChanges();
      }
    } catch (e) {
      this.errorMensaje = 'No se pudo conectar con el servidor.';
      this.cdr.detectChanges();
    }
  }

  cancelar() { this.router.navigate(['/']); }
}