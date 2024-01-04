package com.backend.miniproject.controller;

import com.backend.miniproject.dto.ProductDto;
import com.backend.miniproject.exception.ResourceNotFoundException;
import com.backend.miniproject.model.ApiResponse;
import com.backend.miniproject.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/products")
public class ProductController {
    private ProductService productService;

    //CREATE NEW PRODUCT
    @PostMapping
    public ResponseEntity<ApiResponse<Object>> createProduct(@RequestBody ProductDto productDto){
        ProductDto savedProduct = productService.createProduct(productDto);
        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Success Create Data")
                .data(savedProduct)
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    //GET PRODUCT BY ID
    @GetMapping("{id}")
    public ResponseEntity<ApiResponse<Object>> getProductById(@PathVariable("id") Long productId) {
        try {
            ProductDto productDto = productService.getProductById(productId);
            ApiResponse<Object> apiResponse = ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Success Get Product By Id")
                    .data(productDto)
                    .build();
            return ResponseEntity.ok(apiResponse);
        } catch (ResourceNotFoundException ex) {
            ApiResponse<Object> errorResponse = ApiResponse.builder()
                    .status(HttpStatus.NOT_FOUND.value())
                    .message("Product not found")
                    .build();

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    //GET ALL PRODUCT
    @GetMapping
    public ResponseEntity<ApiResponse<Object>> getAllProducts() {
        List<ProductDto> products = productService.getAllProducts();
        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Products retrieved successfully")
                .data(products)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    // UPDATE PRODUCT
    @PutMapping("{id}")
    public ResponseEntity<ApiResponse<Object>> updateProduct(@PathVariable("id") Long productId, @RequestBody ProductDto updatedProductDto){
        ProductDto updatedProduct = productService.updateProduct(productId, updatedProductDto);
        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Products update successfully")
                .data(updatedProduct)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    //DELETE PRODUCT BY ID
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
}
