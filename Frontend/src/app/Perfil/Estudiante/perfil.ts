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
  userInitials: string = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cargarPerfil();
  }

  async cargarPerfil() {
    try {
      // Leemos el usuario guardado al hacer login
      const usuarioGuardado = sessionStorage.getItem('usuario');
      let url = 'http://localhost:3000/api/perfil';

      if (usuarioGuardado) {
        const usuario = JSON.parse(usuarioGuardado);
        if (usuario.id) {
          url = `http://localhost:3000/api/perfil?id=${usuario.id}`;
        }
      }

      const res = await fetch(url);
      if (res.ok) {
        this.miPerfil = await res.json();

        if (this.miPerfil?.nombre && this.miPerfil?.apellido) {
          const primerNombre = this.miPerfil.nombre.split(' ')[0];
          const primerApellido = this.miPerfil.apellido.split(' ')[0];
          this.userInitials = (primerNombre.charAt(0) + primerApellido.charAt(0)).toUpperCase();
        } else {
          this.userInitials = 'UC';
        }

        this.cdr.detectChanges();
      }
    } catch (e) {
      console.error("Error al cargar el perfil:", e);
    }
  }
}