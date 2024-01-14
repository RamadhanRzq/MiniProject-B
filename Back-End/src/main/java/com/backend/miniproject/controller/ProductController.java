package com.backend.miniproject.controller;

import com.backend.miniproject.model.ApiResponse;
import com.backend.miniproject.model.request.ProductRequest;
import com.backend.miniproject.model.response.ProductResponse;
import com.backend.miniproject.service.ProductService;
import com.backend.miniproject.service.impl.ImgUploadImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private ImgUploadImpl imageUploadService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        String imageUrl = imageUploadService.uploadFile(file);
        return ResponseEntity.ok(imageUrl);
    }
    @GetMapping
    public ResponseEntity<ApiResponse<Object>> getAllProducts() {
        List<ProductResponse> products = productService.getAllProducts();
        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Products retrieved successfully")
                .data(products)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Object>> createProduct(@ModelAttribute ProductRequest productRequest) throws IOException {
        ProductResponse savedProduct = productService.createProduct(productRequest);
        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Success Create Data")
                .data(savedProduct)
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("{id}")
    public ResponseEntity<ApiResponse<Object>> getProductById(@PathVariable("id") Long productId) {
        try {
            ProductResponse productResponse = productService.getProductById(productId);
            ApiResponse<Object> apiResponse = ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Success Get Product By Id")
                    .data(productResponse)
                    .build();
            return ResponseEntity.ok(apiResponse);
        } catch (RuntimeException ex) {
            ApiResponse<Object> errorResponse = ApiResponse.builder()
                    .status(HttpStatus.NOT_FOUND.value())
                    .message("Product not found")
                    .build();

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @PatchMapping("{id}")
    public ResponseEntity<ApiResponse<Object>> updateProduct(@PathVariable("id") Long productId, @RequestBody ProductRequest updateProductRequest) {
        try {
            ProductResponse updatedProduct = productService.updateProduct(productId, updateProductRequest);
            ApiResponse<Object> apiResponse = ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Product updated successfully")
                    .data(updatedProduct)
                    .build();

            return ResponseEntity.ok(apiResponse);
        } catch (RuntimeException ex) {
            ApiResponse<Object> errorResponse = ApiResponse.builder()
                    .status(HttpStatus.NOT_FOUND.value())
                    .message(ex.getMessage())
                    .build();

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ApiResponse<Object>> deleteProduct(@PathVariable("id") Long productId) {
        if (productService.productExists(productId)) {
            productService.deleteProduct(productId);

            ApiResponse<Object> apiResponse = ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Product deleted successfully")
                    .build();

            return ResponseEntity.ok(apiResponse);
        } else {
            ApiResponse<Object> errorResponse = ApiResponse.builder()
                    .status(HttpStatus.NOT_FOUND.value())
                    .message("Product not found")
                    .build();

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }
    @GetMapping("/filter")
    public ResponseEntity<List<ProductResponse>> filterProductsByCategory(@RequestParam Long category) {
        List<ProductResponse> products = productService.findAllProductsByCategory(category);
        return ResponseEntity.ok(products);
    }
}
