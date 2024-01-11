package com.backend.miniproject.service;

import com.backend.miniproject.model.request.CategoryRequest;
import com.backend.miniproject.model.response.CategoryResponse;

import java.util.List;

public interface CategoryService {
    List<CategoryResponse> getAllCategories();
    CategoryResponse createCategory(CategoryRequest categoryRequest);
    CategoryResponse getCategoryById(Long productId);
    CategoryResponse updateCategory(Long productId, CategoryRequest updatedCategoryRequest);
    void deleteCategory(Long productId);
    boolean categoryExists(Long productId);
}
