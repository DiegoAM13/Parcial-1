package Graphql.CRUD.Controllers;

import Graphql.CRUD.Entities.*;
import Graphql.CRUD.Services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SubscriptionMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;

@Controller
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;
    
    // Suscripción para nuevos porcinos
    @SubscriptionMapping
    public Flux<Porcino> porcinoAgregado() {
        return subscriptionService.getPorcinoAgregadoPublisher();
    }
    
    // Suscripción para porcinos actualizados
    @SubscriptionMapping
    public Flux<Porcino> porcinoActualizado() {
        return subscriptionService.getPorcinoActualizadoPublisher();
    }
    
    // Suscripción para nuevos clientes
    @SubscriptionMapping
    public Flux<Cliente> clienteAgregado() {
        return subscriptionService.getClienteAgregadoPublisher();
    }
    
    // Suscripción para nuevas razas
    @SubscriptionMapping
    public Flux<Raza> razaAgregada() {
        return subscriptionService.getRazaAgregadaPublisher();
    }
    
    // Suscripción para alertas de peso
    @SubscriptionMapping
    public Flux<Porcino> alertaPesoPorcino(@Argument Float pesoLimite) {
        return subscriptionService.getAlertaPesoPublisher(pesoLimite);
    }
}
