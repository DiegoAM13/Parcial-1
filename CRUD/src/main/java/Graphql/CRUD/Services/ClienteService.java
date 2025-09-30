package Graphql.CRUD.Services;

import Graphql.CRUD.Entities.Cliente;
import Graphql.CRUD.Repositories.ClienteRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;
    
    @Autowired
    private SubscriptionService subscriptionService;

    public void GuardarCliente(Cliente cliente){
        if (clienteRepository.existsById(cliente.getCedula()))
        {
            throw  new IllegalArgumentException("El cliente ya existe");
        }
        Cliente savedCliente = clienteRepository.save(cliente);
        
        // Emitir evento de cliente agregado
        subscriptionService.emitirClienteAgregado(savedCliente);


    }public Cliente EliminarCliente(String Cedula)
    {
        Cliente cliente = clienteRepository.findById(Cedula)
                .orElseThrow(() -> new EntityNotFoundException("Cliente con cedula: " + Cedula + " no encontrado"));



        clienteRepository.delete(cliente);
        return cliente;
    }
    public List<Cliente> ObtenerClientes(){return clienteRepository.findAll();}

    public Cliente buscarPorCedula(String cedula) {
        return clienteRepository.findById(cedula).orElse(null);
    }

    public Cliente ActualizarCliente( String Cedula, Cliente clienteActualizar)
    {
        Cliente clienteexiste = clienteRepository.findById(Cedula)
                .orElseThrow(()-> new EntityNotFoundException("Cliente con cedula: " + Cedula+ " no encontrado"));

        if (clienteActualizar.getCedula() != null && !clienteActualizar.getCedula().isBlank())
        {
            clienteexiste.setCedula(clienteActualizar.getCedula());
        }
        if (clienteActualizar.getApellido() != null && !clienteActualizar.getApellido().isBlank())
        {
            clienteexiste.setApellido(clienteActualizar.getApellido());
        }
        if (clienteActualizar.getDireccion() != null && !clienteActualizar.getDireccion().isBlank())
        {
            clienteexiste.setDireccion(clienteActualizar.getDireccion());
        }
        if (clienteActualizar.getNombre() != null && !clienteActualizar.getNombre().isBlank())
        {
            clienteexiste.setNombre(clienteActualizar.getNombre());
        }
        if (clienteActualizar.getTelefono() != null && ! clienteActualizar.getTelefono().isBlank())
        {
            clienteexiste.setTelefono(clienteActualizar.getTelefono());
        }
        return clienteRepository.save(clienteexiste);
    }
}
