package com.Signup.RegisterUser.repo;

import com.Signup.RegisterUser.entity.Users;
import com.Signup.RegisterUser.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByUsernameAndPassword(String username, String password);

    @Query("SELECT u FROM Users u WHERE TRIM(u.username) = :username")
    Users findByUsername(String username);
    List<Users> findByRole(Role role);  // Add this if you want to query by role
}
