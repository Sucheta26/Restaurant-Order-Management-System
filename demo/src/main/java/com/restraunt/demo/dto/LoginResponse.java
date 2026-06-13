package com.restraunt.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {

    private Long id;

    private String name;

    private String role;

    private String message;
}
