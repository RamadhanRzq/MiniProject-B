package com.backend.miniproject.mapper;

import com.backend.miniproject.dto.CategoryDto;
import com.backend.miniproject.dto.ProductDto;
import com.backend.miniproject.entity.Category;
import com.backend.miniproject.entity.Product;

public class CategoryMapper {
    public static CategoryDto mapToCategoryDto(Category category) {
        return new CategoryDto(
                category.getId(),
                category.getName()
        );
    }
    public static Category mapToCategory(CategoryDto categoryDto) {
        return new Category(
                categoryDto.getId(),
                categoryDto.getName()
        );
    }
}
