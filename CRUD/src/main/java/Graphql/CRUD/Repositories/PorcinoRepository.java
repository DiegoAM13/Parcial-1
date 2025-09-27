package Graphql.CRUD.Repositories;

import Graphql.CRUD.Entities.Porcino;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PorcinoRepository extends JpaRepository<Porcino,String > {

    boolean existsByIdentificacion(String identificacion);

    Optional<Porcino> findByIdentificacion(String identificacion);

    List<Porcino> findByClienteCedula(String cedula);
}
