package com.backend.miniproject.model.request;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {
    private String name;
    private String image;
    private Long price;
    private Long stock;
    private Long categoryId;
}
