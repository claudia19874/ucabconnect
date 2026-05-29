import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../Postulaciones/services/usuario.service';

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
  postulacionesRealizadas: any[] = []; // ✅ Nuevo arreglo independiente
  showAvisosModal: boolean = false;
  showEditModal: boolean = false;
  usuario: any = {};
  editUsuario: any = {};

  /* =========================
     CONSTRUCTOR
  ========================= */
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  /* =========================
     INICIO COMPONENTE
  ========================= */
  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
      this.cargarPostulaciones();
      this.cargarVacantes(); 
    } else {
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
        this.cargarPostulaciones();
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

  /* =========================
     CARGAR NOTIFICACIONES
  ========================= */
  async cargarNotificaciones() {
    try {
      const respuesta = await fetch('http://localhost:3000/api/notificaciones');
      if (respuesta.ok) {
        this.notificaciones = await respuesta.json();
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error('Error al cargar notificaciones:', error);
    }
  }

  /* =========================
     CARGAR POSTULACIONES
  ========================= */
  cargarPostulaciones() {
    const cedula = this.usuario.cedula;
    if (!cedula) return;

    this.http.get<any[]>(
      `http://localhost:3000/api/postulaciones/estudiante/${cedula}`
    ).subscribe({
      next: (data: any[]) => {
        console.log('Postulaciones cargadas:', data);
        this.postulacionesRealizadas = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Error cargando postulaciones:', err);
      }
    });
  }

  /* =========================
     CARGAR VACANTES
  ========================= */
  cargarVacantes() {
    this.http.get<any[]>('http://localhost:3000/api/vacantes').subscribe({
      next: (data: any[]) => {
        console.log('Vacantes disponibles cargadas:', data);
        this.pasantias = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Error cargando las vacantes:', err);
      }
    });
  }

  /* =========================
     APLICAR A PASANTÍA (VERSIÓN CHISMOSA)
  ========================= */
  aplicarPasantia(job: any) {
    console.log('🚨 1. ¡EL BOTÓN FUE CLICKEADO!');
    console.log('🚨 2. Datos de la vacante:', job);
    
    const cedula = this.usuario.cedula;
    console.log('🚨 3. Cédula del estudiante:', cedula);

    if (!cedula) {
      alert("Error: No se encontró la cédula. Revisa la consola.");
      return;
    }

    const nuevaPostulacion = {
      idEstudiante: cedula,
      idVacante: job.id // Ojo: si en tu backend la vacante no tiene "id", esto fallará
    };

    console.log('🚨 4. Paquete listo para enviar al backend:', nuevaPostulacion);

    this.http.post('http://localhost:3000/api/postulaciones', nuevaPostulacion).subscribe({
      next: (respuesta: any) => {
        console.log('✅ 5. ¡ÉXITO! El servidor respondió:', respuesta);
        alert('¡Te has postulado con éxito a la vacante!');
        job.aplicado = true; 
        this.cargarPostulaciones(); 
      },
      error: (err: any) => {
        console.error('❌ 5. ERROR DEL SERVIDOR:', err);
        alert('Hubo un error al intentar aplicar. Verifica la consola.');
      }
    });
  }

  /* =========================
     ABRIR EDITAR PERFIL
  ========================= */
  abrirEditarPerfil() {
    this.editUsuario = {
      ...this.usuario,
      nombreCompleto: `${this.usuario.nombre} ${this.usuario.apellido}`,
      habilidades: this.usuario.habilidades ? [...this.usuario.habilidades] : [],
      intereses: this.usuario.intereses ? [...this.usuario.intereses] : []
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
    const partesNombre = this.editUsuario.nombreCompleto.split(' ');
    const nombre = partesNombre[0];
    const apellido = partesNombre.slice(1).join(' ');

    this.usuario = {
      ...this.editUsuario,
      nombre,
      apellido,
      habilidades: typeof this.editUsuario.habilidades === 'string'
          ? this.editUsuario.habilidades.split(',').map((h: string) => h.trim())
          : this.editUsuario.habilidades,
      intereses: typeof this.editUsuario.intereses === 'string'
          ? this.editUsuario.intereses.split(',').map((i: string) => i.trim())
          : this.editUsuario.intereses
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