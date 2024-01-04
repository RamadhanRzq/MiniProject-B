package com.backend.miniproject.controller;

import com.backend.miniproject.dto.CategoryDto;
import com.backend.miniproject.exception.ResourceNotFoundException;
import com.backend.miniproject.model.ApiResponse;
import com.backend.miniproject.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/category")
public class CategoryController {
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<ApiResponse<Object>> createCategory(@RequestBody CategoryDto categoryDto){
        CategoryDto savedCategory= categoryService.createCategory(categoryDto);
        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .status(HttpStatus.CREATED.value())
                .message("Success Create Category")
                .data(savedCategory)
                .build();
        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping
    public ResponseEntity<ApiResponse<Object>> getAllCategories() {
        List<CategoryDto> categories = categoryService.getAllCategories();
        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Categories retrieved successfully")
                .data(categories)
                .build();

        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping("{id}")
    public ResponseEntity<ApiResponse<Object>> getCategoryById(@PathVariable("id") Long categoryId) {
        try {
            CategoryDto categoryDto = categoryService.getCategoryById(categoryId);
            ApiResponse<Object> apiResponse = ApiResponse.builder()
                    .status(HttpStatus.OK.value())
                    .message("Success Get Category By Id")
                    .data(categoryDto)
                    .build();
            return ResponseEntity.ok(apiResponse);
        } catch (ResourceNotFoundException ex) {
            ApiResponse<Object> errorResponse = ApiResponse.builder()
                    .status(HttpStatus.NOT_FOUND.value())
                    .message("Category not found")
                    .build();

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }
    @PutMapping("{id}")
    public ResponseEntity<ApiResponse<Object>> updateCategory(@PathVariable("id") Long categoryId, @RequestBody CategoryDto updatedCategoryDto){
        CategoryDto updatedCategory = categoryService.updateCategory(categoryId, updatedCategoryDto);
        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Category update successfully")
                .data(updatedCategory)
                .build();

        return ResponseEntity.ok(apiResponse);
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
