package com.backend.miniproject.service;

import com.backend.miniproject.model.Product;
import com.backend.miniproject.model.request.ProductRequest;
import com.backend.miniproject.model.response.ProductResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    List<ProductResponse> getAllProducts();
    ProductResponse createProduct(ProductRequest productRequest, MultipartFile file) throws IOException;
    ProductResponse getProductById(Long productId);
    ProductResponse updateProduct(Long productId,ProductRequest updatedProductRequest);
    void deleteProduct(Long productId);
    boolean productExists(Long productId);

    List<ProductResponse> findAllProductsByCategory(Long category);
    List<ProductResponse> findProductsByName(String name);

    List<ProductResponse> getAllProductsOrderedByNameAsc();

    List<ProductResponse> getAllProductsOrderedByPriceAsc();

    List<ProductResponse> getAllProductsOrderedByNameDesc();

    List<ProductResponse> getAllProductsOrderedByPriceDesc();
}
