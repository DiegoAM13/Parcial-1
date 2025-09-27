package Graphql.CRUD.Services;


import Graphql.CRUD.DTOS.ReporteDTO;
import Graphql.CRUD.Entities.Porcino;
import Graphql.CRUD.Repositories.PorcinoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReporteService {

    @Autowired
    private PorcinoRepository porcinoRepository;

    public List<ReporteDTO> obtenerReporteClientesPorcinos() {
        List<Porcino> porcinos = porcinoRepository.findAll();

        return porcinos.stream()
                .map(this::convertirAReporte)
                .collect(Collectors.toList());
    }

    public List<ReporteDTO> obtenerReportePorCliente(String cedula) {
        List<Porcino> porcinos = porcinoRepository.findByClienteCedula(cedula);

        return porcinos.stream()
                .map(this::convertirAReporte)
                .collect(Collectors.toList());
    }

    private ReporteDTO convertirAReporte(Porcino porcino) {
        ReporteDTO reporte = new ReporteDTO();

        // Información del cliente
        reporte.setClienteCedula(porcino.getCliente().getCedula());
        reporte.setClienteNombre(porcino.getCliente().getNombre());
        reporte.setClienteApellido(porcino.getCliente().getApellido());
        reporte.setClienteTelefono(porcino.getCliente().getTelefono());
        reporte.setClienteDireccion(porcino.getCliente().getDireccion());

        // Información del porcino
        reporte.setPorcinoIdentificacion(porcino.getIdentificacion());
        reporte.setPorcinoEdad(porcino.getEdad());
        reporte.setPorcinoPeso(porcino.getPeso());

        // Información de la raza
        reporte.setRazaNombre(porcino.getRaza().getRaza());

        // Información de la alimentación
        reporte.setAlimentacionDescripcion(porcino.getAlimentacion().getDescripcion());
        reporte.setAlimentacionDosis(porcino.getAlimentacion().getDosis());

        return reporte;
    }
}
