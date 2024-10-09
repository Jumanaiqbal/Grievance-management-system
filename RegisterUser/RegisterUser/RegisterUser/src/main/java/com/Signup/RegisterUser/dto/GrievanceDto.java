
package com.Signup.RegisterUser.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GrievanceDto {

    private Long id;
    private String title;
    private String description;
    private LocalDate dateSubmitted;
    private String status;
    private Long userId;
    private String grievanceType;
    private Long assigneeId;
    private String resolutionFeedback; // New field for feedback
}