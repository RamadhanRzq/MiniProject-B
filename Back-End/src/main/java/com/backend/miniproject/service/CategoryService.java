package com.backend.miniproject.service;

import com.backend.miniproject.dto.CategoryDto;
import com.backend.miniproject.dto.ProductDto;

import java.util.List;

public interface CategoryService {
    CategoryDto createCategory(CategoryDto categoryDto);
    CategoryDto getCategoryById(Long categoryId);
    List<CategoryDto> getAllCategories();
    CategoryDto updateCategory(Long categoryId, CategoryDto updatedCategoryDto);
    void deleteCategory(Long categoryId);
}
