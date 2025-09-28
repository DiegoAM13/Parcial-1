import { gql } from '@apollo/client';

// Mutations de Porcinos
export const ADD_PORCINO = gql`
  mutation AddPorcino($identificacion: ID!, $edad: Int!, $peso: Float!, $razaId: Int!, $alimentacionTipo: Int!, $clienteCedula: ID!) {
    guardarPorcino(input: {
      identificacion: $identificacion
      edad: $edad
      peso: $peso
      razaId: $razaId
      alimentacionTipo: $alimentacionTipo
      clienteCedula: $clienteCedula
    }) {
      identificacion
      edad
      peso
    }
  }
`;

export const CREATE_PORCINO = gql`
  mutation GuardarPorcino($input: PorcinoInput) {
    guardarPorcino(input: $input) {
      identificacion
      edad
      peso
    }
  }
`;

export const UPDATE_PORCINO = gql`
  mutation ActualizarPorcino($identificacion: ID!, $input: PorcinoInput) {
    actualizarPorcino(identificacion: $identificacion, input: $input) {
      identificacion
      edad
      peso
      raza {
        id
        raza
      }
      alimentacion {
        tipo
        descripcion
      }
      cliente {
        cedula
        nombre
        apellido
      }
    }
  }
`;

export const DELETE_PORCINO = gql`
  mutation EliminarPorcino($identificacion: ID!) {
    eliminarPorcino(identificacion: $identificacion) {
      identificacion
    }
  }
`;

// Mutations de Clientes
export const ADD_CLIENTE = gql`
  mutation AddCliente($cedula: ID!, $nombre: String!, $apellido: String!, $direccion: String!, $telefono: String!) {
    guardarCliente(input: {
      cedula: $cedula
      nombre: $nombre
      apellido: $apellido
      direccion: $direccion
      telefono: $telefono
    }) {
      cedula
      nombre
      apellido
    }
  }
`;

export const CREATE_CLIENTE = gql`
  mutation GuardarCliente($input: ClienteInput) {
    guardarCliente(input: $input) {
      cedula
      nombre
      apellido
      direccion
      telefono
    }
  }
`;

export const UPDATE_CLIENTE = gql`
  mutation ActualizarCliente($cedula: ID!, $input: ClienteInput) {
    actualizarCliente(cedula: $cedula, input: $input) {
      cedula
      nombre
      apellido
      direccion
      telefono
    }
  }
`;

export const DELETE_CLIENTE = gql`
  mutation EliminarCliente($cedula: ID!) {
    eliminarCliente(cedula: $cedula) {
      cedula
    }
  }
`;

// Mutations de Alimentación
export const CREATE_ALIMENTACION = gql`
  mutation GuardarAlimentacion($input: AlimentacionInput) {
    guardarAlimentacion(input: $input) {
      tipo
      descripcion
      dosis
    }
  }
`;

export const UPDATE_ALIMENTACION = gql`
  mutation ActualizarAlimentacion($tipo: ID!, $input: AlimentacionInput) {
    actualizarAlimentacion(tipo: $tipo, input: $input) {
      tipo
      descripcion
      dosis
    }
  }
`;

export const DELETE_ALIMENTACION = gql`
  mutation EliminarAlimentacion($tipo: ID!) {
    eliminarAlimentacion(tipo: $tipo) {
      tipo
    }
  }
`;

// Mutations de Administrador
export const CREATE_ADMINISTRADOR = gql`
  mutation GuardarAdministrador($input: AdministradorInput) {
    guardarAdministrador(input: $input) {
      id
      usuario
    }
  }
`;

export const UPDATE_ADMINISTRADOR = gql`
  mutation ActualizarAdministrador($usuario: String!, $input: AdministradorInput) {
    actualizarAdministrador(usuario: $usuario, input: $input) {
      id
      usuario
    }
  }
`;

export const DELETE_ADMINISTRADOR = gql`
  mutation EliminarAdministrador($usuario: String!) {
    eliminarAdministrador(usuario: $usuario) {
      usuario
    }
  }
`;
