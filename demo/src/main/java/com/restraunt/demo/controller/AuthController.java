package com.restraunt.demo.controller;

import com.restraunt.demo.dto.LoginRequest;
import com.restraunt.demo.dto.LoginResponse;
import com.restraunt.demo.dto.SignupRequest;
import com.restraunt.demo.entity.User;
import com.restraunt.demo.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/customer/signup")
    public User customerSignup(@RequestBody SignupRequest signupRequest){
        return authService.customerSignup(signupRequest);
    }

    @PostMapping("/employee/signup")
    public User employeeSignup(@RequestBody SignupRequest request){
        return authService.employeeSignup(request);
    }

    @PostMapping("/customer/login")
    public LoginResponse customerLogin(@RequestBody LoginRequest request){
        return authService.customerLogin(request);
    }

    @PostMapping("/employee/login")
    public LoginResponse employeeLogin(@RequestBody LoginRequest request){
        return authService.employeeLogin(request);
    }




}
