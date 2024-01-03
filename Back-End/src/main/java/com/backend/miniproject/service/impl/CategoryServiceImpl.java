package com.backend.miniproject.service.impl;

import com.backend.miniproject.dto.CategoryDto;
import com.backend.miniproject.dto.ProductDto;
import com.backend.miniproject.entity.Category;
import com.backend.miniproject.entity.Product;
import com.backend.miniproject.mapper.CategoryMapper;
import com.backend.miniproject.mapper.ProductMapper;
import com.backend.miniproject.repository.CategoryRepository;
import com.backend.miniproject.repository.ProductRepository;
import com.backend.miniproject.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public CategoryDto createCategory(CategoryDto categoryDto){
        Category category = CategoryMapper.mapToCategory(categoryDto);
        Category savedCategory = categoryRepository.save(category);
        return CategoryMapper.mapToCategoryDto(savedCategory);
    }

    @Override
    public CategoryDto getCategoryById(Long categoryId) {
        return null;
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        return null;
    }

    @Override
    public CategoryDto updateCategory(Long categoryId, CategoryDto updatedCategoryDto) {
        return null;
    }

    @Override
    public void deleteCategory(Long categoryId) {

    }
}
