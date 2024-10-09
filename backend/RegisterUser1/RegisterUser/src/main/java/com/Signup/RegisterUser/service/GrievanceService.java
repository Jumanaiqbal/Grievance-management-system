
package com.Signup.RegisterUser.service;

import com.Signup.RegisterUser.dto.GrievanceDto;
import com.Signup.RegisterUser.entity.Grievance;
import com.Signup.RegisterUser.entity.Role;
import com.Signup.RegisterUser.entity.Users;
import com.Signup.RegisterUser.repo.GrievanceRepository;
import com.Signup.RegisterUser.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GrievanceService {

    @Autowired
    private GrievanceRepository grievanceRepository;

    @Autowired
    private UserRepository userRepository;

    // Customer methods
    public GrievanceDto submitGrievance(GrievanceDto grievanceDto, String username) {
        Users user = userRepository.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found with username: " + username);
        }
        if (!user.getRole().equals(Role.CUSTOMER)) {
            throw new AccessDeniedException("Only customers can submit grievances");
        }

        Grievance grievance = convertToEntity(grievanceDto);
        grievance.setUserId(user.getId());
        grievance.setDateSubmitted(LocalDate.now());
        grievance.setStatus("Pending");

        Grievance savedGrievance = grievanceRepository.save(grievance);
        return convertToDto(savedGrievance);
    }

    public List<GrievanceDto> getGrievancesByCustomer(String username) {
        Users user = userRepository.findByUsername(username);
        if (!user.getRole().equals(Role.CUSTOMER)) {
            throw new AccessDeniedException("Only customers can view their grievances");
        }

        List<Grievance> grievances = grievanceRepository.findByUserId(user.getId());
        return grievances.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    // Supervisor methods
    public List<GrievanceDto> getUnassignedGrievances() {
        List<Grievance> grievances = grievanceRepository.findByAssigneeIdIsNull();
        return grievances.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<GrievanceDto> getGrievancesByCategory(String username, String category) {
        Users user = userRepository.findByUsername(username);
        if (!user.getRole().equals(Role.SUPERVISOR)) {
            throw new AccessDeniedException("Only supervisors can access grievances by category");
        }

        List<Grievance> grievances = grievanceRepository.findByGrievanceType(category);
        return grievances.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public GrievanceDto assignGrievance(String username, Long grievanceId, Long assigneeId) {
        Users user = userRepository.findByUsername(username);
        if (!user.getRole().equals(Role.SUPERVISOR)) {
            throw new AccessDeniedException("Only supervisors can assign grievances");
        }

        Grievance grievance = grievanceRepository.findById(grievanceId).orElseThrow(() ->
                new RuntimeException("Grievance not found with id: " + grievanceId));

        grievance.setAssigneeId(assigneeId);
        Grievance updatedGrievance = grievanceRepository.save(grievance);
        return convertToDto(updatedGrievance);
    }

    // Assignee methods
    public List<GrievanceDto> getGrievancesByAssignee(String username) {
        Users user = userRepository.findByUsername(username);
        if (!user.getRole().equals(Role.ASSIGNEE)) {
            throw new AccessDeniedException("Only assignees can view assigned grievances");
        }

        List<Grievance> grievances = grievanceRepository.findByAssigneeId(user.getId());
        return grievances.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public GrievanceDto updateGrievanceStatus(String username, Long grievanceId, String status) {
        Users user = userRepository.findByUsername(username);
        if (!user.getRole().equals(Role.ASSIGNEE)) {
            throw new AccessDeniedException("Only assignees can update grievance status");
        }

        Grievance grievance = grievanceRepository.findById(grievanceId).orElseThrow(() ->
                new RuntimeException("Grievance not found with id: " + grievanceId));

        grievance.setStatus(status);
        Grievance updatedGrievance = grievanceRepository.save(grievance);
        return convertToDto(updatedGrievance);
    }

    public GrievanceDto sendResolutionFeedback(String username, Long grievanceId, String feedback) {
        Users user = userRepository.findByUsername(username);
        if (!user.getRole().equals(Role.ASSIGNEE)) {
            throw new AccessDeniedException("Only assignees can send resolution feedback");
        }

        Grievance grievance = grievanceRepository.findById(grievanceId).orElseThrow(() ->
                new RuntimeException("Grievance not found with id: " + grievanceId));

        if (!grievance.getAssigneeId().equals(user.getId())) {
            throw new AccessDeniedException("You are not assigned to this grievance");
        }

        grievance.setResolutionFeedback(feedback); // Update feedback
        Grievance updatedGrievance = grievanceRepository.save(grievance);
        return convertToDto(updatedGrievance);
    }


    // Convert GrievanceDto to Grievance entity
    private Grievance convertToEntity(GrievanceDto grievanceDto) {
        Grievance grievance = new Grievance();
        grievance.setId(grievanceDto.getId());
        grievance.setTitle(grievanceDto.getTitle());
        grievance.setDescription(grievanceDto.getDescription());
        grievance.setDateSubmitted(grievanceDto.getDateSubmitted());
        grievance.setStatus(grievanceDto.getStatus());
        grievance.setUserId(grievanceDto.getUserId());
        grievance.setGrievanceType(grievanceDto.getGrievanceType());
        grievance.setAssigneeId(grievanceDto.getAssigneeId());
        return grievance;
    }

    // Convert Grievance entity to GrievanceDto
    private GrievanceDto convertToDto(Grievance grievance) {
        GrievanceDto dto = new GrievanceDto();
        dto.setId(grievance.getId());
        dto.setTitle(grievance.getTitle());
        dto.setDescription(grievance.getDescription());
        dto.setDateSubmitted(grievance.getDateSubmitted());
        dto.setStatus(grievance.getStatus());
        dto.setUserId(grievance.getUserId());
        dto.setGrievanceType(grievance.getGrievanceType());
        dto.setAssigneeId(grievance.getAssigneeId());
        dto.setResolutionFeedback(grievance.getResolutionFeedback());
        return dto;
    }

}