package com.backend.miniproject.repository;

import com.backend.miniproject.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "SELECT * FROM t_product WHERE lower(name) LIKE lower(concat('%', :name, '%'))", nativeQuery = true)
    List<Product> findByNameContainingIgnoreCase(@Param("name") String name);

    List<Product> findAllByOrderByNameAsc();

    List<Product> findAllByOrderByPriceAsc();

    List<Product> findAllByOrderByNameDesc();

    List<Product> findAllByOrderByPriceDesc();
}
