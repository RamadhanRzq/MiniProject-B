package com.backend.miniproject.service.impl;

import com.backend.miniproject.model.Category;
import com.backend.miniproject.model.request.CategoryRequest;
import com.backend.miniproject.model.response.CategoryResponse;
import com.backend.miniproject.repository.CategoryRepository;
import com.backend.miniproject.repository.ProductRepository;
import com.backend.miniproject.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<CategoryResponse> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map(this::mapCategoryToCategoryResponse).collect(Collectors.toList());
    }

    @Override
    public CategoryResponse createCategory(CategoryRequest categoryRequest) {
        Category category = new Category();
        category.setName(categoryRequest.getName());
        Category savedCategory = categoryRepository.save(category);
        return mapCategoryToCategoryResponse(savedCategory);
    }

    @Override
    public CategoryResponse getCategoryById(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found with ID: " + categoryId));
        return mapCategoryToCategoryResponse(category);
    }

    @Override
    public CategoryResponse updateCategory(Long categoryId, CategoryRequest updatedCategoryRequest) {
        Category existingCategory = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found with ID: " + categoryId));

        existingCategory.setName(updatedCategoryRequest.getName());
        Category updatedCategory = categoryRepository.save(existingCategory);
        return mapCategoryToCategoryResponse(updatedCategory);
    }

    @Override
    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    @Override
    public boolean categoryExists(Long categoryId) {
        return categoryRepository.existsById(categoryId);
    }

    public CategoryResponse mapCategoryToCategoryResponse(Category category) {
        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setId(category.getId());
        categoryResponse.setName(category.getName());
        return categoryResponse;
    }
}
