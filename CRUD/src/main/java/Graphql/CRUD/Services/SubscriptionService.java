package Graphql.CRUD.Services;

import Graphql.CRUD.Entities.*;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;
import reactor.util.concurrent.Queues;

@Service
public class SubscriptionService {
    
    // Sinks para emitir eventos a los suscriptores
    private final Sinks.Many<Porcino> porcinoAgregadoSink = Sinks.many().multicast()
            .onBackpressureBuffer(Queues.SMALL_BUFFER_SIZE, false);
    
    private final Sinks.Many<Porcino> porcinoActualizadoSink = Sinks.many().multicast()
            .onBackpressureBuffer(Queues.SMALL_BUFFER_SIZE, false);
    
    private final Sinks.Many<Cliente> clienteAgregadoSink = Sinks.many().multicast()
            .onBackpressureBuffer(Queues.SMALL_BUFFER_SIZE, false);
    
    private final Sinks.Many<Raza> razaAgregadaSink = Sinks.many().multicast()
            .onBackpressureBuffer(Queues.SMALL_BUFFER_SIZE, false);
    
    private final Sinks.Many<Porcino> alertaPesoSink = Sinks.many().multicast()
            .onBackpressureBuffer(Queues.SMALL_BUFFER_SIZE, false);
    
    // Métodos para emitir eventos
    public void emitirPorcinoAgregado(Porcino porcino) {
        porcinoAgregadoSink.tryEmitNext(porcino);
    }
    
    public void emitirPorcinoActualizado(Porcino porcino) {
        porcinoActualizadoSink.tryEmitNext(porcino);
    }
    
    public void emitirClienteAgregado(Cliente cliente) {
        clienteAgregadoSink.tryEmitNext(cliente);
    }
    
    public void emitirRazaAgregada(Raza raza) {
        razaAgregadaSink.tryEmitNext(raza);
    }
    
    public void emitirAlertaPeso(Porcino porcino) {
        alertaPesoSink.tryEmitNext(porcino);
    }
    
    // Métodos para obtener los publishers
    public Flux<Porcino> getPorcinoAgregadoPublisher() {
        return porcinoAgregadoSink.asFlux();
    }
    
    public Flux<Porcino> getPorcinoActualizadoPublisher() {
        return porcinoActualizadoSink.asFlux();
    }
    
    public Flux<Cliente> getClienteAgregadoPublisher() {
        return clienteAgregadoSink.asFlux();
    }
    
    public Flux<Raza> getRazaAgregadaPublisher() {
        return razaAgregadaSink.asFlux();
    }
    
    public Flux<Porcino> getAlertaPesoPublisher(Float pesoLimite) {
        return alertaPesoSink.asFlux()
                .filter(porcino -> porcino.getPeso() > pesoLimite);
    }
}
