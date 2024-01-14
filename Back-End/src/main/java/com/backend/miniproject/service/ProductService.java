package com.backend.miniproject.service;

import com.backend.miniproject.model.request.ProductRequest;
import com.backend.miniproject.model.response.ProductResponse;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    List<ProductResponse> getAllProducts();
    ProductResponse createProduct(ProductRequest productRequest) throws IOException;
    ProductResponse getProductById(Long productId);
    ProductResponse updateProduct(Long productId,ProductRequest updatedProductRequest);
    void deleteProduct(Long productId);
    boolean productExists(Long productId);
    List<ProductResponse> findAllProductsByCategory(Long category);
}
