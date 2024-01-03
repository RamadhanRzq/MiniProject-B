package com.backend.miniproject.service.impl;

import com.backend.miniproject.dto.ProductDto;
import com.backend.miniproject.model.Product;
import com.backend.miniproject.exception.ResourceNotFoundException;
import com.backend.miniproject.mapper.ProductMapper;
import com.backend.miniproject.repository.ProductRepository;
import com.backend.miniproject.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product is not found with given id :" + productId));
        return ProductMapper.mapToProductDto(product);
    }

    @Override
    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(ProductMapper::mapToProductDto)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDto updateProduct(Long productId, ProductDto updatedProductDto) {
        if (productRepository.existsById(productId)) {
            Product existingProduct = productRepository.findById(productId).get();

            existingProduct.setName(updatedProductDto.getName());
            existingProduct.setDescription(updatedProductDto.getDescription());
            existingProduct.setCategory(updatedProductDto.getCategory());
            existingProduct.setPrice(updatedProductDto.getPrice());
            existingProduct.setStock(updatedProductDto.getStock());

            Product updatedProduct = productRepository.save(existingProduct);
            return ProductMapper.mapToProductDto(updatedProduct);
        } else {
            throw new RuntimeException("Product not found with id: " + productId);
        }
    }

	@Override
	public void deleteProduct(Long productId) {
		productRepository.deleteById(productId);		
	}
}
