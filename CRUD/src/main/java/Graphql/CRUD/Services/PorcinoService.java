package Graphql.CRUD.Services;

import Graphql.CRUD.DTOS.PorcinoDTO;
import Graphql.CRUD.Entities.Alimentacion;
import Graphql.CRUD.Entities.Cliente;
import Graphql.CRUD.Entities.Porcino;
import Graphql.CRUD.Entities.Raza;
import Graphql.CRUD.Repositories.AlimentacionRepository;
import Graphql.CRUD.Repositories.ClienteRepository;
import Graphql.CRUD.Repositories.PorcinoRepository;
import Graphql.CRUD.Repositories.RazaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PorcinoService {

    @Autowired
    private PorcinoRepository porcinoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private AlimentacionRepository alimentacionRepository;

    @Autowired
    private RazaRepository razaRepository;
    
    @Autowired
    private SubscriptionService subscriptionService;


    public  List<Porcino> obtenerPorcino()
    {
        return  porcinoRepository.findAll();
    }

    public Porcino obtenerPorcinoPorId(String identificacion)
    {
        return  porcinoRepository.findByIdentificacion(identificacion).orElse(null);
    }

    public void CrearPorcino(PorcinoDTO porcino)
    {
        if (porcinoRepository.existsByIdentificacion(porcino.getIdentificacion()))
        {
            throw new IllegalArgumentException("El porcino con esa identifiación ya existe");
        }

        Raza raza = razaRepository.findById(porcino.getRazaId())
                .orElseThrow(() -> new IllegalArgumentException("Raza no encontrada"));
        Alimentacion alimentacion = alimentacionRepository.findByTipo(porcino.getAlimentacionTipo())
                .orElseThrow(() -> new IllegalArgumentException("Alimentacion no encontrada"));
        Cliente cliente = clienteRepository.findById(porcino.getClienteCedula())
                .orElseThrow(() -> new IllegalArgumentException("Cliente no encontrado"));


        Porcino porcinonuevo = new Porcino(porcino.getIdentificacion(),porcino.getEdad(),porcino.getPeso(),raza,alimentacion,cliente);

        Porcino savedPorcino = porcinoRepository.save(porcinonuevo);
        
        // Emitir evento de porcino agregado
        subscriptionService.emitirPorcinoAgregado(savedPorcino);
        
        // Si el peso supera cierto límite, emitir alerta
        if (savedPorcino.getPeso() > 250) {
            subscriptionService.emitirAlertaPeso(savedPorcino);
        }
    }

    public Porcino EliminarPorcino(String Identificacion)
    {
        Porcino porcino = porcinoRepository.findByIdentificacion(Identificacion)
                .orElseThrow(()-> new EntityNotFoundException("Porcino con identificacion: "+Identificacion+" no fue encontrado"));

        porcinoRepository.delete(porcino);
        return porcino;
    }

    public Porcino ActualizarPorcino(String Identificacion, PorcinoDTO porcino)
    {
        Porcino porcinoActualizar = porcinoRepository.findByIdentificacion(Identificacion)
                .orElseThrow(()-> new EntityNotFoundException("Porcino con identificacion: "+Identificacion+" no fue encontrado"));

        if (porcino.getEdad() != null) {porcinoActualizar.setEdad(porcino.getEdad());}
        if(porcino.getPeso() != null && !porcino.getPeso().isNaN()){porcinoActualizar.setPeso(porcino.getPeso());}
        if (porcino.getRazaId() != null)
        {
            Raza raza = razaRepository.findById(porcino.getRazaId())
                    .orElseThrow(()-> new IllegalArgumentException("Raza no encontrada"));
            porcinoActualizar.setRaza(raza);
        }
        if (porcino.getAlimentacionTipo() != null )
        {
            Alimentacion alimentacion = alimentacionRepository.findByTipo(porcino.getAlimentacionTipo())
                    .orElseThrow(()-> new IllegalArgumentException("Alimentacion no encontrada"));
            porcinoActualizar.setAlimentacion(alimentacion);
        }
        if (porcino.getClienteCedula() != null)
        {
            Cliente cliente = clienteRepository.findById(porcino.getClienteCedula())
                    .orElseThrow(()-> new IllegalArgumentException("Cliente no encontrado"));
            porcinoActualizar.setCliente(cliente);
        }

        Porcino guardado = porcinoRepository.save(porcinoActualizar);
        return guardado;

    }
}
