package Graphql.CRUD.Services;

import Graphql.CRUD.Entities.Raza;
import Graphql.CRUD.Repositories.RazaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RazaService {

    @Autowired
    private RazaRepository razaRepository;
    
    @Autowired
    private SubscriptionService subscriptionService;
    public void CrearRaza(Raza raza) {

        if (razaRepository.existsById(raza.getId()) || razaRepository.existsByraza(raza.getRaza()))
        {
            throw  new IllegalArgumentException(" Ya existe");
        }
        Raza savedRaza = razaRepository.save(raza);
        
        // Emitir evento de raza agregada
        subscriptionService.emitirRazaAgregada(savedRaza);

    }

    public Raza EliminarRaza(Integer id)
    {
        Raza raza = razaRepository.findById(id)
                .orElseThrow(()-> new EntityNotFoundException("raza tipo: " + id+ " no encontrada"));

        razaRepository.delete(raza);
        return raza;
    }

    public List<Raza> ObtenerRaza(){
        return  razaRepository.findAll();
    }

    public Raza ObtenerPorId(Integer id) {return  razaRepository.findById(id).orElse(null);}

    public Raza guardarRaza(Raza raza) {
        if (razaRepository.existsById(raza.getId()) || razaRepository.existsByraza(raza.getRaza())) {
            throw new IllegalArgumentException("La raza ya existe");
        }
        Raza savedRaza = razaRepository.save(raza);
        
        // Emitir evento de raza agregada
        subscriptionService.emitirRazaAgregada(savedRaza);
        
        return savedRaza;
    }

    public Raza actualizarRaza(Integer id, Raza input) {
        Raza raza = razaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Raza con id: " + id + " no encontrada"));
        
        raza.setRaza(input.getRaza());
        return razaRepository.save(raza);
    }

    public Raza eliminarRaza(Integer id) {
        Raza raza = razaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Raza con id: " + id + " no encontrada"));
        
        razaRepository.delete(raza);
        return raza;
    }

}
