import { gql } from '@apollo/client';

// Suscripción para nuevos porcinos
export const PORCINO_AGREGADO_SUBSCRIPTION = gql`
  subscription PorcinoAgregado {
    porcinoAgregado {
      identificacion
      edad
      peso
      raza {
        id
        raza
      }
      cliente {
        nombre
        apellido
      }
    }
  }
`;

// Suscripción para porcinos actualizados
export const PORCINO_ACTUALIZADO_SUBSCRIPTION = gql`
  subscription PorcinoActualizado {
    porcinoActualizado {
      identificacion
      edad
      peso
      raza {
        id
        raza
      }
    }
  }
`;

// Suscripción para nuevos clientes
export const CLIENTE_AGREGADO_SUBSCRIPTION = gql`
  subscription ClienteAgregado {
    clienteAgregado {
      cedula
      nombre
      apellido
      telefono
    }
  }
`;

// Suscripción para nuevas razas
export const RAZA_AGREGADA_SUBSCRIPTION = gql`
  subscription RazaAgregada {
    razaAgregada {
      id
      raza
    }
  }
`;

// Suscripción para alertas de peso
export const ALERTA_PESO_SUBSCRIPTION = gql`
  subscription AlertaPesoPorcino($pesoLimite: Float!) {
    alertaPesoPorcino(pesoLimite: $pesoLimite) {
      identificacion
      peso
      edad
      raza {
        raza
      }
    }
  }
`;
