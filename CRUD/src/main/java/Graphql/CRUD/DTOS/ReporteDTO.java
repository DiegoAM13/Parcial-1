package Graphql.CRUD.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReporteDTO {

    private String clienteCedula;
    private String clienteNombre;
    private String clienteApellido;
    private String clienteTelefono;
    private String clienteDireccion;
    private String porcinoIdentificacion;
    private Integer porcinoEdad;
    private Float porcinoPeso;
    private String razaNombre;
    private String alimentacionDescripcion;
    private Float alimentacionDosis;
}
