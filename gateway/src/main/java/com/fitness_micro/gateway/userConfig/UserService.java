package com.fitness_micro.gateway.userConfig;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientException;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final WebClient userWebclient;

    public Mono<Boolean> validateUser(String userID) {

        return userWebclient
                .get()
                .uri("/api/users/{userID}/validate", userID)
                .retrieve()
                .bodyToMono(Boolean.class)
                .onErrorResume(WebClientResponseException.class, e -> {

                    if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                        return Mono.error(new RuntimeException("User Not Found"));
                    }
                    if (e.getStatusCode() == HttpStatus.BAD_REQUEST) {
                        return Mono.error(new RuntimeException("Invalid Request"));
                    }
                    return Mono.error(new RuntimeException("Unexpected error :"+e.getMessage()));
                });
    }


    public Mono<UserResponse> registerUser(RegisterRequest registerRequest) {

        log.info("calling user registration for email:{}",registerRequest.getEmail());
        return userWebclient.post()
                .uri("/api/users/register")
                .bodyValue(registerRequest)
                .retrieve()
                .bodyToMono(UserResponse.class)
                .onErrorResume(WebClientResponseException.class, e->{
                    if (e.getStatusCode() == HttpStatus.BAD_REQUEST){
                        return Mono.error(new RuntimeException("Bad request :"+registerRequest.getEmail()));
                    } else if (e.getStatusCode() == HttpStatus.INTERNAL_SERVER_ERROR) {
                        return Mono.error(new RuntimeException("Internal server error: "+e.getMessage()));
                    }
                    return Mono.error(new RuntimeException("Unexpected error" + e.getMessage()));
                });
    }
}