package Graphql.CRUD.Config;

import Graphql.CRUD.Entities.Raza;
import Graphql.CRUD.Repositories.RazaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RazaRepository razaRepository;

    @Override
    public void run(String... args) throws Exception {
        // Inicializar razas si no existen
        if (razaRepository.count() == 0) {
            razaRepository.save(new Raza(1, "York"));
            razaRepository.save(new Raza(2, "Hampshire"));
            razaRepository.save(new Raza(3, "Duroc"));

            System.out.println("Razas inicializadas: York, Hampshire, Duroc");
        }
    }

}
