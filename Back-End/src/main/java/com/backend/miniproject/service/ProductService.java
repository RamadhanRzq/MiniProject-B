package com.backend.miniproject.service;

import com.backend.miniproject.dto.ProductDto;

import java.util.List;

public interface ProductService {
    ProductDto createProduct(ProductDto productDto);
    ProductDto getProductById(Long productId);
    List<ProductDto> getAllProducts();
    ProductDto updateProduct(Long productId, ProductDto updatedProductDto);
    void deleteProduct(Long productId);

    List<ProductDto> findProductsByName(String name);

    List<ProductDto> getAllProductsOrderedByNameAsc();

    List<ProductDto> getAllProductsOrderedByPriceAsc();

    List<ProductDto> getAllProductsOrderedByNameDesc();

    List<ProductDto> getAllProductsOrderedByPriceDesc();
    boolean productExists(Long productId);
}
