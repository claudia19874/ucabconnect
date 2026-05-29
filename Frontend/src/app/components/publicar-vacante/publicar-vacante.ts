import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Vacante } from '../../models/vacante.models';

@Component({
  selector: 'app-publicar-vacante',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importante para que funcionen los formularios
  templateUrl: './publicar-vacante.html',
  styleUrl: './publicar-vacante.css',
})
export class PublicarVacante {
  // Inicializamos un objeto vacío basado en tu modelo
  nuevaVacante: Vacante = { 
    titulo: '',
    ubicacion: 'Caracas, Venezuela', // Forzamos la restricción de ciudad desde el inicio
    salario: '',
    duracion: '',
    modalidad: 'Presencial',
    descripcion: '',
    requisitos: [],
    sector: '',
    estado: 'Activa'
  };

  requisitosTexto: string = ''; // Para manejar el input separado por comas del Figma

  publicarOferta() {
    // Convertimos el texto separado por comas en un arreglo real
    this.nuevaVacante.requisitos = this.requisitosTexto.split(',').map(req => req.trim());

    // Aquí irían las validaciones antes de enviar al backend
    console.log('Enviando vacante al backend JSON...', this.nuevaVacante);
    alert('¡Resumen de la oferta generada con éxito!');
  }
}
