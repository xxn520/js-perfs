package com.m2mbob.jsperfs;

import com.m2mbob.jsperfs.config.AppConfig;
import org.springframework.boot.SpringApplication;

public class Application {
    public static void main(String[] args) {
        SpringApplication.run(AppConfig.class, args);
    }
}
