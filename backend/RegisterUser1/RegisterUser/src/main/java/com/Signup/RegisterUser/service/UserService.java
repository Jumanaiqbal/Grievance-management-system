package com.Signup.RegisterUser.service;

import com.Signup.RegisterUser.dto.LoginDto;
import com.Signup.RegisterUser.dto.UserDto;
import com.Signup.RegisterUser.payload.response.LoginResponse;

public interface UserService {
    String addUser(UserDto userDto);
    LoginResponse loginUser(LoginDto loginDto);
    LoginResponse signupUser(UserDto userDto);
}
