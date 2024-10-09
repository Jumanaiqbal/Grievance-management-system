//package com.Signup.RegisterUser.repo;
//
//import com.Signup.RegisterUser.entity.Grievance;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.List;
//
//public interface GrievanceRepository extends JpaRepository<Grievance, Long> {
//    List<Grievance> findByUserId(Long userId); // Find grievances by user ID
//    List<Grievance> findByGrievanceType(String grievanceType); // Find grievances by type
//    List<Grievance> findByAssigneeIdIsNull(); // Find grievances without an assignee
//    List<Grievance> findByAssigneeId(Long assigneeId); // Find grievances by assignee ID
//    List<Grievance> findByStatus(String status); // Find grievances by status
//}
package com.Signup.RegisterUser.repo;

import com.Signup.RegisterUser.entity.Grievance;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;



public interface GrievanceRepository extends JpaRepository<Grievance, Long> {
    @Transactional
    @Modifying
    @Query("UPDATE Grievance g SET g.status = :status, g.resolutionFeedback = :feedback WHERE g.id = :id")
    void updateStatusAndFeedback(@Param("id") Long id, @Param("status") String status, @Param("feedback") String feedback);

    List<Grievance> findByUserId(Long userId); // Find grievances by user ID
    List<Grievance> findByGrievanceType(String grievanceType); // Find grievances by type
    List<Grievance> findByAssigneeIdIsNull(); // Find grievances without an assignee
    List<Grievance> findByAssigneeId(Long assigneeId); // Find grievances by assignee ID
    List<Grievance> findByStatus(String status); // Find grievances by status

}