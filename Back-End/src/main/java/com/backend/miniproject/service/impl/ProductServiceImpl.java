package com.backend.miniproject.service.impl;

import com.backend.miniproject.dto.ProductDto;
import com.backend.miniproject.entity.Product;
import com.backend.miniproject.mapper.ProductMapper;
import com.backend.miniproject.repository.ProductRepository;
import com.backend.miniproject.service.ProductService;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;
    @Override
    public ProductDto createProduct(ProductDto productDto){
        Product product = ProductMapper.mapToProduct(productDto);
        Product savedProduct = productRepository.save(product);
        return ProductMapper.mapToProductDto(savedProduct);
    }
}
