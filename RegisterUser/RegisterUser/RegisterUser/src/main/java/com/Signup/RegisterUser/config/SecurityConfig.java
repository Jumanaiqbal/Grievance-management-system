package com.Signup.RegisterUser.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // Disabling CSRF for simplicity
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/api/v1/user/login", "/api/v1/user/signup").permitAll()
                                .requestMatchers("/api/v1/grievances").permitAll()
                                .requestMatchers("/api/v1/grievances/filter").permitAll()
                                .requestMatchers("/api/v1/grievances/{id}/assign").permitAll()
                                .requestMatchers("/api/v1/grievances/assignee/{assigneeId}").permitAll()
                                .requestMatchers("/api/v1/grievances/{id}/status").permitAll()
                                .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults()); // Use default Basic Auth configuration

        return http.build();
    }
}
