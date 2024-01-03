package com.backend.miniproject.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "t_product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "image")
    private String image;

    @Column(name = "category")
    private String category;

    @Column(name = "price")
    private Long price;

    @Column(name = "stock")
    private Long stock;

    public Product(Long id, String name, String description, String image, String category, Long price, Long stock) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.category = category;
        this.price = price;
        this.stock = stock;
    }
}
