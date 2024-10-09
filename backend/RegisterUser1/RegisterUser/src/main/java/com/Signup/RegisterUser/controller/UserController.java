package com.Signup.RegisterUser.controller;


import com.Signup.RegisterUser.dto.LoginDto;
import com.Signup.RegisterUser.dto.UserDto;
import com.Signup.RegisterUser.payload.response.LoginResponse;
import com.Signup.RegisterUser.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping(path = "/save")
    public String saveUser(@RequestBody UserDto userDto) {
        String id = userService.addUser(userDto);
        return id;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto) {
        LoginResponse loginResponse = userService.loginUser(loginDto);
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping(path = "/signup")
    public ResponseEntity<?> signupUser(@RequestBody UserDto userDto) {
        LoginResponse signupResponse = userService.signupUser(userDto);
        return ResponseEntity.ok(signupResponse);
    }
}
