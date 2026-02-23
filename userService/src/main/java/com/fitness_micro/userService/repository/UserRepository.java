package com.fitness_micro.userService.repository;

import com.fitness_micro.userService.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,String> {

    boolean existsByEmail(String email);
}
