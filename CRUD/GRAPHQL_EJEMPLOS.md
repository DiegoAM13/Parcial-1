# 📚 Ejemplos de GraphQL - Sistema de Gestión de Granja Porcina

Este documento contiene ejemplos de **Queries**, **Mutations** y **Subscriptions** disponibles en el sistema.

## 🔍 QUERIES (Consultas)

### 1. Obtener todas las razas
```graphql
query ObtenerTodasLasRazas {
  obtenerRaza {
    id
    raza
  }
}
```

### 2. Obtener una raza específica
```graphql
query ObtenerRazaPorId {
  obtenerRazaPorId(id: 1) {
    id
    raza
  }
}
```

### 3. Obtener todos los porcinos
```graphql
query ObtenerPorcinos {
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
```

### 4. Obtener un porcino específico
```graphql
query ObtenerPorcinoEspecifico {
  obtenerPorcinoPorId(identificacion: "P001") {
    identificacion
    edad
    peso
    raza {
      raza
    }
    cliente {
      nombre
      apellido
    }
  }
}
```

### 5. Obtener todos los clientes
```graphql
query ObtenerClientes {
  obtenerClientes {
    cedula
    nombre
    apellido
    direccion
    telefono
  }
}
```

### 6. Login de administrador
```graphql
query LoginAdmin {
  login(usuario: "admin", contrasena: "admin123") {
    id
    usuario
  }
}
```

### 7. Reporte general
```graphql
query ReporteGeneral {
  reportePorcino {
    clienteCedula
    clienteNombre
    clienteApellido
    porcinoIdentificacion
    porcinoPeso
    razaNombre
  }
}
```

### 8. Reporte por cliente
```graphql
query ReportePorCliente {
  reportePorcinosPorCliente(cedula: "123456789") {
    porcinoIdentificacion
    porcinoEdad
    porcinoPeso
    razaNombre
    alimentacionDescripcion
  }
}
```

## ✏️ MUTATIONS (Modificaciones)

### 1. Crear nueva raza
```graphql
mutation CrearRaza {
  guardarRaza(input: {
    id: 4
    raza: "Pietrain"
  }) {
    id
    raza
  }
}
```

### 2. Actualizar raza
```graphql
mutation ActualizarRaza {
  actualizarRaza(id: 1, input: {
    id: 1
    raza: "Yorkshire Mejorado"
  }) {
    id
    raza
  }
}
```

### 3. Eliminar raza
```graphql
mutation EliminarRaza {
  eliminarRaza(id: 4) {
    id
    raza
  }
}
```

### 4. Crear nuevo cliente
```graphql
mutation CrearCliente {
  guardarCliente(input: {
    cedula: "987654321"
    nombre: "Juan"
    apellido: "Pérez"
    direccion: "Calle 123"
    telefono: "3001234567"
  }) {
    cedula
    nombre
    apellido
  }
}
```

### 5. Crear nuevo porcino
```graphql
mutation CrearPorcino {
  guardarPorcino(input: {
    identificacion: "P005"
    edad: 12
    peso: 180.5
    razaId: 1
    alimentacionTipo: 1
    clienteCedula: "123456789"
  }) {
    identificacion
    edad
    peso
  }
}
```

### 6. Actualizar porcino
```graphql
mutation ActualizarPorcino {
  actualizarPorcino(identificacion: "P001", input: {
    identificacion: "P001"
    edad: 14
    peso: 200.0
    razaId: 2
    alimentacionTipo: 1
    clienteCedula: "123456789"
  }) {
    identificacion
    peso
  }
}
```

### 7. Eliminar porcino
```graphql
mutation EliminarPorcino {
  eliminarPorcino(identificacion: "P005") {
    identificacion
  }
}
```

### 8. Crear alimentación
```graphql
mutation CrearAlimentacion {
  guardarAlimentacion(input: {
    tipo: "4"
    descripcion: "Alimento Premium"
    dosis: 3.5
  }) {
    tipo
    descripcion
    dosis
  }
}
```

## 🔔 SUBSCRIPTIONS (Suscripciones en tiempo real)

### 1. Suscribirse a nuevos porcinos
```graphql
subscription NuevosPorcinos {
  porcinoAgregado {
    identificacion
    edad
    peso
    raza {
      raza
    }
    cliente {
      nombre
    }
  }
}
```

### 2. Suscribirse a actualizaciones de porcinos
```graphql
subscription ActualizacionesPorcinos {
  porcinoActualizado {
    identificacion
    peso
    edad
  }
}
```

### 3. Suscribirse a nuevos clientes
```graphql
subscription NuevosClientes {
  clienteAgregado {
    cedula
    nombre
    apellido
    telefono
  }
}
```

### 4. Suscribirse a nuevas razas
```graphql
subscription NuevasRazas {
  razaAgregada {
    id
    raza
  }
}
```

### 5. Alerta de peso excesivo
```graphql
subscription AlertaPeso {
  alertaPesoPorcino(pesoLimite: 250.0) {
    identificacion
    peso
    cliente {
      nombre
      telefono
    }
  }
}
```

## 🛠️ Cómo probar estos ejemplos

### Opción 1: GraphiQL (Interfaz web)
1. Abre tu navegador
2. Ve a: `http://localhost:8080/graphiql`
3. Copia y pega cualquier ejemplo
4. Haz clic en "Play" o presiona Ctrl+Enter

### Opción 2: Postman/Insomnia
1. URL: `http://localhost:8080/graphql`
2. Método: POST
3. Headers:
   ```
   Content-Type: application/json
   ```
4. Body (ejemplo):
   ```json
   {
     "query": "query { obtenerRaza { id raza } }"
   }
   ```

### Opción 3: Apollo Client (Frontend React)
```javascript
import { gql, useQuery } from '@apollo/client';

const GET_RAZAS = gql`
  query ObtenerRazas {
    obtenerRaza {
      id
      raza
    }
  }
`;

function RazasComponent() {
  const { loading, error, data } = useQuery(GET_RAZAS);
  
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <ul>
      {data.obtenerRaza.map(raza => (
        <li key={raza.id}>{raza.raza}</li>
      ))}
    </ul>
  );
}
```

### Para Subscriptions con Apollo Client:
```javascript
import { gql, useSubscription } from '@apollo/client';

const PORCINO_AGREGADO = gql`
  subscription PorcinoAgregado {
    porcinoAgregado {
      identificacion
      peso
    }
  }
`;

function PorcinoSubscription() {
  const { data, loading } = useSubscription(PORCINO_AGREGADO);
  
  if (!data || loading) return null;
  
  return (
    <div>
      Nuevo porcino: {data.porcinoAgregado.identificacion}
    </div>
  );
}
```

## 🔌 Configuración de WebSocket para Subscriptions

En el frontend, configura Apollo Client con WebSocket:

```javascript
import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { createHttpLink } from '@apollo/client/link/http';

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/graphql'
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:8080/graphql',
  options: {
    reconnect: true
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});
```

## 📝 Notas importantes

1. **Autenticación**: El query `login` valida las credenciales contra BCrypt
2. **IDs**: Asegúrate de que los IDs existan en la base de datos
3. **Subscriptions**: Requieren conexión WebSocket activa
4. **Tiempo real**: Las subscriptions solo recibirán eventos mientras estén conectadas
5. **Límites**: La alerta de peso solo se activa si el peso supera el límite especificado

---

© 2025 Sistema de Gestión de Granja Porcina
