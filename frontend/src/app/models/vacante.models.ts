export interface Vacante {
  id?: string;               // Es opcional (?) porque al crearla el backend le asignará el ID
  titulo: string;            // Ej: "Desarrollador Full Stack"
  ubicacion: string;         // Ej: Caracas, Chacao
  salario: string;           // Ej: "$400 - $600 USD"
  duracion: string;          // Ej: "6 meses"
  modalidad: string;         // Ej: "Presencial" o "Híbrido"
  descripcion: string;       // Texto detallado de la pasantía
  requisitos: string[];      // Arreglo de habilidades (Ej: ['React', 'Node.js', 'Git'])
  sector: string;            // Ej: "Tecnología", "Banca", etc.
  estado: 'Activa' | 'Cerrada'; // Para tu historia de usuario de "Cerrar vacante"
  fechaPublicacion?: Date;      // (Se pudiera quitar si el backend lo asigna automáticamente)
}
