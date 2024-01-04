package com.backend.miniproject.controller;

import com.backend.miniproject.model.ApiResponse;
import com.backend.miniproject.model.Product;
import com.backend.miniproject.model.request.ProductRequest;
import com.backend.miniproject.model.response.ProductResponse;
import com.backend.miniproject.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;
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
    public ResponseEntity<ApiResponse<Object>> createProduct(@RequestBody ProductRequest productRequest){
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
    @GetMapping("/search")
    public ResponseEntity<List<ProductResponse>> searchProductsByName(@RequestParam String name) {
        List<ProductResponse> products = productService.findProductsByName(name);
        return ResponseEntity.ok(products);
    }
    // GET ALL PRODUCTS ORDERED BY NAME ASCENDING
    @GetMapping("/orderByNameAsc")
    public ResponseEntity<List<ProductResponse>> getAllProductsOrderedByName(){
        List<ProductResponse> products = productService.getAllProductsOrderedByNameAsc();
        return ResponseEntity.ok(products);
    }

    // GET ALL PRODUCTS ORDERED BY PRICE ASCENDING
    @GetMapping("/orderByPriceAsc")
    public ResponseEntity<List<ProductResponse>> getAllProductsOrderedByPrice(){
        List<ProductResponse> products = productService.getAllProductsOrderedByPriceAsc();
        return ResponseEntity.ok(products);
    }

    // GET ALL PRODUCTS ORDERED BY NAME DESCENDING
    @GetMapping("/orderByNameDesc")
    public ResponseEntity<List<ProductResponse>> getAllProductsOrderedByNameDesc(){
        List<ProductResponse> products = productService.getAllProductsOrderedByNameDesc();
        return ResponseEntity.ok(products);
    }

    // GET ALL PRODUCTS ORDERED BY PRICE DESCENDING
    @GetMapping("/orderByPriceDesc")
    public ResponseEntity<List<ProductResponse>> getAllProductsOrderedByPriceDesc(){
        List<ProductResponse> products = productService.getAllProductsOrderedByPriceDesc();
        return ResponseEntity.ok(products);
    }
}
