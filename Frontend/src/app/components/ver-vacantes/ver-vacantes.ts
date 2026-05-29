import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Vacante } from '../../models/vacante.models';

// ✅ IMPORT CORREGIDO
import { VacanteService } from '../../Postulaciones/services/vacante.service';

@Component({
  selector: 'app-ver-vacantes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ver-vacantes.html',
  styleUrls: ['./ver-vacantes.css']
})

export class VerVacantesComponent implements OnInit {

  /* =========================
     LISTA DE VACANTES
  ========================= */
  listaVacantes: Vacante[] = [];

  /* =========================
     CONTROL MODAL
  ========================= */
  mostrarModal: boolean = false;

  /* =========================
     FORMULARIO NUEVA VACANTE
  ========================= */
  nuevaVacante = {

    titulo: '',
    sector: '',
    modalidad: 'Presencial',

    duracion: '',
    salario: '',

    ubicacion: 'Caracas, Venezuela',

    descripcion: '',

    requisitosInput: ''

  };

  /* =========================
     CONSTRUCTOR
  ========================= */
  constructor(

    private vacanteService: VacanteService,
    private cdr: ChangeDetectorRef

  ) {}

  /* =========================
     INICIO COMPONENTE
  ========================= */
  ngOnInit(): void {

    this.obtenerVacantes();

  }

  /* =========================
     OBTENER VACANTES
  ========================= */
  obtenerVacantes(): void {

    this.vacanteService.getVacantes().subscribe({

      next: (datos: Vacante[]) => {

        this.listaVacantes = datos;

        this.cdr.detectChanges();

      },

      error: (err: any) => {

        console.error(
          'Error al cargar vacantes:',
          err
        );

      }

    });

  }

  /* =========================
     ABRIR MODAL
  ========================= */
  navegarAPublicar(): void {

    this.mostrarModal = true;

  }

  /* =========================
     CERRAR MODAL
  ========================= */
  cerrarModal(): void {

    this.mostrarModal = false;

    this.resetFormulario();

  }

  /* =========================
     PUBLICAR VACANTE
  ========================= */
  publicarVacante(): void {

    // ✅ Validación básica
    if (
      !this.nuevaVacante.titulo ||
      !this.nuevaVacante.descripcion ||
      !this.nuevaVacante.sector
    ) {

      alert(
        'Por favor complete todos los campos obligatorios.'
      );

      return;

    }

    // ✅ Convertimos requisitos a array
    const arregloRequisitos =

      this.nuevaVacante.requisitosInput

        ? this.nuevaVacante.requisitosInput
            .split(',')
            .map(req => req.trim())

        : [];

    // ✅ Objeto final
    const vacanteParaEnviar = {

      titulo: this.nuevaVacante.titulo,

      sector: this.nuevaVacante.sector,

      modalidad: this.nuevaVacante.modalidad,

      duracion: this.nuevaVacante.duracion,

      salario: this.nuevaVacante.salario,

      ubicacion: this.nuevaVacante.ubicacion,

      descripcion: this.nuevaVacante.descripcion,

      requisitos: arregloRequisitos

    };

    // ✅ POST al backend
    this.vacanteService
      .postVacante(vacanteParaEnviar)
      .subscribe({

        next: (respuesta: any) => {

          console.log(
            'Vacante publicada:',
            respuesta
          );

          alert(
            '¡Vacante publicada exitosamente!'
          );

          this.obtenerVacantes();

          this.cerrarModal();

        },

        error: (err: any) => {

          console.error(
            'Error al publicar:',
            err
          );

          alert(
            'Hubo un problema al guardar la vacante.'
          );

        }

      });

  }

  /* =========================
     CERRAR OFERTA
  ========================= */
  cerrarOferta(vacante: Vacante): void {

    if (!vacante.id) return;

    const confirmar = confirm(
      `¿Deseas cerrar la vacante "${vacante.titulo}"?`
    );

    if (confirmar) {

      this.vacanteService
        .putCerrarVacante(vacante.id)
        .subscribe({

          next: (respuesta: any) => {

            console.log(
              'Vacante cerrada:',
              respuesta
            );

            alert(
              'Vacante cerrada exitosamente.'
            );

            this.obtenerVacantes();

          },

          error: (err: any) => {

            console.error(
              'Error al cerrar vacante:',
              err
            );

            alert(
              'No se pudo cerrar la vacante.'
            );

          }

        });

    }

  }

  /* =========================
     LIMPIAR FORMULARIO
  ========================= */
  resetFormulario(): void {

    this.nuevaVacante = {
      titulo: '',
      sector: '',
      modalidad: 'Presencial',
      duracion: '',
      salario: '',
      ubicacion: 'Caracas, Venezuela',
      descripcion: '',
      requisitosInput: ''
    };
  }
}