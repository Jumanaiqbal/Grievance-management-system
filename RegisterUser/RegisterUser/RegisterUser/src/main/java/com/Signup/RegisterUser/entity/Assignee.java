package com.Signup.RegisterUser.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "assignee")

public class Assignee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;

    @ElementCollection
    private List<String> specialties; // List of grievance types t
}
