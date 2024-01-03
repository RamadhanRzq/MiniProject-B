package com.backend.miniproject.controller;

import com.backend.miniproject.dto.ProductDto;
import com.backend.miniproject.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/products")
public class ProductController {
    private ProductService productService;

    //CREATE NEW PRODUCT
    @PostMapping
    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto productDto){
        ProductDto savedProduct = productService.createProduct(productDto);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    //GET PRODUCT BY ID
    @GetMapping("{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable("id") Long productId){
        ProductDto productDto = productService.getProductById(productId);
        return ResponseEntity.ok(productDto);
    }

    //GET ALL PRODUCT
    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts(){
        List<ProductDto> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }
    
    // UPDATE PRODUCT
    @PutMapping("{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable("id") Long productId, @RequestBody ProductDto updatedProductDto){
        ProductDto updatedProduct = productService.updateProduct(productId, updatedProductDto);
        return ResponseEntity.ok(updatedProduct);
    }
    
    //DELETE PRODUCT BY ID
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable("id") Long productId){
        productService.deleteProduct(productId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // SEARCH PRODUCTS BY NAME
    @GetMapping("/search")
    public ResponseEntity<List<ProductDto>> searchProductsByName(@RequestParam String name) {
        List<ProductDto> products = productService.findProductsByName(name);
        return ResponseEntity.ok(products);
    }

    // GET ALL PRODUCTS ORDERED BY NAME
    @GetMapping("/orderByNameAsc")
    public ResponseEntity<List<ProductDto>> getAllProductsOrderedByName(){
        List<ProductDto> products = productService.getAllProductsOrderedByNameAsc();
        return ResponseEntity.ok(products);
    }

    // GET ALL PRODUCTS ORDERED BY PRICE
    @GetMapping("/orderByPriceAsc")
    public ResponseEntity<List<ProductDto>> getAllProductsOrderedByPrice(){
        List<ProductDto> products = productService.getAllProductsOrderedByPriceAsc();
        return ResponseEntity.ok(products);
    }

    // GET ALL PRODUCTS ORDERED BY NAME DESCENDING
    @GetMapping("/orderByNameDesc")
    public ResponseEntity<List<ProductDto>> getAllProductsOrderedByNameDesc(){
        List<ProductDto> products = productService.getAllProductsOrderedByNameDesc();
        return ResponseEntity.ok(products);
    }

    // GET ALL PRODUCTS ORDERED BY PRICE DESCENDING
    @GetMapping("/orderByPriceDesc")
    public ResponseEntity<List<ProductDto>> getAllProductsOrderedByPriceDesc(){
        List<ProductDto> products = productService.getAllProductsOrderedByPriceDesc();
        return ResponseEntity.ok(products);
    }
}
