package Graphql.CRUD.Controllers;

import Graphql.CRUD.Entities.Cliente;
import Graphql.CRUD.Repositories.ClienteRepository;
import Graphql.CRUD.Services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private ClienteRepository clienteRepository;

    @QueryMapping
    public List<Cliente>obtenerClientes(){
        return  clienteService.ObtenerClientes();
    }

    @QueryMapping
    public Cliente obtenerClientePorCedula(@Argument String cedula){
        return  clienteService.buscarPorCedula(cedula);
    }
    @MutationMapping
    public Cliente guardarCliente(@Argument("input") Cliente input) {
        clienteService.GuardarCliente(input);
        return input;
    }
    @MutationMapping
    public Cliente actualizarCliente(@Argument String cedula, @Argument("input") Cliente input) {

        return clienteService.ActualizarCliente(cedula, input);
    }


    @MutationMapping
    public Cliente eliminarCliente(@Argument String cedula) {
        return clienteService.EliminarCliente(cedula);
    }


}
