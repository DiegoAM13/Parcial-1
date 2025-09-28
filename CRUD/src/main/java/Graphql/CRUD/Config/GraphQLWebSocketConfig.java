package Graphql.CRUD.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;

@Configuration
@EnableWebSocket
public class GraphQLWebSocketConfig {
    // Spring GraphQL automáticamente configura WebSocket para suscripciones
    // cuando spring-boot-starter-websocket está presente
}
