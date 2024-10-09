//package com.Signup.RegisterUser.entity;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
package com.Signup.RegisterUser.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "grievances")
public class Grievance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private LocalDate dateSubmitted;
    private String status;
    private Long userId;
    private String grievanceType;
    private Long assigneeId;

    @Column(columnDefinition = "TEXT") // Allows feedback to be stored as a larger text field
    private String resolutionFeedback; // New field for assignee feedback
}








//import lombok.Setter;
//
//import java.time.LocalDate;
//
//@Setter
//@Getter
//@NoArgsConstructor
//@AllArgsConstructor
//@Entity
//@Table(name = "grievances")
//public class Grievance {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String title;
//    private String description;
//    private LocalDate dateSubmitted;
//    private String status;
//    private Long userId;
//    private String grievanceType; // Added new field
//
//    @Column(name = "assignee_id")
//    private Long assigneeId; // Added new field
//}
