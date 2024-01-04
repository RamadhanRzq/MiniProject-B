package com.backend.miniproject.service;

import com.backend.miniproject.dto.CategoryDto;

import java.util.List;

public interface CategoryService {
    CategoryDto createCategory(CategoryDto categoryDto);
    List<CategoryDto> getAllCategories();
    CategoryDto getCategoryById(Long categoryId);
    CategoryDto updateCategory(Long categoryId, CategoryDto updatedCategoryDto);
    void deleteCategory(Long categoryId);
    boolean categoryExists(Long categoryId);
}
