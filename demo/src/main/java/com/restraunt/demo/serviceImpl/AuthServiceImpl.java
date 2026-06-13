package com.restraunt.demo.serviceImpl;

import com.restraunt.demo.dto.LoginRequest;
import com.restraunt.demo.dto.LoginResponse;
import com.restraunt.demo.dto.SignupRequest;
import com.restraunt.demo.entity.User;
import com.restraunt.demo.enums.Role;
import com.restraunt.demo.exception.EmailAlreayExistsException;
import com.restraunt.demo.exception.ResourceNotFoundException;
import com.restraunt.demo.repository.UserRepository;
import com.restraunt.demo.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    @Override
    public User customerSignup(SignupRequest request){

        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new EmailAlreayExistsException("Email already exists");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword())
                .role(Role.CUSTOMER)
                .build();

        return userRepository.save(user);
    }

    @Override
    public User employeeSignup(SignupRequest request){

        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new EmailAlreayExistsException("Email already exists");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword())
                .role(Role.EMPLOYEE)
                .build();

        return userRepository.save(user);
    }

    @Override
    public LoginResponse customerLogin(LoginRequest request){

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(()->
                new ResourceNotFoundException("User not found"));

        if(!user.getPassword().equals(request.getPassword())){
            throw new RuntimeException("Invalid credentials");
        }

        if(user.getRole() != Role.CUSTOMER){
            throw new RuntimeException("The account is not registered as a Customer");
        }

        return new LoginResponse(
                user.getId(),
                user.getName(),
                user.getRole().name(),
                "Login Successful");
    }

    @Override
    public LoginResponse employeeLogin(LoginRequest request){

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(()->
                new ResourceNotFoundException("User not found"));

        if(!user.getPassword().equals(request.getPassword())){
            throw new RuntimeException("Invalid credentials");
        }

        if(user.getRole() != Role.EMPLOYEE){
            throw new RuntimeException("The account is not registered as an Employee");
        }

        return new LoginResponse(
                user.getId(),
                user.getName(),
                user.getRole().name(),
                "Login Successful");
    }
}
