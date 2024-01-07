package com.backend.miniproject.service.impl;

import com.backend.miniproject.model.Category;
import com.backend.miniproject.model.Product;
import com.backend.miniproject.model.request.ProductRequest;
import com.backend.miniproject.model.response.ProductResponse;
import com.backend.miniproject.repository.CategoryRepository;
import com.backend.miniproject.repository.ProductRepository;
//import com.backend.miniproject.service.ImgUpload;
import com.backend.miniproject.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;

//    @Autowired
//    private ImgUpload imgUpload;
    @Override
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll().stream().map(this::mapProductToProductResponse).collect(Collectors.toList());
    }

    @Override
    public ProductResponse createProduct(ProductRequest productRequest, MultipartFile file) throws IOException {
        Product product = new Product();
        product.setName(productRequest.getName());
//        product.setImage(imgUpload.uploadFile(file));
        Category category = categoryRepository.findById(productRequest.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with ID: " + productRequest.getCategoryId()));
        product.setCategory(category);
        product.setPrice(productRequest.getPrice());
        product.setStock(productRequest.getStock());
        Product savedProduct = productRepository.save(product);
        return mapProductToProductResponse(savedProduct);
    }

    @Override
    public ProductResponse getProductById(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product is not found with given id: " + productId));
        return mapProductToProductResponse(product);
    }

    @Override
    public ProductResponse updateProduct(Long productId, ProductRequest updatedProductRequest) {
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        existingProduct.setName(updatedProductRequest.getName());
        existingProduct.setImage(String.valueOf(updatedProductRequest.getImage()));
        Category category = categoryRepository.findById(updatedProductRequest.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with ID: " + updatedProductRequest.getCategoryId()));
        existingProduct.setCategory(category);
        existingProduct.setPrice(updatedProductRequest.getPrice());
        existingProduct.setStock(updatedProductRequest.getStock());

        Product updatedProduct = productRepository.save(existingProduct);
        return mapProductToProductResponse(updatedProduct);
    }

    @Override
    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }

    @Override
    public boolean productExists(Long productId) {
        return productRepository.existsById(productId);
    }

    @Override
    public List<ProductResponse> findAllProductsByCategory(Long category) {
        List<Product> products = productRepository.findAllByCategoryId(category);
        return products.stream().map(this::mapProductToProductResponse).collect(Collectors.toList());
    }

    @Override
    public List<ProductResponse> findProductsByName(String name) {
        List<Product> products = productRepository.findByNameContainingIgnoreCase(name);
        return products.stream().map(this::mapProductToProductResponse).collect(Collectors.toList());
    }

    @Override
    public List<ProductResponse> getAllProductsOrderedByNameAsc() {
        List<Product> products = productRepository.findAllByOrderByNameAsc();
        return products.stream().map(this::mapProductToProductResponse).collect(Collectors.toList());
    }

    @Override
    public List<ProductResponse> getAllProductsOrderedByPriceAsc() {
        List<Product> products = productRepository.findAllByOrderByPriceAsc();
        return products.stream().map(this::mapProductToProductResponse).collect(Collectors.toList());
    }

    @Override
    public List<ProductResponse> getAllProductsOrderedByNameDesc() {
        List<Product> products = productRepository.findAllByOrderByNameDesc();
        return products.stream().map(this::mapProductToProductResponse).collect(Collectors.toList());
    }

    @Override
    public List<ProductResponse> getAllProductsOrderedByPriceDesc() {
        List<Product> products = productRepository.findAllByOrderByPriceDesc();
        return products.stream().map(this::mapProductToProductResponse).collect(Collectors.toList());
    }

    public ProductResponse mapProductToProductResponse(Product product) {
        Category category = product.getCategory();

        if (category == null) {
            throw new RuntimeException("Category is null for product with ID: " + product.getId());
        }

        String categoryName = category.getName();

        ProductResponse productResponse = new ProductResponse();

        productResponse.setId(product.getId());
        productResponse.setName(product.getName());
        productResponse.setImage(product.getImage());
        productResponse.setPrice(product.getPrice());
        productResponse.setStock(product.getStock());
        productResponse.setCategory(categoryName);

        return productResponse;
    }
}
