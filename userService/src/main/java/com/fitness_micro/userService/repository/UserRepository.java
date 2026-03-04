package com.fitness_micro.userService.repository;

import com.fitness_micro.userService.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,String> {

    List<User> findAll();

    boolean existsByEmail(String email);

    User findByEmail(@NotBlank(message = "Email is Required") @Email(message = "Invalid Email") String email);

    Boolean existsByKeycloakId(String userId);

    boolean existsById(String userId);
}
