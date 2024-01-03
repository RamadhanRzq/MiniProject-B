package com.backend.miniproject.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    private Long Id;
    private String Name;
    private String Description;
    private String Category;
    private int Price;
    private int Stock;
}
