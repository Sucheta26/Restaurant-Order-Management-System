package com.restraunt.demo.exception;


public class EmailAlreayExistsException extends RuntimeException{

    public EmailAlreayExistsException(String message){
        super(message);
    }
}
