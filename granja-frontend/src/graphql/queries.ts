import { gql } from '@apollo/client';

// Queries de Porcinos
export const GET_PORCINOS = gql`
  query ObtenerPorcino {
    obtenerPorcino {
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
        dosis
      }
      cliente {
        cedula
        nombre
        apellido
      }
    }
  }
`;

export const GET_PORCINO_BY_ID = gql`
  query ObtenerPorcinoPorId($identificacion: ID!) {
    obtenerPorcinoPorId(identificacion: $identificacion) {
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
        dosis
      }
      cliente {
        cedula
        nombre
        apellido
        direccion
        telefono
      }
    }
  }
`;

// Queries de Clientes
export const GET_CLIENTES = gql`
  query ObtenerClientes {
    obtenerClientes {
      cedula
      nombre
      apellido
      direccion
      telefono
    }
  }
`;

export const GET_CLIENTE_BY_CEDULA = gql`
  query ObtenerClientePorCedula($cedula: ID!) {
    obtenerClientePorCedula(cedula: $cedula) {
      cedula
      nombre
      apellido
      direccion
      telefono
    }
  }
`;

// Queries de Alimentación
export const GET_ALIMENTACION = gql`
  query ObtenerAlimentacion {
    obtenerAlimentacion {
      tipo
      descripcion
      dosis
    }
  }
`;

export const GET_ALIMENTACION_BY_TIPO = gql`
  query ObtenerAlimentacionPorTipo($tipo: ID!) {
    obtenerAlimentacionPorTipo(tipo: $tipo) {
      tipo
      descripcion
      dosis
    }
  }
`;

// Queries de Razas
export const GET_RAZAS = gql`
  query ObtenerRaza {
    obtenerRaza {
      id
      raza
    }
  }
`;

export const GET_RAZA_BY_ID = gql`
  query ObtenerRazaPorId($id: ID!) {
    obtenerRazaPorId(id: $id) {
      id
      raza
    }
  }
`;

// Queries de Reportes
export const GET_REPORTE_GENERAL = gql`
  query ReportePorcino {
    reportePorcino {
      clienteCedula
      clienteNombre
      clienteApellido
      clienteTelefono
      clienteDireccion
      porcinoIdentificacion
      porcinoEdad
      porcinoPeso
      razaNombre
      alimentacionDescripcion
      alimentacionDosis
    }
  }
`;

export const GET_REPORTE_POR_CLIENTE = gql`
  query ReportePorcinosPorCliente($cedula: ID!) {
    reportePorcinosPorCliente(cedula: $cedula) {
      clienteCedula
      clienteNombre
      clienteApellido
      clienteTelefono
      clienteDireccion
      porcinoIdentificacion
      porcinoEdad
      porcinoPeso
      razaNombre
      alimentacionDescripcion
      alimentacionDosis
    }
  }
`;

// Query de Administrador
export const GET_ADMINISTRADOR = gql`
  query ObtenerAdministradorPorUsuario($usuario: String!) {
    obtenerAdministradorPorUsuario(usuario: $usuario) {
      id
      usuario
      contrasena
    }
  }
`;

export const LOGIN_QUERY = gql`
  query Login($usuario: String!, $contrasena: String!) {
    login(usuario: $usuario, contrasena: $contrasena) {
      id
      usuario
      contrasena
    }
  }
`;
