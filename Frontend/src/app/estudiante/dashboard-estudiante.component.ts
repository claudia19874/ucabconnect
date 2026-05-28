import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-dashboard-estudiante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-estudiante.component.html',
  styleUrls: ['./dashboard-estudiante.component.css']
})

export class DashboardEstudianteComponent {

  /* =========================
     CONSTRUCTOR
  ========================= */

  constructor(
    private usuarioService: UsuarioService,
    private router: Router 
  ) {}

  /* =========================
     VARIABLES
  ========================= */

  notificaciones: any[] = [];

  activeTab = 'explorar';

  pasantias: any[] = [];

  showAvisosModal: boolean = false;

  showEditModal: boolean = false;

  // Usuario que viene del backend
  usuario: any = {};

  // Copia temporal para editar
  editUsuario: any = {};

  /* =========================
     INICIO COMPONENTE
  ========================= */

  ngOnInit() {

    this.obtenerUsuario();

  }

  /* =========================
     OBTENER USUARIO
  ========================= */

  obtenerUsuario() {

    this.usuarioService.obtenerUsuario().subscribe({

      next: (data: any) => {

        this.usuario = data;

      },

      error: (error: any) => {

        console.error('Error obteniendo usuario:', error);

      }

    });

  }

  /* =========================
     CAMBIAR TABS
  ========================= */

  setTab(tab: string) {

    this.activeTab = tab;

  }

  /* =========================
     MODAL NOTIFICACIONES
  ========================= */

  toggleAvisos() {

    this.showAvisosModal = !this.showAvisosModal;

  }

  /* =========================
     ABRIR EDITAR PERFIL
  ========================= */

  abrirEditarPerfil() {

    this.editUsuario = {
      ...this.usuario,
      habilidades: [...this.usuario.habilidades]
    };

    this.showEditModal = true;

  }

  /* =========================
     CERRAR EDITAR PERFIL
  ========================= */

  cerrarEditarPerfil() {
    this.showEditModal = false;
  }

  /* =========================
     GUARDAR CAMBIOS
  ========================= */

  guardarCambios() {
    this.usuario = {
      ...this.editUsuario,
      habilidades:
        typeof this.editUsuario.habilidades === 'string'
          ? this.editUsuario.habilidades
              .split(',')
              .map((h: string) => h.trim())
          : this.editUsuario.habilidades
    };
    this.showEditModal = false;
  }

  /* =========================
     CERRAR SESIÓN
  ========================= */
  cerrarSesion() {
    this.router.navigate(['/login']);
  }

}