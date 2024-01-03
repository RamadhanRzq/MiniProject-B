package com.backend.miniproject.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Category")
public class Category {
    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private Long Id;

    @Column(name = "Name")
    private String Name;

    @OneToMany(mappedBy = "Category", cascade = CascadeType.ALL)
    private List<Product> products;

    public Category(Long id, String name) {
    }
}
