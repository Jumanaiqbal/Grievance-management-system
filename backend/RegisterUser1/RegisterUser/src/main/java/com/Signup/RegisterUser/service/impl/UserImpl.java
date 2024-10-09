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

    @Override
    public String addUser(UserDto userDto) {

        Users user = new Users(
                userDto.getId(),
                passwordEncoder.encode(userDto.getPassword()),
                userDto.getUsername(),
                userDto.getName(),
                userDto.getAddress(),
                userDto.getPhone(),
                userDto.getEmail(),
                userDto.getRole()  // Assign the role
        );

        userRepository.save(user);

        return user.getName();
    }

    @Override
    public LoginResponse loginUser(LoginDto loginDto) {
        Users user = userRepository.findByUsername(loginDto.getUsername());
        if (user != null) {
            boolean isPwdRight = passwordEncoder.matches(loginDto.getPassword(), user.getPassword());
            if (isPwdRight) {
                // Check role here if needed
                return new LoginResponse("Login Success", true);
            }
        }
        return new LoginResponse("Login Failed", false);
    }

    @Override
    public LoginResponse signupUser(UserDto userDto) {
        if (userRepository.findByUsername(userDto.getUsername()) != null) {
            return new LoginResponse("Username already exists", false);
        }

        Users user = new Users(
                userDto.getId(),
                passwordEncoder.encode(userDto.getPassword()),
                userDto.getUsername(),
                userDto.getName(),
                userDto.getAddress(),
                userDto.getPhone(),
                userDto.getEmail(),
                userDto.getRole()  // Assign the role during signup
        );
        userRepository.save(user);
        return new LoginResponse("User registered successfully", true);
    }
}
