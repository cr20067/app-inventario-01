package com.tienda.inventario_tienda_tecnologica.service;

import com.tienda.inventario_tienda_tecnologica.dto.ProductoDTO;
import com.tienda.inventario_tienda_tecnologica.model.Producto;
import com.tienda.inventario_tienda_tecnologica.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service //indica que esta clase es un servicio de spring y contiene la lógica de negocio
public class ProductoService {

    private final ProductoRepository productoRepository; //repositorio para acceder a la base de datos

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    //convierte entidad producto a dto para enviar datos al cliente
    private ProductoDTO toDTO(Producto producto) {
        return new ProductoDTO(
            producto.getId(), 
            producto.getNombre(), 
            producto.getMarca(), 
            producto.getPrecio(),
            producto.getStock()
        );
    }

    //convierte dto a entidad producto para guardar datos en la base de datos
    private Producto toEntity(ProductoDTO dto) {
        return Producto.builder()
                .nombre(dto.getNombre())
                .precio(dto.getPrecio())
                .marca(dto.getMarca() != null ? dto.getMarca() : "sin marca") //valor por defecto si no se recibe
                .stock(dto.getStock() != null ? dto.getStock() : 0) //valor inicial por defecto
                .build();
    }

    //devuelve una lista de productos en formato dto
    public List<ProductoDTO> listarProductos() {
        return productoRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    //guarda un producto en la base de datos y devuelve el dto del producto guardado
    public ProductoDTO guardarProducto(ProductoDTO dto) {
        Producto producto = toEntity(dto);
        Producto guardado = productoRepository.save(producto);
        return toDTO(guardado);
    }

    //actualizar un producto existente
    public ProductoDTO actualizarProducto(Long id, ProductoDTO dto) {
        //busca el producto por id, si no existe lanza excepción
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("producto no encontrado"));

        //actualiza los campos con los valores recibidos
        producto.setNombre(dto.getNombre());
        producto.setMarca(dto.getMarca());
        producto.setPrecio(dto.getPrecio());

        //guarda los cambios en la base de datos
        Producto actualizado = productoRepository.save(producto);
        return toDTO(actualizado);
    }

    //eliminar un producto por id
    public void eliminarProducto(Long id) {
        //verifica si existe antes de eliminar
        if (!productoRepository.existsById(id)) {
            throw new RuntimeException("producto no encontrado");
        }
        productoRepository.deleteById(id);
    }
}
