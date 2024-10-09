package com.Signup.RegisterUser.payload.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginResponse {
    private String message;
    private boolean status;
    private String role;
    private String username;

    // Constructor for successful login with role and username
    public LoginResponse(String message, boolean status, String role, String username) {
        this.message = message;
        this.status = status;
        this.role = role;
        this.username = username;
    }

    // Constructor for failed login
    public LoginResponse(String message, boolean status) {
        this.message = message;
        this.status = status;
    }

    @Override
    public String toString() {
        return "LoginResponse{" +
                "message='" + message + '\'' +
                ", status=" + status +
                ", role='" + role + '\'' +
                ", username='" + username + '\'' +
                '}';
    }
}
