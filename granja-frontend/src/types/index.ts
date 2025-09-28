// Tipos de entidades
export interface Cliente {
  cedula: string;
  nombre: string;
  apellido: string;
  direccion: string;
  telefono: string;
}

export interface Alimentacion {
  tipo: number;
  descripcion: string;
  dosis: number;
}

export interface Raza {
  id: number;
  raza: string;
}

export interface Porcino {
  identificacion: string;
  edad: number;
  peso: number;
  raza: Raza;
  alimentacion: Alimentacion;
  cliente: Cliente;
}

export interface Administrador {
  id: number;
  usuario: string;
  contrasena: string;
}

export interface ReportePorcino {
  clienteCedula: string;
  clienteNombre: string;
  clienteApellido: string;
  clienteTelefono: string;
  clienteDireccion: string;
  porcinoIdentificacion: string;
  porcinoEdad: number;
  porcinoPeso: number;
  razaNombre: string;
  alimentacionDescripcion: string;
  alimentacionDosis: number;
}

// Tipos de inputs para mutations
export interface ClienteInput {
  cedula: string;
  nombre: string;
  apellido: string;
  direccion: string;
  telefono: string;
}

export interface AlimentacionInput {
  tipo: number;
  descripcion: string;
  dosis: number;
}

export interface RazaInput {
  id: number;
  raza: string;
}

export interface PorcinoInput {
  identificacion: string;
  edad: number;
  peso: number;
  razaId: number;
  alimentacionTipo: number;
  clienteCedula: string;
}

export interface AdministradorInput {
  usuario: string;
  contrasena: string;
}

// Tipo para el contexto de autenticación
export interface AuthContextType {
  isAuthenticated: boolean;
  user: Administrador | null;
  login: (usuario: string, contrasena: string) => Promise<boolean>;
  logout: () => void;
}

// Tipos para formularios
export interface FormState {
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
}
