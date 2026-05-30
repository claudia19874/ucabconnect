import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-estudiante',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class PerfilComponent implements OnInit {
  miPerfil: any = {};
  userInitials: string = ''; // Variable para guardar las letras (ej: JP)

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cargarPerfil();
  }

  async cargarPerfil() {
    try {
      const res = await fetch('http://localhost:3000/api/perfil');
      if (res.ok) {
        this.miPerfil = await res.json();
        
        // Lógica para extraer la primera letra del nombre y apellido
        if (this.miPerfil && this.miPerfil.nombre && this.miPerfil.apellido) {
          const primerNombre = this.miPerfil.nombre.split(' ')[0];
          const primerApellido = this.miPerfil.apellido.split(' ')[0];
          this.userInitials = (primerNombre.charAt(0) + primerApellido.charAt(0)).toUpperCase();
        } else {
          this.userInitials = 'UC'; // Por si la base de datos viene vacía
        }

        this.cdr.detectChanges();
      }
    } catch (e) {
      console.error("Error al cargar el perfil:", e);
    }
  }
}