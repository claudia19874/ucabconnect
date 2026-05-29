import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
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
export class DashboardEstudianteComponent implements OnInit {

  /* =========================
     VARIABLES
  ========================= */
  notificaciones: any[] = [];
  activeTab = 'explorar';
  pasantias: any[] = [];
  showAvisosModal: boolean = false;
  showEditModal: boolean = false;
  usuario: any = {};
  editUsuario: any = {};

  /* =========================
     CONSTRUCTOR ÚNICO
  ========================= */
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  /* =========================
     INICIO COMPONENTE
  ========================= */
  ngOnInit() {
    // 🟢 Buscamos los datos que el Login dejó en la memoria del navegador
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    
    if (usuarioGuardado) {
      // Convertimos el texto de la memoria a un objeto real
      this.usuario = JSON.parse(usuarioGuardado);
    } else {
      // Si entraste directo sin pasar por el login, intentamos pedirlo al backend
      this.obtenerUsuario();
    }
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
    this.cdr.detectChanges();
  }

  /* =========================
     MODAL NOTIFICACIONES
  ========================= */
  toggleAvisos() {  
    this.showAvisosModal = !this.showAvisosModal;
    if (this.showAvisosModal) {
      this.cargarNotificaciones();
    }
    this.cdr.detectChanges();
  }

  async cargarNotificaciones() {
    try {
      const respuesta = await fetch('http://localhost:3000/api/notificaciones');
      if (respuesta.ok) {
        this.notificaciones = await respuesta.json();
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error("Error al cargar notificaciones:", error);
    }
  }

  /* =========================
     ABRIR EDITAR PERFIL
  ========================= */
  abrirEditarPerfil() {
    this.editUsuario = {
      ...this.usuario,
      habilidades: this.usuario.habilidades ? [...this.usuario.habilidades] : []
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
    localStorage.setItem('usuarioLogueado', JSON.stringify(this.usuario));
    this.showEditModal = false;
    this.cdr.detectChanges();
  }

  /* =========================
     CERRAR SESIÓN
  ========================= */
  cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    this.router.navigate(['/login']);
  }
}