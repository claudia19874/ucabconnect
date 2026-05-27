import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Vital para capturar datos de formularios
import { Vacante } from '../../models/vacante.models';
import { VacanteService } from '../../services/vacante.service';

@Component({
  selector: 'app-ver-vacantes',
  standalone: true,
  imports: [CommonModule, FormsModule], // Agregamos FormsModule aquí
  templateUrl: './ver-vacantes.html',
  styleUrls: ['./ver-vacantes.css']
})
export class VerVacantesComponent implements OnInit {
  
  listaVacantes: Vacante[] = [];
  
  // Controla si el formulario emergente está abierto o cerrado
  mostrarModal: boolean = false;

  // Objeto limpio para almacenar los datos que escriba el reclutador
  nuevaVacante = {
    titulo: '',
    sector: '',
    modalidad: 'Presencial', // Valor por defecto
    duracion: '',
    salario: '',
    ubicacion: 'Caracas, Venezuela', // Restricción del Brief
    descripcion: '',
    requisitosInput: '' // Los capturamos como texto separado por comas
  };

  constructor(private vacanteService: VacanteService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.obtenerVacantes();
  }

  obtenerVacantes() {
    this.vacanteService.getVacantes().subscribe({
      next: (datos) => {
        this.listaVacantes = datos;
        //Forzamos la actualización visual de forma explícita
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar vacantes:', err);
      }
    });
  }

  // Abre el formulario modal
  navegarAPublicar() {
    this.mostrarModal = true;
  }

  // Cierra el formulario modal y lo limpia
  cerrarModal() {
    this.mostrarModal = false;
    this.resetFormulario();
  }

  // Envía los datos capturados hacia tu servidor Express (Petición POST)
  publicarVacante() {
    // Validación básica de campos obligatorios (Criterio de Aceptación de tu ERS)
    if (!this.nuevaVacante.titulo || !this.nuevaVacante.descripcion || !this.nuevaVacante.sector) {
      alert('Por favor, rellene todos los campos obligatorios (*).');
      return;
    }

    // Convertimos la cadena de requisitos en un arreglo Orientado a Objetos limpio
    const arregloRequisitos = this.nuevaVacante.requisitosInput
      ? this.nuevaVacante.requisitosInput.split(',').map(req => req.trim())
      : [];

    // Estructuramos el payload final para mandar al Backend
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

    // Consumimos el servicio HTTP POST
    this.vacanteService.postVacante(vacanteParaEnviar).subscribe({
      next: (respuesta) => {
        alert('🎉 ¡Vacante publicada y guardada con éxito en el archivo JSON!');
        this.obtenerVacantes(); // Refrescamos la tabla instantáneamente
        this.cerrarModal(); // Cerramos la ventana flotante
      },
      error: (err) => {
        console.error('Error al publicar:', err);
        alert('Hubo un error de red al intentar guardar en el archivo JSON.');
      }
    });
  } 

  cerrarOferta(vacante: Vacante) {
    if (!vacante.id) return;
    
    const confirmar = confirm(`¿Estás seguro de que deseas cerrar la vacante: "${vacante.titulo}"?`);
    if (confirmar) {
      this.vacanteService.putCerrarVacante(vacante.id).subscribe({
        next: () => {
          // 1. Mostramos el mensaje de éxito
          alert('La vacante ha sido clausurada exitosamente.');
          
          // 2. LA MAGIA: Forzamos a Angular a traer los datos frescos del JSON
          this.obtenerVacantes(); 
        },
        error: (err) => {
          console.error('Error al cerrar la vacante:', err);
          alert('Hubo un problema de conexión con el servidor.');
        }
      });
    }
  }

  resetFormulario() {
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