package com.backend.miniproject.controller;

import com.backend.miniproject.model.ApiResponse;
import com.backend.miniproject.model.request.CategoryRequest;
import com.backend.miniproject.model.response.CategoryResponse;
import com.backend.miniproject.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<ApiResponse<Object>> getAllCategories() {
        List<CategoryResponse> categories = categoryService.getAllCategories();
        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Categories retrieved successfully")
                .data(categories)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Object>> createCategory(@RequestBody CategoryRequest categoryRequest) {
        CategoryResponse savedCategory = categoryService.createCategory(categoryRequest);
        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Success Create Category")
                .data(savedCategory)
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("{id}")
    public ResponseEntity<ApiResponse<Object>> getCategoryById(@PathVariable("id") Long categoryId) {
        try {
            CategoryResponse categoryResponse = categoryService.getCategoryById(categoryId);
            ApiResponse<Object> apiResponse = ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Success Get Category By Id")
                    .data(categoryResponse)
                    .build();
            return ResponseEntity.ok(apiResponse);
        } catch (RuntimeException ex) {
            ApiResponse<Object> errorResponse = ApiResponse.builder()
                    .status(HttpStatus.NOT_FOUND.value())
                    .message("Category not found")
                    .build();

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @PatchMapping("{id}")
    public ResponseEntity<ApiResponse<Object>> updateCategory(@PathVariable("id") Long categoryId,
                                                              @RequestBody CategoryRequest updatedCategoryRequest) {
        try {
            CategoryResponse updatedCategory = categoryService.updateCategory(categoryId, updatedCategoryRequest);
            ApiResponse<Object> apiResponse = ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Category updated successfully")
                    .data(updatedCategory)
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
    public ResponseEntity<ApiResponse<Object>> deleteCategory(@PathVariable("id") Long categoryId) {
        if (categoryService.categoryExists(categoryId)) {
            categoryService.deleteCategory(categoryId);

            ApiResponse<Object> apiResponse = ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Category deleted successfully")
                    .build();

            return ResponseEntity.ok(apiResponse);
        } else {
            ApiResponse<Object> errorResponse = ApiResponse.builder()
                    .status(HttpStatus.NOT_FOUND.value())
                    .message("Category not found")
                    .build();

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }
}