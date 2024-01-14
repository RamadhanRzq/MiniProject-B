package com.backend.miniproject.service;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

public interface ImgUpload {
    String uploadFile(MultipartFile multipartFile) throws IOException;
}