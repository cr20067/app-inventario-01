package com.tienda.inventario_tienda_tecnologica.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "productos") // sin espacios
@Builder
@Data // genera getters, setters, toString, equals, hashCode
@NoArgsConstructor // constructor vacío
@AllArgsConstructor // constructor con todos los campos
public class Producto {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String marca;

    @Column(nullable = false)
    private Double precio;

    @Column(nullable = false)
    private Integer stock;

}