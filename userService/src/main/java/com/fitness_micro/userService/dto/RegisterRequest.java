package com.fitness_micro.userService.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
public class RegisterRequest {

    @NotBlank(message = "Email is Required")
    @Email(message = "Invalid Email")
    private  String email;

    @NotBlank(message = "Password is Required")
    @Size(min = 6,message = "Password must be 6 characters long")
    private  String password;

    private String firstName;
    private  String lastName;
}
