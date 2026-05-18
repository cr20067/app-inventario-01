package com.tienda.inventario_tienda_tecnologica.repository;

import com.tienda.inventario_tienda_tecnologica.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository //indica que esta interfaz es un componente de acceso a datos y será gestionada por spring
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    
}
