package com.backend.miniproject.service.impl;

import com.backend.miniproject.service.ImgUpload;
import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Map;

@Service
public class ImgUploadImpl implements ImgUpload {
    @Autowired
    private Cloudinary cloudinary;
    @Override
    public String uploadFile(MultipartFile multipartFile) throws IOException {
        return this.cloudinary.uploader().upload(multipartFile.getBytes(), Map.of())
                .get("url")
                .toString();
    }
}