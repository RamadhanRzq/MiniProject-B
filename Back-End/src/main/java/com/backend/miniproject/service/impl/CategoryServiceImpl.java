package com.backend.miniproject.service.impl;

import com.backend.miniproject.dto.CategoryDto;
import com.backend.miniproject.dto.ProductDto;
import com.backend.miniproject.exception.ResourceNotFoundException;
import com.backend.miniproject.mapper.CategoryMapper;
import com.backend.miniproject.mapper.ProductMapper;
import com.backend.miniproject.model.Category;
import com.backend.miniproject.model.Product;
import com.backend.miniproject.repository.CategoryRepository;
import com.backend.miniproject.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    CategoryRepository categoryRepository;
    @Override
    public CategoryDto createCategory(CategoryDto categoryDto) {
        Category category = CategoryMapper.mapToCategory(categoryDto);
        Category savedCategory = categoryRepository.save(category);
        return CategoryMapper.mapToCategoryDto(savedCategory);
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map(CategoryMapper::mapToCategoryDto).collect(Collectors.toList());
    }

    @Override
    public CategoryDto getCategoryById(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Product is not found with given id :" + categoryId));
        return CategoryMapper.mapToCategoryDto(category);
    }

    @Override
    public CategoryDto updateCategory(Long categoryId, CategoryDto updatedCategoryDto) {
        if (categoryRepository.existsById(categoryId)) {
            Category existingCategory = categoryRepository.findById(categoryId).get();
            existingCategory.setName(updatedCategoryDto.getName());

            Category updatedCategory = categoryRepository.save(existingCategory);
            return CategoryMapper.mapToCategoryDto(updatedCategory);
        } else {
            throw new RuntimeException("Product not found with id: " + categoryId);
        }
    }

    @Override
    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    @Override
    public boolean categoryExists(Long categoryId) {
        return categoryRepository.existsById(categoryId);
    }
}
