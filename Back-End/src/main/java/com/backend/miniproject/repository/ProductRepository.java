package com.backend.miniproject.repository;

import com.backend.miniproject.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "SELECT * FROM t_product WHERE category = :category", nativeQuery = true)
    List<Product> findAllByCategoryId(Long category);
}
