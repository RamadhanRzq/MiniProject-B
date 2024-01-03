package com.backend.miniproject.dto;

import jakarta.persistence.*;
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
    private String Category;
    private int Price;
    private int Stock;
}