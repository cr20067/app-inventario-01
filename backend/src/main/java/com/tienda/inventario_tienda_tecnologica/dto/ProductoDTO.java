package com.tienda.inventario_tienda_tecnologica.dto;

import lombok.*; //importa las anotaciones de lombok para generar código repetitivo automáticamente

@Data //genera getters, setters, toString, equals y hashcode
@NoArgsConstructor //constructor vacío
@AllArgsConstructor //constructor con todos los campos
@Builder //permite construir objetos usando el patrón builder
public class ProductoDTO {

    private Long id; //identificador único del producto
    private String nombre; //nombre del producto
    private String marca; //marca del producto
    private Double precio; //precio del producto
    private Integer stock; //cantidad disponible en inventario
}
