package com.backend.miniproject.service;

import com.backend.miniproject.dto.ProductDto;

public interface ProductService {
    ProductDto createProduct(ProductDto productDto);
    ProductDto getProductById(Long productId);
}
