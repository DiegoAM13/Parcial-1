package Graphql.CRUD.Repositories;

import Graphql.CRUD.Entities.Alimentacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlimentacionRepository extends JpaRepository<Alimentacion, Integer> {

    boolean existsByTipo(Integer tipo);

    Optional<Alimentacion> findByTipo(Integer tipo);
}
