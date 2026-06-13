package com.restraunt.demo.exception;

import com.restraunt.demo.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(
            ResourceNotFoundException ex) {

        ErrorResponse error =
                new ErrorResponse(ex.getMessage(), 404);

        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EmailAlreayExistsException.class)
    public ResponseEntity<ErrorResponse> handleEmailAlreayExists(
            EmailAlreayExistsException ex){

        ErrorResponse error =
                new ErrorResponse(ex.getMessage(), 409);

        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(InvalidOrderStatusException.class)
    public ResponseEntity<ErrorResponse> handleInvalidOrderStatus(InvalidOrderStatusException ex){
        ErrorResponse errorResponse =
                new ErrorResponse(ex.getMessage(), 412);
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }

}
