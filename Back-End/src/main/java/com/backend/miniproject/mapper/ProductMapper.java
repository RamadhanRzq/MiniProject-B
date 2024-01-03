package com.backend.miniproject.mapper;

import com.backend.miniproject.dto.ProductDto;
import com.backend.miniproject.entity.Product;

public class ProductMapper {
    public static ProductDto mapToProductDto(Product product){
        return new ProductDto(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getCategory(),
                product.getPrice(),
                product.getStock()
        );
    }

    public static Product mapToProduct(ProductDto productDto){
        return new Product(
                productDto.getId(),
                productDto.getName(),
                productDto.getDescription(),
                productDto.getCategory(),
                productDto.getPrice(),
                productDto.getStock()
        );
    }
}