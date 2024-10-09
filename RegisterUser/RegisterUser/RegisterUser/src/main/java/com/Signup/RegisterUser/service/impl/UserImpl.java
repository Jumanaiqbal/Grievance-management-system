package com.Signup.RegisterUser.service.impl;

import com.Signup.RegisterUser.dto.LoginDto;
import com.Signup.RegisterUser.entity.Users;
import com.Signup.RegisterUser.dto.UserDto;
import com.Signup.RegisterUser.payload.response.LoginResponse;
import com.Signup.RegisterUser.repo.UserRepository;
import com.Signup.RegisterUser.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Method to add a new user during signup
    @Override
    public String addUser(UserDto userDto) {
        if (userRepository.findByUsername(userDto.getUsername()) != null) {
            return "Username already exists!";
        }

        // Create new user entity
        Users user = new Users(
                userDto.getId(),
                passwordEncoder.encode(userDto.getPassword()), // Encode the password
                userDto.getUsername(),
                userDto.getName(),
                userDto.getAddress(),
                userDto.getPhone(),
                userDto.getEmail(),
                userDto.getRole()  // Assign the role (like CUSTOMER, SUPERVISOR)
        );

        userRepository.save(user); // Save user to the database
        return "User registered successfully!";
    }

    // Method to find a user by username
    @Override
    public Users findByUsername(String username) {
        return userRepository.findByUsername(username); // Call the repository method
    }

    // Method for logging in a user
    @Override
    public LoginResponse loginUser(LoginDto loginDto) {
        Users user = userRepository.findByUsername(loginDto.getUsername());
        if (user != null) {
            boolean isPwdCorrect = passwordEncoder.matches(loginDto.getPassword(), user.getPassword());
            if (isPwdCorrect) {
                // Successful login: return user details and role
                System.out.println("heeeeyyy");
                return new LoginResponse("Login Success", true, user.getRole().name(), user.getUsername());
            }
        }
        return new LoginResponse("Login Failed", false);
    }

    // Signup method (used in case of additional processing)
    @Override
    public LoginResponse signupUser(UserDto userDto) {
        if (userRepository.findByUsername(userDto.getUsername()) != null) {
            return new LoginResponse("Username already exists", false);
        }

        Users user = new Users(
                userDto.getId(),
                passwordEncoder.encode(userDto.getPassword()),  // Encode password
                userDto.getUsername(),
                userDto.getName(),
                userDto.getAddress(),
                userDto.getPhone(),
                userDto.getEmail(),
                userDto.getRole()  // Set the user role
        );
        userRepository.save(user);  // Save user to the database
        return new LoginResponse("User registered successfully", true, user.getRole().name(), user.getUsername());

    }
}
