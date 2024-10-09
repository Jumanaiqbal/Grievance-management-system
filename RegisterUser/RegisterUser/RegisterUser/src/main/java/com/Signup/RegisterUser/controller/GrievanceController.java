
package com.Signup.RegisterUser.controller;

import com.Signup.RegisterUser.dto.AssignGrievanceDto;
import com.Signup.RegisterUser.dto.FeedbackRequest;
import com.Signup.RegisterUser.dto.GrievanceDto;
import com.Signup.RegisterUser.service.GrievanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1")
public class GrievanceController {

    @Autowired
    private GrievanceService grievanceService;

    // Endpoint to submit a grievance
    @PostMapping("/grievances")
    public ResponseEntity<?> submitGrievance(@RequestBody GrievanceDto grievanceDto, Authentication authentication) {
        String username = authentication.getName();
        GrievanceDto submittedGrievance = grievanceService.submitGrievance(grievanceDto, username);
        return ResponseEntity.ok(submittedGrievance);
    }

    // Endpoint to view all grievances for the logged-in user (Customer), unassigned grievances (Supervisor), or assigned grievances (Assignee)
    @GetMapping("/grievances")
    public ResponseEntity<List<GrievanceDto>> viewGrievances(Authentication authentication) {
        String username = authentication.getName();
        String role = authentication.getAuthorities().toString(); // Retrieve the role from authorities
        System.out.println("This is role."+role);
        List<GrievanceDto> grievances;

        if (role.contains("ROLE_CUSTOMER")) {
            grievances = grievanceService.getGrievancesByCustomer(username);
        } else if (role.contains("ROLE_SUPERVISOR")) {
            grievances = grievanceService.getUnassignedGrievances();
        } else if (role.contains("ROLE_ASSIGNEE")) {
            grievances = grievanceService.getGrievancesByAssignee(username);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return ResponseEntity.ok(grievances);
    }

    // Endpoint to filter grievances based on category (Supervisor)
    @GetMapping("/grievances/filter")
    public ResponseEntity<List<GrievanceDto>> filterGrievancesByCategory(@RequestParam String category, Authentication authentication) {
        String username = authentication.getName();
        List<GrievanceDto> grievances = grievanceService.getGrievancesByCategory(username, category);
        return ResponseEntity.ok(grievances);
    }

    // Endpoint to assign a grievance to an assignee (Supervisor)
    @PutMapping("/grievances/{id}/assign")
    public ResponseEntity<GrievanceDto> assignGrievance(
            @PathVariable Long id,
            @RequestBody AssignGrievanceDto assignGrievanceDto, // Changed to @RequestBody
            Authentication authentication) {

        String username = authentication.getName();
        GrievanceDto updatedGrievance = grievanceService.assignGrievance(username, id, assignGrievanceDto.getAssigneeId());
        return ResponseEntity.ok(updatedGrievance);
    }

    // Endpoint to update the status of a grievance (Assignee)
    @PutMapping("/grievances/{id}/status")
    public ResponseEntity<GrievanceDto> updateGrievanceStatus(
            @PathVariable Long id,
            @RequestBody GrievanceDto grievanceDto, // Changed to @RequestBody
            Authentication authentication) {

        String username = authentication.getName();
        GrievanceDto updatedGrievance = grievanceService.updateGrievanceStatus(username, id, grievanceDto.getStatus());
        return ResponseEntity.ok(updatedGrievance);
    }

    @PutMapping("/grievances/{grievanceId}/feedback")
    public ResponseEntity<GrievanceDto> sendFeedback(
            @PathVariable Long grievanceId,
            @RequestBody FeedbackRequest feedbackRequest,
            Authentication authentication) {
        String username = authentication.getName();
        GrievanceDto updatedGrievance = grievanceService.sendResolutionFeedback(username, grievanceId, feedbackRequest.getFeedback());
        return ResponseEntity.ok(updatedGrievance);
    }



    // Endpoint to get grievances assigned to a specific assignee (Assignee)
    @GetMapping("/grievances/assignee")
    public ResponseEntity<List<GrievanceDto>> getGrievancesByAssignee(Authentication authentication) {
        String username = authentication.getName();
        List<GrievanceDto> grievances = grievanceService.getGrievancesByAssignee(username);
        return ResponseEntity.ok(grievances);
    }
}