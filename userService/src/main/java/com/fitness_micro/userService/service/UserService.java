package com.fitness_micro.userService.service;

import com.fitness_micro.userService.dto.RegisterRequest;
import com.fitness_micro.userService.dto.UserResponse;
import com.fitness_micro.userService.model.User;
import com.fitness_micro.userService.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponse register(RegisterRequest registerRequest){

        if(userRepository.existsByEmail(registerRequest.getEmail())){
            User existingUser = userRepository.findByEmail(registerRequest.getEmail());
            UserResponse userResponse = new UserResponse();
            userResponse.setId(existingUser.getId());
            userResponse.setKeycloakId(existingUser.getKeycloakId());
            userResponse.setEmail(existingUser.getEmail());
            userResponse.setFirstName(existingUser.getFirstName());
            userResponse.setLastName(existingUser.getLastName());
            userResponse.setCreatedAt(existingUser.getCreatedAt());
            userResponse.setUpdatedAt(existingUser.getUpdatedAt());
            return userResponse;
        }

        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setPassword(registerRequest.getPassword());
        user.setKeycloakId(registerRequest.getKeycloakId());

        User savedUser = userRepository.save(user);

        UserResponse userResponse = new UserResponse();
        userResponse.setEmail(savedUser.getEmail());
        userResponse.setFirstName(savedUser.getFirstName());
        userResponse.setId(savedUser.getId());
        userResponse.setKeycloakId(savedUser.getKeycloakId());
        userResponse.setLastName(savedUser.getLastName());
        userResponse.setCreatedAt(savedUser.getCreatedAt());
        userResponse.setUpdatedAt(savedUser.getUpdatedAt());

        return userResponse;
    }

    public UserResponse getUserProfile(String userId){

        User user = userRepository.findById(userId).orElseThrow(()->new RuntimeException("User not found with userId"+userId));

        UserResponse userResponse = new UserResponse();
        userResponse.setEmail(user.getEmail());
        userResponse.setFirstName(user.getFirstName());
        userResponse.setId(user.getId());
        userResponse.setLastName(user.getLastName());
        userResponse.setCreatedAt(user.getCreatedAt());
        userResponse.setUpdatedAt(user.getUpdatedAt());
        userResponse.setKeycloakId(user.getKeycloakId());

        return  userResponse;
    }

    public  Boolean existsByUserId(String userId) {
        return userRepository.existsByKeycloakId(userId);
    }


    public  Boolean existsById(String userId) {
        return userRepository.existsById(userId);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
}
