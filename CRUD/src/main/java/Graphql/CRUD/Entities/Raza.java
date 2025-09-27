package Graphql.CRUD.Entities;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Raza")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Raza {

    @Id
    @Column(nullable = false)
    private Integer id;


    @Column(nullable = false, length = 20)
    private String raza;
}
