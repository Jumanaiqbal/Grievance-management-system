package com.Signup.RegisterUser.controller;

import com.Signup.RegisterUser.dto.LoginDto;
import com.Signup.RegisterUser.dto.UserDto;
import com.Signup.RegisterUser.entity.Users;
import com.Signup.RegisterUser.payload.response.LoginResponse;
import com.Signup.RegisterUser.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Endpoint to save a new user
    @PostMapping(path = "/save")
    public String saveUser(@RequestBody UserDto userDto) {
        String id = userService.addUser(userDto);
        return id;
    }

    // Endpoint for user login
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto) {
        // Retrieve user from the database using the username

        Users user = userService.findByUsername(loginDto.getUsername());

        // If user is found, verify the password
        if (user != null && passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            // Successful login
            return ResponseEntity.ok(new LoginResponse("Login Success", true, user.getRole().name(), user.getUsername()));
        }

        // Login failed
        return ResponseEntity.status(401).body(new LoginResponse("Login Failed", false));
    }

    // Endpoint for user signup
    @PostMapping(path = "/signup")
    public ResponseEntity<?> signupUser(@RequestBody UserDto userDto) {
        LoginResponse signupResponse = userService.signupUser(userDto);
        return ResponseEntity.ok(signupResponse);
    }
}
