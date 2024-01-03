package com.backend.miniproject.dto;

import com.backend.miniproject.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long Id;
    private String Name;
    private String Description;
    private CategoryDto Category;
    private int Price;
    private int Stock;
}