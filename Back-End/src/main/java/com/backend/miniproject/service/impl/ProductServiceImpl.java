package com.backend.miniproject.service.impl;

import com.backend.miniproject.dto.ProductDto;
import com.backend.miniproject.entity.Product;
import com.backend.miniproject.mapper.ProductMapper;
import com.backend.miniproject.repository.ProductRepository;
import com.backend.miniproject.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Override
    public ProductDto createProduct(ProductDto productDto){
        Product product = ProductMapper.mapToProduct(productDto);
        Product savedProduct = productRepository.save(product);
        return ProductMapper.mapToProductDto(savedProduct);
    }

    @Override
    public ProductDto getProductById(Long productId) {
        return null;
    }
}
