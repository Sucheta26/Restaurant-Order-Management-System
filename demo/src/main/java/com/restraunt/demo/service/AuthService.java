package com.restraunt.demo.service;

import com.restraunt.demo.dto.LoginRequest;
import com.restraunt.demo.dto.LoginResponse;
import com.restraunt.demo.dto.SignupRequest;
import com.restraunt.demo.entity.User;

public interface AuthService {

    User customerSignup(SignupRequest request);
    User employeeSignup(SignupRequest request);
    LoginResponse customerLogin(LoginRequest request);
    LoginResponse employeeLogin(LoginRequest request);
}
