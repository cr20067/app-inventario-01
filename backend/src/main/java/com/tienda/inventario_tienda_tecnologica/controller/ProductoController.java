package com.tienda.inventario_tienda_tecnologica.controller;

import com.tienda.inventario_tienda_tecnologica.dto.ProductoDTO;
import com.tienda.inventario_tienda_tecnologica.service.ProductoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController //controlador rest que expone endpoints http
@RequestMapping("/api/productos") //ruta base para todos los métodos de producto
public class ProductoController {

    private final ProductoService productoService; //servicio que contiene la lógica de negocio

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping //endpoint get para listar productos
    public List<ProductoDTO> listar() {
        return productoService.listarProductos();
    }

    @PostMapping //endpoint post para crear un producto nuevo
    public ProductoDTO crear(@RequestBody ProductoDTO dto) {
        return productoService.guardarProducto(dto);
    }

    @PutMapping("/{id}") //endpoint put para actualizar un producto existente
    public ProductoDTO actualizar(@PathVariable Long id, @RequestBody ProductoDTO dto) {
        //se pasa el id del producto en la url y los datos nuevos en el cuerpo
        return productoService.actualizarProducto(id, dto);
    }

    @DeleteMapping("/{id}") //endpoint delete para eliminar un producto por id
    public void eliminar(@PathVariable Long id) {
        //se pasa el id del producto en la url y se elimina de la base de datos
        productoService.eliminarProducto(id);
    }
}
